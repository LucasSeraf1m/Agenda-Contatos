import { ContatoService } from './../services/contato.service';
import { Component, effect, inject, ViewChild, viewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Contato } from '../models/contato.model';

@Component({
  selector: 'app-grid-contatos',
  imports: [MatTableModule, MatPaginatorModule, MatSnackBarModule, MatSnackBarModule, MatButtonModule, MatCardModule],
  templateUrl: './grid-contatos.html',
  styleUrl: './grid-contatos.css',
})
export class GridContatos {
  contatoService = inject(ContatoService);
  snackBar = inject(MatSnackBar);

  colunas: string[] = ["idContato", "nome", "telefone", "idade", "dataNascimento", "email"];

  dataSource = new MatTableDataSource<Contato>();

  totalItens = 0;
  pageSize: number = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  contatos = this.contatoService.contatos;

  constructor() {
    this.contatoService.listarContatos();

    effect(() => {
      const contatos = this.contatos();
      this.dataSource.data = contatos;
      this.totalItens = contatos.length;
    })
  }
}
