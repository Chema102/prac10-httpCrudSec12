export class HeroeModel{
  id: string;
  nombre: string;
  poder: string;
  vivo: boolean;

  constructor(){

    this.vivo   = true;
    this.id     = '';
    this.nombre = '';
    this.poder  = '';

   }
}
