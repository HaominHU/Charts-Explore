import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-section-donut',
  templateUrl: './section-donut.component.html',
  styleUrls: ['./section-donut.component.scss']
})
export class SectionDonutComponent implements OnInit {

  chartId: number;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.chartId = params.id;
      }
    );
  }

}
