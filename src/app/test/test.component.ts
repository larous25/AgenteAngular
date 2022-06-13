import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TestComponent implements OnInit {
  alumno:any = {};
  test!: Test;
  testFormGroup !: FormGroup;
  enviado:boolean= false;

  constructor(private sanitized: DomSanitizer, private http: HttpClient, private router: Router, ) {
    let s = localStorage.getItem("alumno")!;
    this.alumno = JSON.parse(s);

    this.http.get<Test>(`${environment.site}/test`).subscribe({
		  next:data => {
        console.info(data)
        this.test = data;

        let controles:any = {};
        this.test.preguntas.forEach(p => {
          controles[p._id] = new FormControl('', [
            Validators.required
          ]);
        });
        this.testFormGroup = new FormGroup(controles);
		  },
		  error: ({error}) => {
		    console.log(error)
		  }

		})
  }

  ngOnInit(): void {
  }

  mostar(i:any) {
    console.info(i)
  }

  terminar(){

    if(this.testFormGroup.invalid) {
      this.enviado = true;
      console.log(this.testFormGroup.value)
      return;
    }
    let nivel = "basico";
    let contador = 0;
    let d = this.testFormGroup.value;
    this.test.preguntas.forEach(p => {
      let r = p.respuestas.find(r => r.estado);
      
      if (d[p._id] ==r?.respuesta) {
        contador += p.valor;
      }
    })
    if(contador>300){
      nivel = "MEDIO";
    }
    this.http.post<any>(`${environment.site}/test`, {
      nombre:this.alumno.nombre,
      nivel
    }).subscribe({
		  next:data => {
        console.info(data)
        this.alumno.nivel = nivel;
        console.log(this.alumno)
        localStorage.setItem("alumno", JSON.stringify(this.alumno));

        this.router.navigate(['actividad']);
		  },
		  error: ({error}) => {
		    console.log(error)
		  }

		})
  }



}

interface Test {
  titulo: string,
  preguntas: Pregunta[]
}

interface Pregunta {
  _id:string,
  pregunta: SafeHtml,
  valor:number,
  respuestas: Respuesta[]
}

interface Respuesta {
  _id:string,
  respuesta: string,
  estado: boolean
}