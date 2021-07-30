import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MarcaModel } from '../models/marca.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private url = 'https://inventario-back-end.herokuapp.com/api';

  constructor( private http: HttpClient ) { }


  crearMarca( marca : MarcaModel){
    
    return this.http.post(`${this.url}/marcas`, marca).
      pipe(
        map( (resp : any ) =>  {
          marca.id = resp.respuesta.insertId;
          return marca;
        }),
        catchError(error => {
          return error;
        })
      )
    
  }

  actualizarMarca(marca : MarcaModel){
    return this.http.put(`${this.url}/marcas/${marca.id}`, marca)
      
  }

  eliminarMarca(marca : MarcaModel){
    return this.http.delete(`${this.url}/marcas/${marca.id}`);
      
  }

  obtenerMarcas(){
    return this.http.get(`${this.url}/marcas/`)
      .pipe(
        map( this.crearArreglo)
      )
    
    ;
  }

  obtenerMarcaporId(id: any){
    return this.http.get(`${this.url}/marcas/${ id }`)
      .pipe(
        map( (respuesta:  any) =>{
          return respuesta.rows[0];
        } )
      )
     
  }

  private crearArreglo(marcasObj: any){
    console.log(marcasObj);
    const marcas: MarcaModel[] = [];

    if(marcasObj === null )
    {
      return [];
    }
    
    Object.keys( marcasObj.rows ).forEach( key => {
      const marca : MarcaModel = marcasObj.rows[key];
      //console.log( marcasObj.rows[key]);
      //marca.id = key;
      marcas.push(marca);
      
    })

    return marcas;
  }

}
