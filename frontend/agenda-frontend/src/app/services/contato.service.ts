import { Injectable, signal } from '@angular/core';
import { Contato } from '../models/contato.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private contatoSignal = signal<Contato[]>([]);

  constructor(private http: HttpClient) { }

  listarContatos(){
    this.http.get<Contato[]>('http://localhost:8080/agenda/contatos')
    .subscribe(contatos => this.contatoSignal.set(contatos));
  }

  get contatos(){
    return this.contatoSignal;
  }

  inserirContato(contato: Contato){
    this.http.post('http://localhost:8080/agenda/contato', contato)
    .subscribe(() => this.listarContatos);
  }

  excluirContato(idContato: number){
    this.http.delete(`http://localhost:8080/agenda/contato/${idContato}`, )
    .subscribe(() => this.listarContatos);
  }

  atualizarContato(idContato: number, contatoAtualizado: Contato) {
    this.http.patch(`http://localhost:8080/agenda/contato/${idContato}`, contatoAtualizado)
    .subscribe(() => this.listarContatos);
  }

  buscarContato(idContato: number) {
    return this.contatoSignal().find(contato => contato.idContato == idContato);
  }
}
