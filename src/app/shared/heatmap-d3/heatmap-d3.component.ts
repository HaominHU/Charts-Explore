import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-heatmap-d3',
  templateUrl: './heatmap-d3.component.html',
  styleUrls: ['./heatmap-d3.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeatmapD3Component implements OnInit {

  data = new Array(168).fill(
    {
      day: 0,
      hour: 0,
      value: 0
    }
  ).map(
    (d, index) => {
      return {
        day: +Math.floor(index/24) + 1,
        hour: +index % 24 + 1,
        value: +this.utils.randomInt(0, 50)
      }
    }
  );

  constructor(private utils: UtilsService) { }

  ngOnInit() {
    this._createChart();
  }

  _createChart() {
    let margin = { top: 50, right: 0, bottom: 100, left: 30 },
      width = 960 - margin.left - margin.right,
      height = 430 - margin.top - margin.bottom,
      gridSize = Math.floor(width / 24),
      legendElementWidth = gridSize*2,
      buckets = 9,
      colors:any = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"], // alternatively colorbrewer.YlGnBu[9]
      // days = ["Mo", "Tu", "We"],
      days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      // periods = ['Morning', 'Noon', 'Night'];
      times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"];

    let svg = d3.select('#chart').append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    let dayLabels = svg.selectAll(".dayLabel")
      .data(days)
      .enter().append("text")
      .text(function (d) { return d; })
      .attr("x", 0)
      .attr("y", (d, i) => i * gridSize)
      .style("text-anchor", "end")
      .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
      .attr("class", (d, i) => ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"));

    let timeLabels = svg.selectAll(".timeLabel")
      .data(times)
      .enter().append("text")
      .text((d) => d)
      .attr("x", (d, i) => i * gridSize)
      .attr("y", 0)
      .style("text-anchor", "middle")
      .attr("transform", "translate(" + gridSize / 2 + ", -6)")
      .attr("class", (d, i) => ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"));

    let heatmapChart = function(data: Array<any>) {
      let colorScale = d3.scaleQuantile()
        .domain([0, buckets - 1, d3.max(data, (d) => d.value)])
        .range(colors);

      let cards:any = svg.selectAll('.hour')
        .data(data, datum => datum.day + ':' + datum.hour)

      cards.append('title');

      cards.enter().append("rect")
        .attr("x", (d) => (d.hour - 1) * gridSize)
        .attr("y", (d) => (d.day - 1) * gridSize)
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("class", "hour bordered")
        .attr("width", gridSize)
        .attr("height", gridSize)
        .style("fill", colors[0])
        .merge(cards)
        .transition()
        .duration(1000)
        .style("fill", (d) => colorScale(d.value));

      cards.select("title").text((d) => d.value);

      cards.exit().remove();

      let legend = svg.selectAll(".legend")
        .data(Array(1).fill(0).concat(colorScale.quantiles()), (d) => d);

      let legend_g = legend.enter().append("g")
        .attr("class", "legend");

      legend_g.append("rect")
        .attr("x", (d, i) => legendElementWidth * i)
        .attr("y", height)
        .attr("width", legendElementWidth)
        .attr("height", gridSize / 2)
        .style("fill", (d, i) => colors[i]);

      legend_g.append("text")
        .attr("class", "mono")
        .text((d) => "≥ " + Math.round(d))
        .attr("x", (d, i) => legendElementWidth * i)
        .attr("y", height + gridSize);

      legend.exit().remove();

    };

    heatmapChart(this.data);
  }
}
