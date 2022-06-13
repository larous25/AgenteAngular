import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {
  show = ""
  typePass:string = "password"

  formas = [ "Triangulo",
  "Cuadrado",
  "Rectangulo",
  "Rombo",
  "Trapecio",
  "Paralelogramo",
  "Pentagono",
  "Hexagono" ]
  colores = [ "Amarillo",
  "Yellow",
  "Azul",
  "Blue",
  "Blanco",
  "White",
  "Gris",
  "Grey",
  "Gray",
  "Marron",
  "Brown",
  "Morado",
  "purpura",
  "Purple",
  "Naranja",
  "Orange",
  "Negro",
  "Black",
  "Rojo",
  "Red",
  "Rosa",
  "Pink",
  "Verde",
  "Green" ]

  estudianteForm = new FormGroup({
    'nombre': new FormControl('', Validators.required),
    'contrasena': new FormControl(this.generarPass(), Validators.required),
  })

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  crear() {

    if (this.estudianteForm.invalid) {
      return;
    }
  
    this.http.post<any>(`${environment.site}/crearEstudiante`, this.estudianteForm.value).subscribe({
		  next:data => {
		    console.log(data)
        this.show = 'show'
        
		  },
		  error: ({error}) => {
		    console.log(error)
		  }

		})
  
  }

  resetear () {
    console.log('aaa')
    this.estudianteForm.reset()
    this.estudianteForm.get('contrasena')?.setValue(this.generarPass())
    this.show = ''
  }

  generarPass():string {
    return this.formas[Math.floor(Math.random() * this.formas.length)] + this.colores[Math.floor(Math.random() * this.colores.length)];
  }

  verPass() {
    this.typePass = this.typePass=="password" ? "text":"password"
  }
}
