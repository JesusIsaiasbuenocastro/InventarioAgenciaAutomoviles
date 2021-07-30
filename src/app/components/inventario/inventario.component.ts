import { Component, OnInit } from '@angular/core';
import { AutomovilModel } from 'src/app/models/automovil.model';
import { InventarioService } from 'src/app/services/inventario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html'
})
export class InventarioComponent implements OnInit {

  inventario :  AutomovilModel[] =[];

  constructor(private inventarioService: InventarioService) { }

  ngOnInit(): void {
    this.inventarioService.obtenerInventario().subscribe(resp =>{
        this.inventario = resp;
        console.log(this.inventario);
    })
  }

  eliminarAutomovil(automovil: AutomovilModel, i :number){

    Swal.fire({
      title:'¿Estas seguro?',
      text: 'Estas seguro que deseas borrar el registro?',
      icon:'question',
      showConfirmButton: true,
      showCancelButton:true
    }).then(
      resp => {
        if(resp.value){
          this.inventarioService.eliminarInventario(automovil).subscribe(
            res => {
              console.log(res);
               //Borrar elemento de un arreglo
              this.inventario.splice(i,1);
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
