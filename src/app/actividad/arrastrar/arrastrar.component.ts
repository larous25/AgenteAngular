import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Actividad } from 'src/app/model/actividad';
import { Pregunta } from 'src/app/model/preguntas';

@Component({
  selector: 'app-arrastrar',
  templateUrl: './arrastrar.component.html',
  styleUrls: ['./arrastrar.component.css']
})
export class ArrastrarComponent implements OnInit {

  @Input() actividad!: Actividad;
  @Output() enviar = new EventEmitter<number>();
  preguntas!: Pregunta[];
  anuncio = false;

  constructor() {

  }

  ngOnInit(): void {
    let ps = Object.assign([], this.actividad.preguntas)
    this.preguntas = this.shuffle(ps)
  }

  // recibe el objeto que se arrastro
  soltado(ev: any) {
    ev.preventDefault();
    let rid = ev.dataTransfer.getData("rid");
    if(ev.target.firstElementChild == null) {
      let d = document.querySelector(`div[rid="${rid}"]`);
      ev.target.appendChild(d);
    } else {
      // document.querySelector(`div[rid="${rid}"]`);
      console.log("cambio")
    }

  }

  arrastra(e: any) {
    let id = e.target.getAttribute("rid")
    e.dataTransfer.setData("rid", id);
    // this.a.nativeElement
  }

  permitir(ev: any) {
    ev.preventDefault();
    if (ev.target.getAttribute("draggable") == "true")
      ev.dataTransfer.dropEffect = "none"; // dropping is not allowed
    else
      ev.dataTransfer.dropEffect = "all";
  }

  ingresa(e: any) { // esto lo puedo hacer con javascript
    e.preventDefault();
  }
  // fin de eventos del arrastre
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
    let inputElements = [...Array.from(document.querySelectorAll('div[pregunta="pregunta"]'))]

    let contador = 0;
    for (let [index, ie] of inputElements.entries()) {
      let padre = (ie as HTMLElement)
      if (!padre.firstElementChild) {
        this.anuncio = true;
        break;
      }
      let hijo = padre.firstElementChild
      console.log(padre.getAttribute('pid'), hijo?.getAttribute('pid'))
      if (padre.getAttribute('pid') == hijo?.getAttribute('pid')) {
        contador += this.actividad.preguntas[index].valor
      }
    }


    this.enviar.emit(contador);
  }
}
