import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component'; 
import { ActividadComponent } from './actividad/actividad.component';

const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'crearEstudiante', component: EstudiantesComponent },
  {path: 'test', component: TestComponent },
  {path: 'actividad/:id', component: ActividadComponent },
  {path: 'actividad', component: ActividadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
