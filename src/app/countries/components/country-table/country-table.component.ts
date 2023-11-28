import { Component,Input } from '@angular/core';
import { TCountry } from '../../interfaces/country';

@Component({
  selector:'countries-table',
  templateUrl: './country-table.component.html',
  styleUrl: './country-table.component.css'
})
export class CountryTableComponent {
  @Input()
  public countries:  TCountry=[]
  
  @Input()
  public paramsSearch:string=''
}
