import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-lista-contatos',
  imports: [MatListModule, MatIconModule],
  templateUrl: './lista-contatos.html',
  styleUrl: './lista-contatos.css'
})
export class ListaContatos {

}
