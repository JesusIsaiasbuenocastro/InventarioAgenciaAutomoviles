import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AutomovilModel } from 'src/app/models/automovil.model';
import { InventarioService } from 'src/app/services/inventario.service';
import { MarcaService } from 'src/app/services/marca.service';
import { ModeloService } from 'src/app/services/modelo.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-automovil',
  templateUrl: './automovil.component.html'
})
export class AutomovilComponent implements OnInit {

  marcas :any[] = [];
  modelos :any[] = [];
  tiposAutomovil :any[] = [];
  automovil =new AutomovilModel();
  
  colores: any = [{
        color:"Azul",
        id:'0'
    },
    {
        color:'Gris',
        id:'1'
    },
    {
        color:'Negro',
        id:'2'
    },
    {
        color:'Blanco',
        id:'3'
    },
    ];

  constructor(private modeloService: ModeloService ,
              private marcaService: MarcaService , 
              private inventarioService: InventarioService ,
              private route: ActivatedRoute,
              private datepipe: DatePipe ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap);
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if( id  !== 'nuevo'){
      this.inventarioService.obtenerInventarioPorId( id)
        .subscribe( (resp :any ) => {
          
          this.automovil = resp;
          console.log(this.automovil);
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

     //Consultar los tipo de automovil
     this.modeloService.obtenerModelos().subscribe(resp => {
     
      this.modelos = resp;
      this.modelos.unshift({
        modelo: '-Modelo del auto-',
        id :''
      })
      console.log(this.modelos);
    });
    
    //Crear un arreglo de colores
    console.log(this.colores);
  }


  guardar( form: NgForm){
    //validar que el formulario tenga los datos capturados
    if(form.invalid ){
      console.log('Formulario no valido')
      return;
    }
    


    //Realizar validacion para saber si se va actualizar o a insertar
    if( this.automovil.id) {
      this.inventarioService.actualizarInventario(this.automovil).subscribe( respuesta => {
        Swal.fire({
          title: 'Exito',
          text: 'Se actualizó correctamente el registro',
          icon: 'success'
        }); 
      });
    }else{
      this.inventarioService.crearAutomovil(this.automovil).subscribe( respuesta => {
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
