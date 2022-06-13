import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {
  idActividad: string = "";
  alumno: any = {};
  agente: any;
  actividad: any;
  emocion:number  = 0;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    let s = localStorage.getItem("alumno")!;
    this.alumno = JSON.parse(s);

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idActividad = params['id'];
    });
    this.route.queryParams
      .subscribe(params => {
        this.emocion = params['emocion'];
      }
    );


    let ruta = ""
    if (this.idActividad) {
      ruta = `${environment.site}/actividad/${this.idActividad}`;
    } else {
      ruta = `${environment.site}/actividad?nivel=${this.alumno.nivel}&estudiante=${this.alumno._id}`;
    }


    this.http.get<any>(ruta).subscribe({
      next: data => {
        this.agente = data.agente;
        this.actividad = data.actividad;
      },
      error: ({ error }) => {
        console.log(error)
      }
    });
  }


  terminar(actividadValor: any) {
    console.log(actividadValor)
    let datosDeEnvio = {
      actividad: this.actividad._id,
      estudiante: this.alumno._id,
      emocionValor: this.emocion,
      actividadValor
    }

    this.http.post<any>(`${environment.site}/actividad`, datosDeEnvio).subscribe({
      next: data => {
        if(this.router.url == "/actividad") {
          window.location.reload();
        }else {
           this.router.navigate(['/actividad']);
        }
      },
      error: ({ error }) => {
        console.log(error)
      }
    })
  }

  salir() {
    localStorage.removeItem("alumno")
    this.router.navigate(['']);
  }

}
