import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, map, of } from "rxjs";
import { Country } from "../interfaces/country";

type TOption = "capital" | "name" | 'region' | 'alpha'

@Injectable({
	providedIn: "root",
})

/**
 * Este servicio es el encargado de realizar la búsquda, pero hay que tener  en cuenta que se realiza la peticion o la llamada
 * solo con el metodo subscribe() del observable el cual sera invocado en este caso en los componentes que quieran consumir
 * este servicio.
 * En este ejemplo se utiliza el pipe, y este permite evaluar N condiciones, el caso de que la option sea alpha se necesita que solo devuelva un solo valor por eso se evalua el length
 * Para capturar los errores en le llamado, los observables cuenta entre sus metodos con uno llamado pipe(), el cual permite
 * utilizar otro metodo llamado catchError()
 */
export class CountriesService {
	
	constructor(private http: HttpClient){}

	searchAPI(term: string, option: TOption): Observable<Country[]> {
		let result:Country[]=[]
		const URL: string = `https://restcountries.com/v3.1/${option}/${term}`
		return this.http.get<Country[]>(URL).pipe(

			map((resultado) => {
				
				if (option === 'alpha'){
					result[0]=resultado[0] 
				} else {
					 result=resultado
				}
				return result
			}),
			
			catchError((error) => {
				//console.log("el error es", error);
				return of(result);
			}),
		);
	}

	searchCapital(term: string): Observable<Country[]> {
		const URL: string = `https://restcountries.com/v3.1/capital/${term}`;
		return this.http.get<Country[]>(URL).pipe(
			catchError((error) => {
				//console.log('el error es', error)
				return of([]);
			}),
		);
	}
}
