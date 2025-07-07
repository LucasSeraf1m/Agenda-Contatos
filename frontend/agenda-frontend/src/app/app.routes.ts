import { Routes } from '@angular/router';
import { AddEditContato } from './add-edit-contato/add-edit-contato';
import { GridContatos } from './grid-contatos/grid-contatos';
import { ListaContatos } from './lista-contatos/lista-contatos';

export const routes: Routes = [
  { path: 'add-contato', component: AddEditContato },
  { path: 'grid', component: GridContatos },
  { path: 'lista', component: ListaContatos }
];
