import { HttpClient } from "@angular/common/http"
import { Injectable, } from "@angular/core"
import { Observable, catchError, map, of, tap } from "rxjs"
import { TCountry, Country } from '../interfaces/country'
import { ICacheStore } from "../interfaces/cache-store.interface"
import { TRegion } from "../interfaces/region.type"

type TOption = "capital" | "name" | 'region' | 'alpha'


@Injectable( {
	providedIn: "root",
} )

/**
 * Este servicio es el encargado de realizar la búsquda, pero hay que tener  en cuenta que se realiza la peticion o la llamada
 * solo con el metodo subscribe() del observable el cual sera invocado en este caso en los componentes que quieran consumir
 * este servicio.
 * En este ejemplo se utiliza el pipe, y este permite evaluar N condiciones, el caso de que la option sea alpha se necesita que solo devuelva un solo valor por eso se evalua el length
 * Para capturar los errores en le llamado, los observables cuenta entre sus metodos con uno llamado pipe(), el cual permite
 * utilizar otro metodo llamado catchError()
 * Una vez que se ejecuta la búsqueda con el get, y se obtienen los resultados automaticamente se cierra la conexión
 */
export class CountriesService {

	public cacheStore: ICacheStore = {
		byCapital: { term: '', countries: [] },
		byCountries: { term: '', countries: [] },
		byRegion: { region: '', countries: [] }
	}
	constructor ( private http: HttpClient ) { }


	searchAPI ( term: TRegion, option: TOption ): Observable<TCountry> {
		const URL: string = `https://restcountries.com/v3.1/${ option }/${ term }`
		let result: TCountry = []
		console.log( { option }, this.cacheStore )
		return this.http.get<TCountry>( URL ).pipe(
			tap( ( resultado ) => {
				if ( option === 'capital' ) {
					this.cacheStore.byCapital = { term: term, countries: resultado }
				}
				if ( option === 'name' ) {
					this.cacheStore.byCountries = { term: term, countries: resultado }
				}
				if ( option === 'region' ) {
					this.cacheStore.byRegion = { region: term, countries: resultado }
				}
			} ),
			map( ( resultado ) => {
				if ( option === 'alpha' ) {
					result[ 0 ] = resultado[ 0 ]
				} else {
					result = resultado
				}
				return resultado

			} ),

			catchError( ( error ) => {
				//console.log("el error es", error);
				return of( [] )
				/**
				 * La función of es parte de la biblioteca RxJS y se utiliza para crear un Observable. En el contexto de manejo de errores, 
				 * of se utiliza para crear un Observable que emite un valor y luego se completa.
				 * En tu código, estás utilizando of en el bloque catchError para crear un Observable que emite null cuando ocurre un error. 
				 * Esto es útil porque permite que el flujo de ejecución continúe después de un error.
				 * Si no utilizas of y en lugar de eso devuelves null directamente, el error no se manejará correctamente y el Observable se completará con un error. 
				 * Esto puede llevar a comportamientos inesperados en tu aplicación.
				 * Además, utilizar of te permite manejar el error de una manera más controlada. Por ejemplo, podrías registrar el error en un servicio de logging, 
				 * mostrar un mensaje de error al usuario, o incluso intentar realizar la solicitud de nuevo después de un cierto período de tiempo.
				 * Por lo tanto, of es una herramienta útil para manejar errores en Observables y te permite controlar el flujo de ejecución después de un error de una 
				 * manera más controlada
				 */
			} ),

		)
	}

	searchAPI2<T> ( term: string, option: TOption ): Observable<T[]> {
		const URL: string = `https://restcountries.com/v3.1/${ option }/${ term }`
		let result: T[] = []
		return this.http.get<T[]>( URL ).pipe(

			map( ( resultado ) => {
				if ( option === 'alpha' ) {
					result[ 0 ] = resultado[ 0 ]
				} else {
					result = resultado
				}
				return resultado
			} ),

			catchError( ( error ) => {
				//console.log("el error es", error);
				return of( [] )
				/**
				 * La función of es parte de la biblioteca RxJS y se utiliza para crear un Observable. En el contexto de manejo de errores, 
				 * of se utiliza para crear un Observable que emite un valor y luego se completa.
				 * En tu código, estás utilizando of en el bloque catchError para crear un Observable que emite null cuando ocurre un error. 
				 * Esto es útil porque permite que el flujo de ejecución continúe después de un error.
				 * Si no utilizas of y en lugar de eso devuelves null directamente, el error no se manejará correctamente y el Observable se completará con un error. 
				 * Esto puede llevar a comportamientos inesperados en tu aplicación.
				 * Además, utilizar of te permite manejar el error de una manera más controlada. Por ejemplo, podrías registrar el error en un servicio de logging, 
				 * mostrar un mensaje de error al usuario, o incluso intentar realizar la solicitud de nuevo después de un cierto período de tiempo.
				 * Por lo tanto, of es una herramienta útil para manejar errores en Observables y te permite controlar el flujo de ejecución después de un error de una 
				 * manera más controlada
				 */
			} ),
		)
	}


	searchCapital ( term: string ): Observable<Country[]> {
		const URL: string = `https://restcountries.com/v3.1/capital/${ term }`
		return this.http.get<Country[]>( URL ).pipe(
			catchError( ( error ) => {
				//console.log('el error es', error)
				return of( [] )
			} ),
		)
	}
}
