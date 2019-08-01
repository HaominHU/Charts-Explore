import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import { PieArcDatum } from 'd3-shape';
import {KeyValuePair} from '../../model/key-value-pair';

@Component({
  selector: 'app-donut-d3',
  templateUrl: './donut-d3.component.html',
  styleUrls: ['./donut-d3.component.scss']
})
export class DonutD3Component implements OnInit {

    @ViewChild('donutD3') d3Chart: ElementRef;

    constructor() { }

    ngOnInit() {
        this.createChart();
    }

    private createChart() {
        let screenWidth = this.d3Chart.nativeElement.offsetWidth,
            width = 450,
            height = 450,
            margin = 40;

        let radius = Math.min(width, height) / 2 - margin;

        let svg = d3.select('#donutd3')
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr('transform', `translate(${screenWidth/4},0)`)
            .append("g")
            .attr("transform", `translate(${width/2}, ${height/2})`);

        let data1 = {
            sleep: 480,
            bike: 30,
            walk: 100,
            running: 60
        };


      // let data2 = [
      //     {
      //         key: 'sleep',
      //         value: 480
      //     },
      //     {
      //         key: 'bike',
      //         value: 30
      //     },
      //     {
      //         key: 'walk',
      //         value: 100
      //     },
      //     {
      //         key: 'running',
      //         value: 60
      //     }
      // ];


        let color = d3.scaleOrdinal<string>()
            .domain(['sleep', 'bike', 'walk', 'running'])
            .range(d3.schemeDark2);

        let pie = d3.pie<KeyValuePair>()
            .sort(null)
            .value((d) => {
                return d.value;
            });

        let data_ready = pie(d3.entries(data1));

        let arc = d3.arc<PieArcDatum<KeyValuePair>>()
            .innerRadius(radius * 0.5)         // This is the size of the donut hole
            .outerRadius(radius * 0.8);

        let outerArc = d3.arc<PieArcDatum<KeyValuePair>>()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9);


        svg.selectAll('allSlices')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d) => {return color(d.data.key)})
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 0.7);


        // Add the polylines between chart and labels:
        svg.selectAll('allPolylines')
            .data(data_ready)
            .enter()
            .append('polyline')
            .attr("stroke", "black")
            .style("fill", "none")
            .attr("stroke-width", 1)
            .attr('points', function(d) {
                let posA = arc.centroid(d);// line insertion in the slice
                let posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
                let posC = outerArc.centroid(d); // Label position = almost the same as posB
                let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
                posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
                return [posA, posB, posC].toString();
          });

        // Add the polylines between chart and labels:
        svg.selectAll('allLabels')
            .data(data_ready)
            .enter()
            .append('text')
            .text( function(d) { return d.data.key } )
            .attr('transform', function(d) {
                let pos = outerArc.centroid(d);
                let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                return 'translate(' + pos + ')';
            })
            .style('text-anchor', function(d) {
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                return (midangle < Math.PI ? 'start' : 'end')
            })
            .style('font-size', 12);

        /**
         * d3.entries(data: Object) => {
         *     return Array<{key: any, value: any}>
         * }
         *
         * d3.values(data: Object) => {
         *     return Objects.values(data)
         * }
         *
         * d3.values(data: Array<any>) => {
         *     return data
         * }
         */
  }

}
