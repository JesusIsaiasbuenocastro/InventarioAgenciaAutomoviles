import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogomarcasComponent } from '../app/components/catalogomarcas/catalogomarcas.component';
import { CatalogomodelosComponent } from './components/catalogomodelos/catalogomodelos.component';
import { MarcaComponent } from './components/marca/marca.component';
import { CommonModule } from '@angular/common';
import { ModeloComponent } from './components/modelo/modelo.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { AutomovilComponent } from './components/automovil/automovil.component';

const routes: Routes = [
  { path: 'catalogomarcas', component: CatalogomarcasComponent },
  { path: 'catalogomodelos', component: CatalogomodelosComponent },
  { path: 'inventario', component: InventarioComponent },
  { path: 'marca/:id', component: MarcaComponent },
  { path: 'modelo/:id', component: ModeloComponent },
  { path: 'automovil/:id', component: AutomovilComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }

];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
