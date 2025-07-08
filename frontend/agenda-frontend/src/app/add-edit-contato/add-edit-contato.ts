import { routes } from './../app.routes';
import { ContatoService } from './../services/contato.service';
import { Component, effect, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Contato } from '../models/contato.model';

@Component({
  selector: 'app-add-edit-contato',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCardModule,
    MatIconModule,
    MatFormField,
  ],
  templateUrl: './add-edit-contato.html',
  styleUrl: './add-edit-contato.css',
})
export class AddEditContato {
  ContatoService = inject(ContatoService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  route = inject(ActivatedRoute);

  contatoForm: FormGroup;
  isModoEditar = false;

  contatoId: number = 0;

  constructor(private fb: FormBuilder) {
    this.contatoForm = this.fb.group({
      nome: ['', Validators.required],
      telefone: [''],
      idade: [{ value: null, disabled: true }],
      dataNascimento: [''],
      email: ['', Validators.email],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('idContato');

      if (id) {
        this.isModoEditar = true;
        this.contatoId = +id;
        this.ContatoService.listarContatos();

        effect(() => {
          const contatosData = this.ContatoService.contatos();
          if (contatosData.totalElements > 0) {
            this.loadContato(this.contatoId);
          }
        });
      }
    });

    this.contatoForm
      .get('dataNascimento')
      ?.valueChanges.subscribe((data: Date) => {
        const idade = this.calcularIdade(data);
        this.contatoForm.get('idade')?.setValue(idade);
      });
  }

  loadContato(contatoId: number) {
    const contato = this.ContatoService.buscarContato(contatoId);
    if (contato) {
      this.contatoForm.patchValue({
        nome: contato.nome,
        telefone: contato.telefone,
        idade: contato.idade,
        dataNascimento: contato.dataNascimento,
        email: contato.email,
      });
    }
  }

  onSubmit() {
    if (this.contatoForm.valid) {
      const formValues = this.contatoForm.value;

      const idadeCalculada = this.calcularIdade(formValues.dataNascimento);

      const contato: Contato = {
        ...this.contatoForm.value,
        idade: idadeCalculada,
        id: this.contatoId,
      };

      if (this.isModoEditar && this.contatoId !== null) {
        this.ContatoService.atualizarContato(this.contatoId, contato);
        this.snackBar.open('Contato salvo com sucesso', undefined, {
          duration: 3000,
        });
      } else {
        this.ContatoService.inserirContato(contato);
        this.snackBar.open('Contato salvo com sucesso', undefined, {
          duration: 3000,
        });
      }
      this.router.navigate(['/grid']);
    }
  }

  calcularIdade(dataNascimento: Date): number {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  }
}
