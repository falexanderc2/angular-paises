import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'about',
    component: AboutPageComponent,
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
  {
    path: 'countries',
    loadChildren: () => import('./countries/countries.module').then((modulo) => modulo.CountriesModule)
    /** 
     * Esto permite enlazar un menu hijo, el cual se puede lograr cargando el modulo countries.module, el cual contiene la ruta para cargar los menus de countries
     * de esta forma se puede cargar de forma perezosa el  modulo countries.module, se carga una sola vez cuando se necesita, luego se mantiene en cache, si no se llama
     * no se carga, esto permite optimizar el rendimiento.
     */
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]

})
export class AppRoutingModule { }

