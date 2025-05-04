import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  imports: [CommonModule,FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  @ViewChild('emailInput') inputEmail!: ElementRef;
  @ViewChild('senhaInput') inputSenha!: ElementRef;
 
  infoApp(){
    alert("Por favor, insira o e-mail associado à sua conta para poder acessar o sistema.")
    this.inputEmail.nativeElement.focus();
  }
  
  email = '';
  senha = '';

  validarCampos(): boolean {
    return this.email.trim() !== '' && this.senha.trim() !== '';
  }

  verificarUser(){
    
    
    if (!this.validarCampos()){
      alert("O e-mail ou a senha estão em branco. Preencha!")
    } else if (this.email == "admin" && this.senha == "123456"){
      alert("Acesso permitido!")
    } else {
      alert("Acesso negado!")
    } 
  }
  
  
}
