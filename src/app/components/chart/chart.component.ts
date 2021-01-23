import { Component, OnInit } from '@angular/core';
import { PeriodType } from 'src/app/enums/period-type.enum';
import { City } from 'src/app/models/administration-units/city.model';
import { Voivodeship } from 'src/app/models/administration-units/voivodeship.model';
import { Request } from 'src/app/models/request/request.model';
import { Statistics } from 'src/app/models/statisctics/statistic.model';

import { MainService } from 'src/app/services/main-service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  voivodeships: Voivodeship[] = [];
  cities: City[] = [];
  statistics: Statistics[] = [];
  periodType: PeriodType = PeriodType.ByYear;
  selectedCity: number;
  selectedVoivodeship: number;
  startDate: string;
  endDate: string;
  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.getVoivodeships();
    this.getStatistics();
  }

  selectCity(id: number): void {
    this.selectedCity = id;
    this.getStatistics();

  }

  selectVoivodeship(id: number): void {
    this.selectedVoivodeship = id;
    this.getStatistics();
    this.getCities(id);
  }

  selectPeriod(value: PeriodType): void {
    this.periodType = value;
    console.log(value, 'period chart comp')
    this.getStatistics();
  }

  selectStartDate(date: string): void {
    this.startDate = date;
    this.getStatistics();
  }

  selectEndDate(date: string): void {
    this.endDate = date;
    this.getStatistics();
  }
  
  private getCities(id: number): void {
    this.mainService.getCities(id).subscribe( cities => {
      this.cities = cities;
    })
  }

  private getVoivodeships(): void {
    this.mainService.getVoivodeships().subscribe( voivodeships => {
      this.voivodeships = voivodeships;
    });
  }

  private getStatistics(): void {
    const request: Request = {
      cityId: this.selectedCity,
      voivodeshipId: this.selectedVoivodeship,
      periodType: this.periodType,
      from: this.startDate,
      to: this.endDate
    };
    this.mainService.getStatistics(request).subscribe( stats => {
      this.statistics = stats;
    });
  }

}
