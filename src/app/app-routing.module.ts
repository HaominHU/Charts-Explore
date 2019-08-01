import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SectionHeatmapComponent} from './section/section-heatmap/section-heatmap.component';
import {SectionDonutComponent} from './section/section-donut/section-donut.component';
import {WelcomeComponent} from './section/welcome/welcome.component';

const routes: Routes = [
  {path: '', redirectTo: '/home/welcome', pathMatch: 'full'},
  {path: 'home', component: HomeComponent,
    children: [
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: 'welcome', component: WelcomeComponent},
      {path: 'heatmap/:id', component: SectionHeatmapComponent},
      {path: 'doughnut/:id', component: SectionDonutComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
