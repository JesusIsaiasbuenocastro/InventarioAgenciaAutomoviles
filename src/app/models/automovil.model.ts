import { DatePipe } from "@angular/common";

export class AutomovilModel {
    id: string = '';
    id_marca:string ='';
    marca:string=''
    id_modelo: string = '';
    modelo: string ='';
    color:string ='';
    id_tipo: string ='';
    nombreTipo:string ='';
	cantidad: number =0 ;
	kilometraje:number =0;
    fecha_entrada: Date = new Date();

    constructor(){
        this.fecha_entrada = new Date();
    }
}