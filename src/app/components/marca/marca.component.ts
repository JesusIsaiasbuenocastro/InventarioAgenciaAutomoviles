import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MarcaModel } from 'src/app/models/marca.model';
import { MarcaService } from 'src/app/services/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html'
})
export class MarcaComponent implements OnInit {

  marca = new MarcaModel();
  error : boolean =false ;

  //Para mostrar el mensaje al usuario
  mensaje : string = '';
  titulo : string = '';
  icono: any = '';


  constructor( private marcaService: MarcaService ,
              private route: ActivatedRoute ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if( id  !== 'nuevo'){
      this.marcaService.obtenerMarcaporId( id)
        .subscribe( (resp :any ) => {
          this.marca = resp;
          console.log(this.marca);
        });
    }
  }

  guardar( form: NgForm){
    //validar que el formulario tenga los datos capturados
    if(form.invalid){
      console.log('Formulario no valido')
      this.error =true;
      return;
    }

      //Realizar validacion para saber si se va actualizar o a insertar
      if( this.marca.id) {
        this.marcaService.actualizarMarca(this.marca).subscribe( respuesta => {
          Swal.fire({
            title: 'Exito',
            text: 'Se actualizó correctamente el registro',
            icon: 'success'
          }); 
        });
      }else{
        this.marcaService.crearMarca(this.marca).subscribe( respuesta => {
          Swal.fire({
            title: 'Exito',
            text: 'Se guardó correctamente el registro',
            icon: 'success'
          }); 
        }, 
          error => {
            console.log(error)
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error en el servicio',
              icon: 'error'
            });
           
          }
        );
      }
  }

}
