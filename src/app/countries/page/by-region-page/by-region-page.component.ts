import { Component, OnInit } from '@angular/core'
import { CountriesService } from '../../services/countries.service'
import { TCountry } from '../../interfaces/country'
import { TRegion } from '../../interfaces/region.type'


@Component( {
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
} )
export class ByRegionPageComponent implements OnInit {

  public countries: TCountry = []
  public isLoading: boolean = false
  public regionList: TRegion[] = [ 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania' ]
  public selectedRegion?: TRegion
  constructor ( private countriesService: CountriesService ) { }

  ngOnInit (): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region
  }

  searchByRegion ( term: TRegion ) {
    this.selectedRegion = term
    this.isLoading = true
    this.countriesService.searchAPI( term, 'region' ).
      subscribe( ( datos ) => {
        this.countries = datos
        this.isLoading = false
      } )
  }

}
