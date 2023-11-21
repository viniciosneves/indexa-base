import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from './componentes/container/container.component';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { SeparadorComponent } from './componentes/separador/separador.component';
import { ContatoComponent } from './componentes/contato/contato.component';

import agenda from './agenda.json'
import { FormsModule } from '@angular/forms';

interface Contato {
  id: number
  nome: string
  telefone: string
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ContainerComponent, CabecalhoComponent, SeparadorComponent, ContatoComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  alfabeto = "abcdefghijklmnopqrstuvwxyz";
  contatos: Contato[] = agenda

  filtroPorTexto: string = ''

  filtraContatoPorletra(letra: string): Contato[] {

    return this.contatos.filter(contato => {
      // Normaliza o nome do contato para remover acentos. O método 'normalize'
      // com o argumento "NFD" (Decomposição Normalizada da Forma Canônica) separa
      // os acentos das letras. O 'replace' então remove os acentos (marcas diacríticas).
      const nomeNormalizado = contato.nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const filtroNormalizado = this.filtroPorTexto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      // Converte o nome normalizado para minúsculas para garantir uma comparação
      // insensível a maiúsculas/minúsculas.
      const nomeMinusculo = nomeNormalizado.toLowerCase();

      // Verifica se o nome do contato começa com a letra especificada.
      // Retorna 'true' se o nome começar com a letra, 'false' caso contrário.
      return nomeMinusculo.startsWith(letra);
    });
  }
}
