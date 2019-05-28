import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ChartService} from '../../services/chart.service';
import Chart from 'chart.heatmap.js'

@Component({
  selector: 'app-heatmap-chart',
  templateUrl: './heatmap-chart.component.html',
  styleUrls: ['./heatmap-chart.component.scss']
})
export class HeatmapChartComponent implements OnInit {

  @ViewChild('heatMap') hm: ElementRef;
  // @Input() data: any;

  data = {
    labels : ['January', 'Feburary', 'March', 'April', 'May', 'June',
      'July', 'August', 'September','October', 'November', 'December' ],
    datasets: [
      {
        label: 'Corn',
        data: [ 4, 4, 5.5, 4, 7, 12, 14, 9, 6, 5, 2, 1]
      },
      {
        label: 'Wheat',
        data: [ 8, 2, 1, 0, 0, 0, 1, 3, 8, 12, 11, 10]
      },
      {
        label: 'Rice',
        data: [0, 1, 2, 2, 3, 4, 3, 2, 2, 3, 0, 0]
      },
      {
        label: 'Rye',
        data: [0, 0, 0, 0, 0, 0, 2, 5, 9, 6, 5, 1]
      },
      {
        label: 'Oats',
        data: [0, 3, 2, 3, 6, 3, 4, 1, 2, 4, 8, 2]
      }
    ]
  };

  constructor(private chartHelper: ChartService) { }

  ngOnInit() {
    this._createChart();
  }

  _createChart() {
    let canvas = this.hm.nativeElement;
    canvas.width = 400;
    canvas.height = 200;

    let ctx = canvas.getContext('2d');
    var chart = new Chart(ctx).HeatMap(this.data, {responsive: true});

  }

  _fetchLabels() {

  }

  _getData(raw) {

  }

  _getOptions() {

  }

}
