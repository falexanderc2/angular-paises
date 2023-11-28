import { Component, OnInit } from "@angular/core"
import { CountriesService } from '../../services/countries.service'
import { Country, TCountry } from "../../interfaces/country"
import { TRegion } from "../../interfaces/region.type"

@Component( {
  selector: "countries-capital",
  templateUrl: "./by-capital-page.component.html",
  styles: ``,
} )

export class ByCapitalPageComponent implements OnInit {

  public countries: TCountry = []
  public initValue: TRegion = ''
  public isLoading: boolean = false

  constructor ( private countriesService: CountriesService ) { }
  ngOnInit (): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries
    this.initValue = this.countriesService.cacheStore.byCapital.term
  }

  searchByCapital ( term: string ) {
    this.isLoading = true
    this.countriesService.searchAPI( term, 'capital' ).
      subscribe( ( datos ) => {
        this.countries = datos
        this.isLoading = false
      } )
  }

  searchByCapital2 ( term: string ) {
    this.isLoading = true
    this.countriesService.searchAPI2<Country>( term, 'capital' ).
      subscribe( ( datos ) => {
        this.countries = datos
        this.isLoading = false
      } )
  }
}
