import { AfterViewInit, Component } from '@angular/core';
import { MainMenuComponent } from '../main-menu/main-menu.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainMenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit{
  constructor(private http:HttpClient, private router:Router){}
  mainImageVehicle:string = "";


  ngAfterViewInit(): void {
    this.setImagem();
    const popup = document.getElementById("elementPopupInfo") as HTMLElement;
    const popupInfo = new Modal(popup);
    const islocalStorage = localStorage.getItem('loggedIn');
    const issessionStorage = sessionStorage.getItem('loggedIn');

    if (islocalStorage == 'true' || issessionStorage == 'true'){
    popupInfo.show();
    }
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
