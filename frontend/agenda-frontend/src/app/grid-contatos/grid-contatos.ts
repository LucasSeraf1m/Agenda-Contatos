import { ContatoService } from './../services/contato.service';
import { Component, effect, inject, ViewChild, viewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Contato } from '../models/contato.model';
import { RouterModule } from '@angular/router';
import { MatFormField, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-grid-contatos',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    MatFormField,
    MatInputModule,
  ],
  templateUrl: './grid-contatos.html',
  styleUrl: './grid-contatos.css',
})
export class GridContatos {
  contatoService = inject(ContatoService);
  snackBar = inject(MatSnackBar);

  colunas: string[] = [
    'idContato',
    'nome',
    'telefone',
    'idade',
    'dataNascimento',
    'email',
    'acoes',
  ];

  dataSource = new MatTableDataSource<Contato>();

  totalItens = 0;
  pageSize: number = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  contatos = this.contatoService.contatos;

  constructor() {
    this.contatoService.listarContatos();

    effect(() => {
      const contatos = this.contatos();
      this.dataSource.data = contatos.content;
      this.totalItens = contatos.totalElements;
      this.dataSource.paginator = this.paginator;
    });
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  excluirContato(contatoId: number) {
    this.contatoService.excluirContato(contatoId);
    this.snackBar.open('Contato excluído com sucesso', undefined, {
      duration: 3000,
    });
  }

  aplicarFiltro(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }
}
