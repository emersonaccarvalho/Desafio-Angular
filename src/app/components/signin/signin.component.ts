import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import confetti from 'canvas-confetti';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router} from '@angular/router';


@Component({
  selector: 'app-signin',
  imports: [CommonModule,FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements AfterViewInit {
  constructor(private http:HttpClient, private router:Router){}

  ngAfterViewInit(): void {
    this.setImagem();
    this.focusEmail();
    if (this.isLoggedIn === "true"){
      this.router.navigate(['/']);
    }
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
    //Este popup é um popup informativo e não necessariamente de erro. Em caso de credenciais erradas, exibe uma mensagem de erro (esta validação está no HTML com condicional if). Em caso de sucesso, exibe mensagem de sucesso.
    const popupError = new bootstrap.Modal(this.popupError.nativeElement, {
      backdrop: false
    });
    popupError.show();
  }

 hidePopup() {
  // const popupElement = new bootstrap.Modal(this.popupError.nativeElement);
  // if (popupElement) {
  //   popupElement.hide();
  // }
  const popupError = new bootstrap.Modal(this.popupError.nativeElement, {
    backdrop: false
  });
  popupError.hide()
  
  
}


  credenciaisCorretas:Boolean = false;
  email = '';
  senha = '';
  mainImageVehicle:string = "";
  remember = document.getElementById("rememberMe") as HTMLInputElement;
  isLoggedIn = localStorage.getItem('loggedIn');
;

  focusEmail() {
    if (this.email.trim() === '') {
      this.inputEmail?.nativeElement.focus();
      return
    } else if (this.senha.trim() === '') {
      this.inputSenha?.nativeElement.focus();
    }
  }
  
  validarCampos(): Boolean {
    //Função que vai verificar se os dados de e-mail e senha estão preenchidos. Retornará um booleano
    return this.email.trim() !== '' && this.senha.trim() !== '';
  }

  //Função que será chamada no botão "entrar". Vai fazer uma requisição API para verificar se as credenciais estão corretas.
  conferirDados():void {
    this.http.post("http://localhost:3001/login",{nome:this.email,senha:this.senha},{
      headers: new HttpHeaders({"Accept":"application/json"}), 
      withCredentials : false
    }).subscribe({
      next: (res) => {
        this.credenciaisCorretas = true;
        localStorage.setItem('loggedIn', 'true');
        this.soltarConfete();
        this.showPopupError();
        setTimeout(() => {
        this.hidePopup();
        this.router.navigate(['/']);
        }, 2000); 
        
      },
      error:(err) => {
        this.credenciaisCorretas = false;
        this.showPopupError();
      }
    })
  }

  //Função que vai gravar a imagem inicial da Ford ranger na tela
  // Função que vai gravar a imagem inicial da Ford Ranger na tela
setImagem() {
  this.http.get<any[]>("http://localhost:3001/vehicles").subscribe({
    next: (res) => {
      this.mainImageVehicle = res[0].img;
    },
    error: (err) => {
      console.error("Erro ao buscar veículos:", err);
    }
  });
}


  soltarConfete() {
    const duration =  1500;
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
