import { Pregunta } from './preguntas'

export interface Actividad {
  titulo: string,
  valor: number,
  preguntas: Pregunta[]
}

