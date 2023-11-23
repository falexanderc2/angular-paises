import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'pge-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {

  public countries: Country[] =[]

  constructor(private countriesService: CountriesService) { }

  
  searchByCountry(term: string) { 
    this.countriesService.searchAPI(term,'name').
      subscribe((datos) => {
       return this.countries = datos
      })
  }

}
