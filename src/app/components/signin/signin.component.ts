import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import confetti from 'canvas-confetti';



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
  
  validarCampos(): Boolean {
    return this.email.trim() !== '' && this.senha.trim() !== '';
  }

  verificarUser(){
    
    
    if (!this.validarCampos()){
      this.credenciaisCorretas = false;
    } else if (this.email == "admin" && this.senha == "123456"){
      this.credenciaisCorretas = true;
      this.soltarConfete()
    } else {
      this.credenciaisCorretas = false;

    } 
  }


  soltarConfete() {
    const duration =  500;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }

  
}
