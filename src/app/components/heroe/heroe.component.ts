import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesServidorService } from 'src/app/services/heroes-servidor.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  heroe = new HeroeModel();

  constructor(private servidor:HeroesServidorService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if ( id !== 'nuevo' ){
      this.servidor.getHeroe(id).subscribe( (data: HeroeModel) => {
        this.heroe = data;
        this.heroe.id = id;
      } );
    }
  }

  guardar(form: NgForm ){
    if (form.invalid) {
      console.log('form no valido');
      return ;
    }
    Swal.fire({
      title: 'Espere',
      text: 'Guardando info',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();


    if (this.heroe.id){
      this.servidor.updateHerue(this.heroe).subscribe(res =>{
        Swal.fire({
          title: this.heroe.nombre,
          text: 'se actializo correctamente',
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
        console.log('se actializo');
        console.log(res);
      })
    }else{
      this.servidor.newHeroe(this.heroe).subscribe(res =>{
        Swal.fire({
          title: this.heroe.nombre,
          text: 'se actializo correctamente',
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
        console.log('se creo');
        console.log(res);
      })
    }





  }
}
