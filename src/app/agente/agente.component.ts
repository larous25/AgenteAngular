import { Component, OnInit, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-agente',
  templateUrl: './agente.component.html',
  styleUrls: ['./agente.component.css']
})
export class AgenteComponent implements OnInit {
  @Input() agente!:Agente;
  @Output() enviar = new EventEmitter<number>();

  show = "show"; // esta variable se usa para cerrar ocultar el componente
  emocion = 0; // esta es la emocion que tiene actualmente
  invalido = false;

  idActividadSelecionada:string = "";
  actividadSelecionada!:number;

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  terminar () {
    if(this.emocion !== 0) {
      this.show = "";
    } else {
      this.invalido = true;
    }
    if (this.idActividadSelecionada !== "") {

      this.router.navigate([`actividad/${this.idActividadSelecionada}`],{ queryParams: { emocion: this.emocion }});
    } else {

      this.enviar.emit(this.emocion)
    }
  }
  
  actividadASelecionar(id:string, i:number) {
    this.actividadSelecionada = i
    this.idActividadSelecionada = id
  
  }
}

interface Agente {
  progresos: {
    actividad:string,
    actividadValor:number,
    emocionValor:number
  }[]
}