import { Component, OnInit } from '@angular/core';
import { CityService } from '../city.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {
  city = 'Pune';
  inputValue = this.city;
  suggestedCities = ['Delhi', 'Mumbai', 'Assam', 'Srinagar', 'Chennai'];
  dataSource = new MatTableDataSource<string>(this.suggestedCities);

@ViewChild(MatPaginator) paginator!: MatPaginator;

ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
}

  constructor(private cityService: CityService, private router: Router) { }

  ngOnInit(): void { }

  handleInputChange(event: any): void {
    this.inputValue = event.target.value;
  }

  handleCitySearch(): void {
    this.city = this.inputValue;
    this.cityService.getCityData(this.city).subscribe(data => {
      console.log(data);
      this.router.navigate(['/page2', this.city]); 
    });
  }

  handleSuggestedCityClick(cityName: string): void {
    this.inputValue = cityName;
    this.handleCitySearch();
    
  }

}
