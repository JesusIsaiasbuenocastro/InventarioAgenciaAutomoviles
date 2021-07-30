import { Component, OnInit } from '@angular/core';
import { ModeloModel } from 'src/app/models/modelo.models';
import { ModeloService } from 'src/app/services/modelo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-catalogomodelos',
  templateUrl: './catalogomodelos.component.html' 
})
export class CatalogomodelosComponent implements OnInit {

  modelos: ModeloModel[] = [];
  constructor(private modeloService: ModeloService) { }

  ngOnInit(): void {
    this.modeloService.obtenerModelos().subscribe(resp => {
      this.modelos = resp;
      console.log(this.modelos);

    })
  }


  eliminarModelo(modelo: ModeloModel, i :number){

    Swal.fire({
      title:'¿Estas seguro?',
      text: 'Estas seguro que deseas borrar el registro?',
      icon:'question',
      showConfirmButton: true,
      showCancelButton:true
    }).then(
      resp => {
        if(resp.value){
          this.modeloService.eliminarModelo(modelo).subscribe(
            res => {
              console.log(res);
               //Borrar elemento de un arreglo
              this.modelos.splice(i,1);
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
