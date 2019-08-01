import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-section-heatmap',
  templateUrl: './section-heatmap.component.html',
  styleUrls: ['./section-heatmap.component.scss']
})
export class SectionHeatmapComponent implements OnInit {

  chartId: number;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.chartId = params['id'];
      }
    );
  }

}
