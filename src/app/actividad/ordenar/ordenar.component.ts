import { Component, OnInit, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Actividad } from 'src/app/model/actividad';
import { Pregunta } from 'src/app/model/preguntas';

@Component({
  selector: 'app-ordenar',
  templateUrl: './ordenar.component.html',
  styleUrls: ['./ordenar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrdenarComponent implements OnInit {
  @Input() actividad!: Actividad;
  @Output() enviar = new EventEmitter<number>();
  preguntas!: Pregunta[];
  // la utilizo cuando el arrastre comienza
  sombra:boolean = false;
  elementoSaliente = 0;
  contenedorElemento = 0;

  constructor() { }

  ngOnInit(): void {
    this.preguntas = Object.assign([], this.actividad.preguntas)

    this.actividad.preguntas.forEach((p, index) => {

      let res = this.shuffle(Object.assign([], p.respuestas))
    
      this.preguntas[index] = Object.assign({}, p)
      this.preguntas[index].respuestas = res
    });
  }

  // donde llega
  ordenado (e:any) {
    e.preventDefault();
  
    let numeroElementoEntranteHijo = e.dataTransfer.getData("elementoHijo");
    let elementoHijo = document.querySelector(`div[idHijo="${numeroElementoEntranteHijo}"]`)!;
        
    let numeroElementoEntrantePadre = e.dataTransfer.getData("elementoPadre");
    // console.log("numero Elemento Entrante Padre", numeroElementoEntrantePadre)
    let elementoPadre = document.querySelector(`div[idPadre="${numeroElementoEntrantePadre}"]`);
    let elementoPadreEntrante = document.querySelector(`div[idPadre="${this.contenedorElemento}"]`)!;
    console.log(elementoPadreEntrante)
    // (elementoPadre as HTMLElement).style.background = "";
    // (elementoPadreEntrante as HTMLElement).style.background = "";
    let elementoSaliente = document.querySelector(`div[idHijo="${this.elementoSaliente}"]`)!;
    elementoPadre?.appendChild(elementoSaliente);
    elementoPadreEntrante.appendChild(elementoHijo);
  }

  arrastra (e:any) {
    this.sombra = true;
    e.dataTransfer.setData('elementoHijo', e.target.getAttribute("idHijo")); 
    e.dataTransfer.setData('elementoPadre', e.target.parentElement.getAttribute("idPadre")); 
  }


  permitir (ev:any) {
    ev.preventDefault();
    if (ev.target.getAttribute("draggable") == "true")
      ev.dataTransfer.dropEffect = "none"; // dropping is not allowed
    else
      ev.dataTransfer.dropEffect = "all";
  }
  
  ingresa(e:any) { 
    e.preventDefault();
    let padre = e.target.getAttribute("idPadre");
    console.log(padre)
    if(padre) {
      this.contenedorElemento = padre;
      this.elementoSaliente = e.target.firstElementChild.getAttribute("idHijo");
    }
  
  }

  shuffle(array: any[]) {
    let currentIndex = array.length, randomIndex;


    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  terminar() {
    let oraciones = [...Array.from(document.querySelectorAll('div[oracion="oracion"]'))]
    let correctos = 0
    oraciones.forEach(o => {
      let correctasRespuestas = 0
      let respuestasElementos = Array.from(o.children);
      respuestasElementos.forEach(padre => {
        let hijo = padre.firstElementChild;
        
        if(padre.getAttribute('data-padre') == hijo?.getAttribute('data-hijo')) {
          correctasRespuestas ++;
        }
      })
      if(respuestasElementos.length == correctasRespuestas) {
        correctos++;
      }
    })
    
    this.enviar.emit(correctos*this.preguntas[0].valor)
  }
}
