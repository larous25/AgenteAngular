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
    
    if (this.actividadFormGroup.invalid) return;

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
      }
    })

    let actividadValor = 0;
    console.log(contador)
    if (contador.correctas == this.actividad.preguntas.length) {
      actividadValor = contador.valor;
      console.log(`correcto ${actividadValor} puntos para grifindor`)
    }
    this.enviar.emit(actividadValor)
  }

}

