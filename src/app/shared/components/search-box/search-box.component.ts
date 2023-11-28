import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from "@angular/core"
import { Subject, Subscription, debounceTime } from "rxjs"

/**
 * Componente de caja de búsqueda compartida.
 *
 * Este componente muestra una caja de búsqueda con un placeholder personalizable.
 * Cuando se pulsa la tecla Enter, emite el valor ingresado mediante el evento onValue.
 */
@Component( {
  selector: "shared-search-box",
  templateUrl: "./search-box.component.html",
  styles: [],
} )
export class SearchBoxComponent implements OnInit, OnDestroy {
  /**
   * Placeholder para la caja de búsqueda.
   *
   * Este valor se muestra como texto de ayuda dentro de la caja de búsqueda.
   */

  /**
  * private debouncer: Subject<string> = new Subject<string>(), este es un observable, que contiene un metodo llamado .pipe(debounceTime(delay)), el cual permite con el paramento delay esperar un tiempo
  * para que se ejecute el método suscribe, en este caso espera 1 segundo en espera de entrada por teclado, de no existir más entrada se ejecuta el suscribe
 
  */
  private debouncer: Subject<string> = new Subject<string>()
  private debouncerSuscription?: Subscription // permite manejar las suscripciones aunque se puede ignora y hacerlo de forma directa desde el debouncer

  @Input()
  public placeholder: string = ""

  @Input()
  public initValue: string = ''
  /**
   * Evento que se emite cuando se ingresa un valor en la caja de búsqueda y se pulsa Enter.
   *
   * El valor ingresado se pasa como argumento en el evento.
   */
  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter<string>();

  constructor () { }

  ngOnInit (): void {
    this.debouncerSuscription = this.debouncer
      .pipe(
        debounceTime( 1000 ) // ? 2. Es un delay de 1 segundo, si no se ejecuta más pulsaciones se ejecuta el subscribe
      )
      .subscribe( ( valor ) => {
        this.onDebounce.emit( valor ) // ? 3. Cuando no se pulsa más teclas se ejecuta esta emisión
      } )
  }
  ngOnDestroy (): void {
    //aqui se puede hacer de dos formas para desuscribir
    // 1era Forma: this.debouncer.unsubscribe()
    //2da Forma: this.debouncerSuscription?.unsubscribe()
    this.debouncerSuscription?.unsubscribe()
  }

  /**
   * Emite el valor ingresado mediante el evento onValue.
   *
   * Este método se invoca cuando se pulsa Enter en la caja de búsqueda.
   * @param value El valor ingresado en la caja de búsqueda.Es decir es llamado desde la plantilla de este componente y permite enviarle el valor ingresado desde esta plantilla hacia el componente que lo invoca
   * y es la forma en que puede propagar los eventos, pero hay que tener en cuenta que desde el componente padre se debe llamar con el evento onValue, es decir el onValue se utiliza solo en el componente padre,
   * en el componente hijo solo se utiliza la funcion emitValue
   */

  /**
   * el funcionamiento de la propagación del evento es el siguiente:
   * 1. se utiliza la directiva @Output que permite emitir un evento, en este caso se ccrea una variable onValue: EventEmitter<string> = new EventEmitter<string>();
   * 2. En en el template de este componente se captura el valor cuando se pulsa enter: (keyup.enter)="emitValue(txtSearch.value)" y se envia el valor a la funcion emitValue:
   * 3. En la function emitValue se asigna el valor a la variable onValue, recordar que esta variable es de tipo evento y es llamada desde los componentes a traves del evento onValue:
   * (onValue)="searchByCapital($event)",
   * 4. Desde los componentes que invocan a este componente se debe crear una funcion para que reciba y procese los valores que se capturan con el evento onValue: searchByCapital(term: string) {
    console.log(
      "🚀 ~ file: by-capital-page.component.ts:11 ~ ByCapitalPageComponent ~ searchByCapital ~ term:",
      term
    );
   * @param value
   */
  emitValue ( value: string ): void {
    this.onValue.emit( value ) //en esta linea se emite el valor de lo escrito al evento
  }

  emitKeyPress ( value: string ): void {
    this.debouncer.next( value ) // ? 1. proporciona el proximo valor

  }
}
