import { Component, OnInit } from '@angular/core';
import { MarcaModel } from 'src/app/models/marca.model';
import { MarcaService } from 'src/app/services/marca.service';
import { NgModule } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-catalogomarcas',
  templateUrl: './catalogomarcas.component.html'
})
export class CatalogomarcasComponent implements OnInit {

  marcas: any[] = [];

  constructor( private marcaService : MarcaService) { }

  ngOnInit(): void {
    this.marcaService.obtenerMarcas().subscribe(resp => {
     
      this.marcas = resp;
      console.log(this.marcas);

    })
 
  }

  eliminarMarca(marca: MarcaModel, i :number){

    Swal.fire({
      title:'¿Estas seguro?',
      text: 'Estas seguro que deseas borrar el registro?',
      icon:'question',
      showConfirmButton: true,
      showCancelButton:true
    }).then(
      resp => {
        if(resp.value){
          this.marcaService.eliminarMarca(marca).subscribe(
            res => {
              console.log(res);
               //Borrar elemento de un arreglo
              this.marcas.splice(i,1);
            },
            error => {
              Swal.fire({
                title:'Error',
                text:'Ocurrió un error',
                icon:'error'
              })
            }
          );
         
      
        }
      }
    )
  }

}
