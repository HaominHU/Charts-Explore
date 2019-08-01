import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeatmapChartComponent } from './shared/heatmap-chart/heatmap-chart.component';
import {ChartService} from './services/chart.service';
import { HeatmapD3Component } from './shared/heatmap-d3/heatmap-d3.component';
import {UtilsService} from './services/utils.service';
import { DonutChartComponent } from './shared/donut-chart/donut-chart.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatMenuModule, MatTabsModule} from '@angular/material';
import { SectionHeatmapComponent } from './section/section-heatmap/section-heatmap.component';
import { SectionDonutComponent } from './section/section-donut/section-donut.component';
import { HeaderComponent } from './header/header.component';
import { WelcomeComponent } from './section/welcome/welcome.component';
import { DonutD3Component } from './shared/donut-d3/donut-d3.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeatmapChartComponent,
    HeatmapD3Component,
    DonutChartComponent,
    SectionHeatmapComponent,
    SectionDonutComponent,
    HeaderComponent,
    WelcomeComponent,
    DonutD3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatMenuModule,
    MatButtonModule
  ],
  providers: [
    ChartService,
    UtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
