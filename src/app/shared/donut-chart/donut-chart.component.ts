import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChartService} from '../../services/chart.service';
import Chart from 'chart.js';
import {ChartOptions, DatasetsArray} from '../../model/data-element';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit {

  chart: Chart;
  @ViewChild('donutChart') donut: ElementRef;

  constructor(private chartHelper: ChartService) { }

  ngOnInit() {
    this.createChart();
  }

  private createChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    let canvas = this.donut.nativeElement;
    //width and size can be measured here
    this.chart = this.chartHelper.init(canvas, this.chartHelper.createConfig('doughnut', this.chartHelper.getData(this.getLabels(), this.getData()), this.getOptions()))
  }

  private getOptions(): ChartOptions {
    return {
      legend: {
        display: true
      }
    }
  }

  private getLabels(): Array<string> {
    return ['Sleep', 'Exercise'];
  }

  private getData(): DatasetsArray {
    return [
      {
        data: [10, 15],
        backgroundColor: ['#FFFB7D', '#6F33A7']
      }
    ];
  }

}
