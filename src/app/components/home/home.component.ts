import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesServidorService } from 'src/app/services/heroes-servidor.service';


import Swal from "sweetalert2";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  heroes: HeroeModel[] = []
  cargando = false;

  constructor(private servidor:HeroesServidorService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.servidor.getHeroes().subscribe(res => {
      this.heroes = res
      this.cargando = false
    })
  }

  deleteHeroe( heroe: HeroeModel , i : number ){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.heroes.splice(i, 1)
        this.servidor.deleteHeroe(heroe.id).subscribe()
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

  }

}
