import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from 'src/app/Services/weather-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public weatherDataService: WeatherDataService) { }

  ngOnInit(): void {
  }

}
