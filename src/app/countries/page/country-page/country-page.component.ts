import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { CountriesService } from '../../services/countries.service'
import { TCountry } from '../../interfaces/country'
import { switchMap } from 'rxjs'

@Component( {
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
} )
export class CountryPageComponent implements OnInit {

  public country: TCountry = [];

  constructor ( private activateRoute: ActivatedRoute, private countriesSevice: CountriesService, private router: Router ) { }

  ngOnInit (): void {

    /** Esta es la forma mas entendible que se puede realizar, pero existe otra forma con  el metodo pipe */
    /*  
    this.activateRoute.params.subscribe((parametros) => {
       const { id } = parametros
       this.searchById(id)
     }) 
     */

    /**
     * Otra forma con el metodo pipe y el metodo switchMap, el pipe tambien es un observable
     */
    this.activateRoute.params.pipe(
      switchMap( ( { id } ) => this.countriesSevice.searchAPI( id, 'alpha' ) )
    ).subscribe( ( datos ) => {

      return datos === null ? this.router.navigateByUrl( 'home' ) : this.country = datos
      /* if (datos.length===0) {
        return this.router.navigateByUrl('home')
      }
      console.log({ datos })
      return this.country=datos */

    } )
  }

  searchById ( term: string ): void {
    this.countriesSevice.searchAPI( term, 'alpha' )
      .subscribe( ( datos ) => {
        this.country = datos
      } )
  }

}
