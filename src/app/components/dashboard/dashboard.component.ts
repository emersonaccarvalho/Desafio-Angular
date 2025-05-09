import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,FormsModule],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
 
  @ViewChild('dropdownVehicle') selectVehicle!: ElementRef;
  selectedVehicle: number = 1;

  ngAfterViewInit() {
    this.selectedVehicle = Number(this.selectVehicle.nativeElement.value);
  }

  getSelectedVehicle() {
    this.selectedVehicle = Number(this.selectVehicle.nativeElement.value);
  }
}
