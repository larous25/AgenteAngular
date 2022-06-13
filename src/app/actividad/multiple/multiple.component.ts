import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actividad } from 'src/app/model/actividad';

@Component({
  selector: 'app-multiple',
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.css']
})
export class MultipleComponent implements OnInit {
  @Input() actividad!: Actividad;
  @Output() enviar = new EventEmitter<number>();
  actividadFormGroup !: FormGroup;
  anuncio = false;
  vectorErrores: string[] = [];

  constructor(private sanitized: DomSanitizer, private http: HttpClient, private router: Router,) {
    this.actividadFormGroup = new FormGroup({});
  }

  ngOnInit(): void {
    console.info(this.actividad)
    this.actividad.preguntas.forEach(p => {
      this.actividadFormGroup.addControl(p._id, new FormControl('', [
        Validators.required
      ]));
    });
  }

  mostar(i: any) {
    console.info(i)
  }

  terminar() {
    this.vectorErrores = [];
    if (this.actividadFormGroup.invalid) {
      this.anuncio = true;
      return;
    }

    let contador = {
      correctas: 0,
      valor:0
    };
    let d = this.actividadFormGroup.value;
    this.actividad.preguntas.forEach(p => {
      let r = p.respuestas.find(r => r.estado);

      if (d[p._id] == r?.respuesta) {
        contador.correctas++;
        contador.valor += p.valor;
      } else {
        this.vectorErrores.push(p._id);
      }
    })

    let actividadValor = 0;
    console.log(contador)
    if (contador.correctas == this.actividad.preguntas.length) {
      actividadValor = contador.valor;
      console.log(`correcto ${actividadValor} puntos para grifindor`)
    }

    setTimeout(() => {
      this.enviar.emit(actividadValor);
    }, 2000);
  }

  contiene(id: string) {
    console.log(this.vectorErrores)
    return this.vectorErrores.some(e => id === e);
  }
}

