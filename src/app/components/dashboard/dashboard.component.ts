import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MainMenuComponent } from '../main-menu/main-menu.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,FormsModule,MainMenuComponent],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
  constructor(private http:HttpClient, private router:Router){}
  vehicleModel:string = "";
  vehicleVolumetotal:number = 0;
  vehicleConnected:number = 0;
  vehicleSoftwareUpdates:number = 0;
  vehicleVin:string = "";
  vehicleImg:string = "";
  vehicleOdometro:number = 0;
  vehicleNivelCombustivel:number = 0;
  vehicleStatus:string = "-";
  vehicleLat:number = 0;
  vehicleLong:number = 0;
  vinInput:string = "-"






  @ViewChild('dropdownVehicle') selectVehicle!: ElementRef;
  selectedVehicle: number = 0;

  ngAfterViewInit() {
    this.setImagem();
  }

  getSelectedVehicle() {
    this.selectedVehicle = Number(this.selectVehicle.nativeElement.value)-1;
    console.log(this.selectedVehicle);
    this.setImagem()
  }

  getChangeVin(){
    const input = document.getElementById("inputVin") as HTMLInputElement;
    this.vinInput = input.value;
    this.setVehicleInfo(this.vinInput)
  }

  setImagem() {
  this.http.get<any[]>("http://localhost:3001/vehicles").subscribe({
    next: (res) => {
      this.vehicleImg = res[this.selectedVehicle].img;
      this.vehicleModel = res[this.selectedVehicle].vehicle;
      this.vehicleVolumetotal = res[this.selectedVehicle].volumetotal;
      this.vehicleConnected = res[this.selectedVehicle].connected;
      this.vehicleSoftwareUpdates = res[this.selectedVehicle].softwareUpdates;
      this.vehicleVin = res[this.selectedVehicle].vin;
    },
    error: (err) => {
      console.error("Erro ao buscar veículos:", err);
    }
  });
  }

  setVehicleInfo(vin:String) {
  this.http.post<any>("http://localhost:3001/vehicleData",{vin}).subscribe({
    next: (res) => {
      this.vehicleOdometro = res.odometro;
      this.vehicleNivelCombustivel = res.nivelCombustivel;
      this.vehicleStatus = res.status;
      this.vehicleLat = res.lat;
      this.vehicleLong = res.long;
    },
    error: (err) => {
      console.error("Erro ao buscar veículos:", err);
    }
  });
  }
}
