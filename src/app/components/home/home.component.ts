import { Component } from '@angular/core';
import { MainMenuComponent } from '../main-menu/main-menu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainMenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  

}
