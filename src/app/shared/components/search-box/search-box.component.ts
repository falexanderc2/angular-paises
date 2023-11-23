import { Component, Input, Output, EventEmitter } from "@angular/core";

/**
 * Componente de caja de búsqueda compartida.
 *
 * Este componente muestra una caja de búsqueda con un placeholder personalizable.
 * Cuando se pulsa la tecla Enter, emite el valor ingresado mediante el evento onValue.
 */
@Component({
  selector: "shared-search-box",
  templateUrl: "./search-box.component.html",
  styles: [],
})
export class SearchBoxComponent {
  /**
   * Placeholder para la caja de búsqueda.
   *
   * Este valor se muestra como texto de ayuda dentro de la caja de búsqueda.
   */
  @Input()
  public placeholder: string = "";

  /**
   * Evento que se emite cuando se ingresa un valor en la caja de búsqueda y se pulsa Enter.
   *
   * El valor ingresado se pasa como argumento en el evento.
   */
  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

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
  emitValue(value: string): void {
    this.onValue.emit(value); //en esta linea se emite el valor de lo escrito al evento
  }
}
