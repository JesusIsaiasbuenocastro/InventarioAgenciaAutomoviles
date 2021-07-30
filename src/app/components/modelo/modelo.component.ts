
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModeloModel } from 'src/app/models/modelo.models';
import { ModeloService } from 'src/app/services/modelo.service';
import { MarcaService } from 'src/app/services/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html'
})
export class ModeloComponent implements OnInit {
  modelo = new ModeloModel();
  marcas :any[] = [];
  tiposAutomovil :any[] = [];
  constructor(private modeloService: ModeloService ,private marcaService: MarcaService ,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if( id  !== 'nuevo'){
      this.modeloService.obtenerModeloporId( id)
        .subscribe( (resp :any ) => {
          this.modelo = resp;
          console.log(this.modelo);
        });
    }

    //Consultar las marcas para mostrarlos en el select
    this.marcaService.obtenerMarcas().subscribe(resp => {
     
      this.marcas = resp;
      this.marcas.unshift({
        nombre: '-Seleccione una marca-',
        id :''
      })
      console.log(this.marcas);

    });

    //Consultar los tipo de automovil
    this.modeloService.obtnerTipoAutomovil().subscribe(resp => {
     
      this.tiposAutomovil = resp;
      this.tiposAutomovil.unshift({
        nombretipo: '-Seleccione un tipo de automovil-',
        id :''
      })
      console.log(this.tiposAutomovil);
    });
    

  }

  guardar( form: NgForm){
     //validar que el formulario tenga los datos capturados
     if(form.invalid){
      console.log('Formulario no valido')
      
      return;
    }

      //Realizar validacion para saber si se va actualizar o a insertar
      if( this.modelo.id) {
        this.modeloService.actualizarModelo(this.modelo).subscribe( respuesta => {
          Swal.fire({
            title: 'Exito',
            text: 'Se actualizó correctamente el registro',
            icon: 'success'
          }
          ); 
        }
        ,error => {
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error en el servicio',
            icon: 'error'
          });
        });
      }else{
        this.modeloService.crearModelo(this.modelo).subscribe( respuesta => {
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
