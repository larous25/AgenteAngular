import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalid= '';
  invalidU='';
  invalidC='';
  loginForm = new FormGroup({
    contrasena: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required])
  });

  mensaje = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm.get('nombre')?.valueChanges.subscribe(val => {
      this.invalid = '';
      this.invalidU = '';
    });

    this.loginForm.get('contrasena')?.valueChanges.subscribe(val => {
      this.invalid = '';
      this.invalidC = '';
    });
  }

  send() {

    if (this.loginForm.invalid) {
      this.invalid = 'animacion';
      this.invalidU = 'animacion';
      this.invalidC = 'animacion';
      return;
    }

    this.http.post<any>(`${environment.site}/login`, this.loginForm.value).subscribe({
		  next:data => {
        if(typeof data == undefined || data == null) {
          this.invalid = 'animacion';
          this.mensaje = true;
        } else {
          localStorage.setItem("alumno", JSON.stringify(data))
          if(data.nivel) {
            this.router.navigate(['actividad']);
          } else {
            this.router.navigate(['test']);
          }
        }
		  },
		  error: ({error}) => {
		    console.log(error)
		  }

		})
  }




}
