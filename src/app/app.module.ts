import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from "@angular/common";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CatalogomarcasComponent } from './components/catalogomarcas/catalogomarcas.component';
import { CatalogomodelosComponent } from './components/catalogomodelos/catalogomodelos.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MarcaComponent } from './components/marca/marca.component';
import { ModeloComponent } from './components/modelo/modelo.component';
import { AutomovilComponent } from './components/automovil/automovil.component';


//con el FormsModule angular controla el submit del boton del formulario html
@NgModule({
  declarations: [
    AppComponent,
    CatalogomarcasComponent,
    CatalogomodelosComponent,
    InventarioComponent,
    NavbarComponent,
    MarcaComponent,
    ModeloComponent,
    AutomovilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
