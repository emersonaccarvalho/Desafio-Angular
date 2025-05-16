import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  imports: [],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent implements AfterViewInit {
  constructor(private http:HttpClient, private router:Router){}

  isLocalStorage = localStorage.getItem('loggedIn');
  isSessionStorage = sessionStorage.getItem('loggedIn');



  logado:Boolean = false;
  mainImageVehicle:string = "";

  ngAfterViewInit(): void {
    this.setImagem();
    if (this.isLocalStorage == 'true' || this.isSessionStorage == 'true'){
      this.logado = true;
    } else {
      this.router.navigate(["/signin"]);
    }
  }

  LogTheUserOut(){
    localStorage.setItem('loggedIn', 'false');
    this.logado = false;
    this.isLocalStorage = 'false';
    this.router.navigate(["/signin"]);

  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  goToLogin() {
    this.router.navigate(['/signin']);
  }

  setImagem() {
  this.http.get<any[]>("http://localhost:3001/vehicles").subscribe({
    next: (res) => {
      this.mainImageVehicle = res[0].img;
      console.log(this.mainImageVehicle)
    },
    error: (err) => {
      console.error("Erro ao buscar veículos:", err);
    }
  });
}
}

