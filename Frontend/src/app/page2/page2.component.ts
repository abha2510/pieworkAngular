import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ForecastService } from '../forecast.service';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {
  forecastData: any[] = [];
  displayedColumns: string[] = ['date', 'temp', 'description'];
  city: string = ''; 
  
  constructor(private forecastService: ForecastService, public dialog: MatDialog,private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['city']) {
        this.fetchForecast(params['city']);
        this.city = params['city'];
        
      } else {
        this.fetchForecast('SampleCity');  
      }
    });
}
getMilliseconds(timestamp: number): number {
  return timestamp * 1000;
}


fetchForecast(city: string) {
    this.forecastService.getForecastData(city).subscribe(data => {
      this.forecastData = data;
      console.log(data);
      
    });
}
  openHelpDialog() {
    this.dialog.open(HelpDialogComponent, {
      data: { message: "This page displays the weather forecast for the cities." }
    });
  }
}
