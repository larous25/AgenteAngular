import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';
import { AgenteComponent } from './agente/agente.component';
import { ActividadComponent } from './actividad/actividad.component';
import { ArrastrarComponent } from './actividad/arrastrar/arrastrar.component';
import { CompletarComponent } from './actividad/completar/completar.component';
import { MultipleComponent } from './actividad/multiple/multiple.component';
import { OrdenarComponent } from './actividad/ordenar/ordenar.component';

@NgModule({
  declarations: [
    AppComponent,
    EstudiantesComponent,
    LoginComponent,
    TestComponent,
    AgenteComponent,
    ActividadComponent,
    ArrastrarComponent,
    CompletarComponent,
    MultipleComponent,
    OrdenarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
