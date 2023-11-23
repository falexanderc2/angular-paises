import { Component } from "@angular/core";
import { CountriesService } from '../../services/countries.service';
import { Country } from "../../interfaces/country";

@Component({
  selector: "countries-capital",
  templateUrl: "./by-capital-page.component.html",
  styles: ``,
})
  
export class ByCapitalPageComponent {

  public countries:  Country[]=[]
  
  constructor(private countriesService: CountriesService) { }
  
  searchByCapital(term: string) { 
    this.countriesService.searchAPI(term,'capital').
      subscribe((datos) => {
        this.countries = datos
      })
  }
}
