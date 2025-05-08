import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';



@Component({
  selector: 'app-signin',
  imports: [CommonModule,FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.focusEmail()
  }
  
  @ViewChild('emailInput') inputEmail!: ElementRef;
  @ViewChild('senhaInput') inputSenha!: ElementRef;
  @ViewChild('elementPopupInfo') infoPopup!: ElementRef;
  @ViewChild('popupErrorCredentials') popupError!: ElementRef;
  
  infoApp() {
    const popupInfo = new bootstrap.Modal(this.infoPopup.nativeElement);
    popupInfo.show();    
  }



  showPopupError(){    

    const popupError = new bootstrap.Modal(this.popupError.nativeElement);
    popupError.show();
    this.verificarUser();   
  }

  credenciaisCorretas:Boolean = false;
  email = '';
  senha = '';

  
  focusEmail() {
    if (this.email.trim() === '') {
      this.inputEmail?.nativeElement.focus();
      return
    } else if (this.senha.trim() === '') {
      this.inputSenha?.nativeElement.focus();
    }
  }
  
  validarCampos(): boolean {
    return this.email.trim() !== '' && this.senha.trim() !== '';
  }

  verificarUser(){
    
    
    if (!this.validarCampos()){
      this.credenciaisCorretas = false;
    } else if (this.email == "admin" && this.senha == "123456"){
      this.credenciaisCorretas = true;
    } else {
      this.credenciaisCorretas = false;

    } 
  }


  
  
}
