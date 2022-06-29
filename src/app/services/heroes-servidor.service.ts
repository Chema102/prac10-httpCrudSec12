import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { delay, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeroesServidorService {
  private url = "https://loginprac-app-default-rtdb.firebaseio.com"
  constructor(private http:HttpClient ) { }

  newHeroe(heroe: HeroeModel){

    return this.http.post(`${this.url}/heroes.json`,heroe).pipe(map((res: any) =>{
      heroe.id = res.name
      return heroe;
    }));

  }
  updateHerue(heroe: HeroeModel){
    const herueTem = {
      ...heroe
    };
    delete herueTem.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`,herueTem)

  }

  deleteHeroe ( id:string ){
    return this.http.delete(`${this.url}/heroes/${id}.json`)
  }

  getHeroe( id: string ){
    return this.http.get(`${this.url}/heroes/${id}.json`)
  }

  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`)
      .pipe(map(this.crearArreglo),delay(1500))

  }
  private crearArreglo( heroesObj : object){

    const heroes : HeroeModel[] = [];
    if (heroesObj === null) {return [];}

    Object.keys(heroesObj).forEach( key =>{
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);
    })

    return heroes;

  }
}
