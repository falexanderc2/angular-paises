import { Component, OnInit } from '@angular/core'
import { TCountry } from '../../interfaces/country'
import { CountriesService } from '../../services/countries.service'

@Component( {
  selector: 'pge-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
} )
export class ByCountryPageComponent implements OnInit {

  public countries: TCountry = []
  public isLoading: boolean = false
  public initValue: string = ''

  constructor ( private countriesService: CountriesService ) { }
  ngOnInit (): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries
    this.initValue = this.countriesService.cacheStore.byCountries.term
  }


  searchByCountry ( term: string ) {
    this.isLoading = true
    this.countriesService.searchAPI( term, 'name' ).
      subscribe( ( datos ) => {
        this.countries = datos
        this.isLoading = false
      } )
  }

}
