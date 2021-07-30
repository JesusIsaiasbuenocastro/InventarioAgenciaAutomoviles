import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AutomovilModel } from '../models/automovil.model';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private url = 'https://back-end-inventario.herokuapp.com/api';
  constructor(private http: HttpClient ) { }

  crearAutomovil( automovil : AutomovilModel){
    
    return this.http.post(`${this.url}/inventario`, automovil).
      pipe(
        map( (resp : any ) =>  {
          automovil.id = resp.respuesta.insertId;
          return automovil;
        }),
        catchError(error => {
          return error;
        })
      )
    
  }
  actualizarInventario(marca : AutomovilModel){
    console.log(marca);
    return this.http.put(`${this.url}/inventario/${marca.id}`, marca)
      
  }

  eliminarInventario(marca : AutomovilModel){
    return this.http.delete(`${this.url}/inventario/${marca.id}`);
      
  }
  obtenerInventarioPorId(id: any){
    return this.http.get(`${this.url}/inventario/${ id }`)
      .pipe(
        map( (respuesta:  any) =>{
          return respuesta.rows[0];
        } )
      )
     
  }


  obtenerInventario(){
    return this.http.get(`${this.url}/inventario/`)
      .pipe(
        map( (respuesta:any) => {
          return respuesta.rows;
        } )
      )
    
    ;
  }

}
