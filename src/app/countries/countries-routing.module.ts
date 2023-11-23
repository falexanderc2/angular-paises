import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ByCapitalPageComponent } from './page/by-capital-page/by-capital-page.component';
import { ByCountryPageComponent } from './page/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './page/by-region-page/by-region-page.component';
import { CountryPageComponent } from './page/country-page/country-page.component';

const routes: Routes = [
  {
    path: 'by-capital',
    component: ByCapitalPageComponent
  },
  {
    path: 'by-country',
    component: ByCountryPageComponent
  },
  {
    path: 'by-region',
    component: ByRegionPageComponent
  },
  {
    path: 'by/:id',
    component: CountryPageComponent
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CountriesRoutingModule { }
