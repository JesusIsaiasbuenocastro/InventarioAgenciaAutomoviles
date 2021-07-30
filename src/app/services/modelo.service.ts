import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ModeloModel } from '../models/modelo.models';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {
  private url = 'https://back-end-inventario.herokuapp.com/api';

  constructor(private http: HttpClient ) { }

  crearModelo( modelo : ModeloModel){
    
    return this.http.post(`${this.url}/modelos`, modelo).
      pipe(
        map( (resp : any ) =>  {
          modelo.id = resp.respuesta.insertId;
          return modelo;
        }),
        catchError(error => {
          return error;
        })
      )
    
  }
  actualizarModelo(modelo : ModeloModel){
    return this.http.put(`${this.url}/modelos/${modelo.id}`, modelo);
      
  }
  eliminarModelo(marca : ModeloModel){
    return this.http.delete(`${this.url}/modelos/${marca.id}`);
      
  }
  obtenerModeloporId(id: any){
    return this.http.get(`${this.url}/modelos/${ id }`)
      .pipe(
        map( (respuesta:  any) =>{
          return respuesta.rows[0];
        } )
      )
     
  }
  obtenerModelos(){
    return this.http.get(`${this.url}/modelos`)
      .pipe(
        map( (respuesta:  any) =>{
          return respuesta.rows;
        } )
      )
  }

  //Obtener los tipos de automovil(Se crea aqui solo por que es para cosultar, no se hara un CRUD)
  obtnerTipoAutomovil(){
    return this.http.get(`${this.url}/tipoAutomovil`)
      .pipe(
        map( (respuesta:  any) =>{
          return respuesta.rows;
        } )
      )
  }
}
