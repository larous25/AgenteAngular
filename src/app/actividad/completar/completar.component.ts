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

  constructor(private sanitized: DomSanitizer) {
  }

  ngOnInit(): void {
  }

  limpiar (p:string):SafeHtml {
    return this.sanitized.bypassSecurityTrustHtml(p);
  }

  terminar() {
    let inputElements = [...Array.from(document.querySelectorAll("input[class='form-control-test']"))]
    
    let indicePregunta = 0;
    let c = 0;
    this.actividad.preguntas.forEach(p => {
      p.respuestas.forEach(r => {
        let inputElement = (inputElements[indicePregunta] as HTMLInputElement);
        if(inputElement.value == r.respuesta) {
          c += p.valor;
        }

        indicePregunta++;
      });
    })
    
    this.enviar.emit(c);
  }
}
