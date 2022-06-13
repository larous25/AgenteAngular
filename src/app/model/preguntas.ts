import { Respuesta } from './respuestas'

export interface Pregunta {
  _id: string,
  pregunta: string,
  valor: number,
  respuestas: Respuesta[]
}

