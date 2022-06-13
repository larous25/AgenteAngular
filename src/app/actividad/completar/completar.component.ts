import { Component, OnInit, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { Actividad } from 'src/app/model/actividad';

@Component({
  selector: 'app-completar',
  templateUrl: './completar.component.html',
  styleUrls: ['./completar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CompletarComponent implements OnInit {
  @Input() actividad!: Actividad;
  @Output() enviar = new EventEmitter<number>();
  vectorErrores: string[] = [];
  anuncio = false;

  constructor(private sanitized: DomSanitizer) {
  }

  ngOnInit(): void {
  }

  limpiar(p: string): SafeHtml {
    return this.sanitized.bypassSecurityTrustHtml(p);
  }

  terminar() {
    let inputElements = [...Array.from(document.querySelectorAll("input[class='form-control-test']"))]
    this.vectorErrores = [];
    let indicePregunta = 0;
    let c = 0;
    this.actividad.preguntas.forEach(p => {
      p.respuestas.forEach(r => {
        let inputElement = (inputElements[indicePregunta] as HTMLInputElement);
        if(inputElement.value == "") {
          this.anuncio = true;
          return;
        }

        if (inputElement.value == r.respuesta) {
          c += p.valor;
        } else {
          this.vectorErrores.push(r._id);
        }

        indicePregunta++;
      });
    })

    setTimeout(() => {
      this.enviar.emit(c);
    }, 2000);
  }

  contiene(id: string) {
    console.log(this.vectorErrores)
    return this.vectorErrores.some(e => id === e);
  }
}
