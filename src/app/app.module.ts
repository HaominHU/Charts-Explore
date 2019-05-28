import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeatmapChartComponent } from './shared/heatmap-chart/heatmap-chart.component';
import {ChartService} from './services/chart.service';
import { HeatmapD3Component } from './shared/heatmap-d3/heatmap-d3.component';
import {UtilsService} from './services/utils.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeatmapChartComponent,
    HeatmapD3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    ChartService,
    UtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
