import { Output } from '@angular/core';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';


import { PeriodType } from 'src/app/enums/period-type.enum';
import { City } from 'src/app/models/administration-units/city.model';
import { Voivodeship } from 'src/app/models/administration-units/voivodeship.model';
import {DateHelper} from 'src/app/helpers/date.helper';
import { AppConfig } from 'src/app/app-config/app-config';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { formatDate } from '@angular/common';
import { MainService } from 'src/app/services/main-service';
import { FirstByRegion } from 'src/app/models/request/first-by-region.model';
import { FirstResponse } from 'src/app/models/statisctics/first-response.model';



@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  @Input() voivodeships: Voivodeship[] = [];
  @Input() cities: City[] = [];

  @Output() cityIdEmitter = new EventEmitter<number | null>();
  @Output() voivodeshipIdEmitter = new EventEmitter<number | null>();
  @Output() periodEmitter = new EventEmitter<PeriodType | null>();
  @Output() startDateEmitter = new EventEmitter<string | null>();
  @Output() endDateEmitter = new EventEmitter<string | null>();

  PeriodType = PeriodType;
  selectedPeriod: PeriodType = PeriodType.ByYear;
  selectedVoivodeship: number | null = null;
  selectedCity: number | null = null;
  selectedStartDate: string | null = null;
  selectedEndDate: string | null = null;
  minDate: Date;
  maxDate: Date;
  format = 'yyyy';
  tempMinDate: string;

  private readonly possibleFormats = ['yyyy', 'MM.yyyy','dd.MM.yyyy']

  constructor(private datepicker: DateAdapter<any>,
     private appConfig: AppConfig,
     private mainService: MainService) { }

  ngOnInit(): void {
    this.datepicker.setLocale('pl');
    this.setMinAndMaxDate();
    
  }

  selectVoivodeship(id: number): void {
    this.selectedVoivodeship = id;
    this.selectedCity = null;
    this.setMinAndMaxDate();
    this.voivodeshipIdEmitter.emit(id);
  }

  selectCity(id: number): void {
    this.selectedCity = id;
    this.setMinAndMaxDate();
    this.cityIdEmitter.emit(id);
  }

  selectPeriod(value: PeriodType): void {
    this.selectedPeriod = value;
    this.format = this.possibleFormats[value];
    this.setMinAndMaxDate();
    this.periodEmitter.emit(value);
  }

  getStartDate(event: any): void {
    const startDate: Date = event.value; 
    this.setStartDate(startDate);
  }

  getEndDate(event: any): void {
    const endDate: Date = event.value;
    this.setEndDate(endDate);
  }

  getMinYear(date: Date, picker: MatDatepicker<Moment>): void {
    if (this.selectedPeriod === PeriodType.ByYear){
      this.setStartDate(date);
      picker.close();
    }
  }
  
  getMaxYear(date: Date, picker: MatDatepicker<Moment>): void {
    if (this.selectedPeriod === PeriodType.ByYear){
      this.setEndDate(date);
      picker.close();
    }
  }

  getMinMonth(date: Date, picker: MatDatepicker<Moment>): void {
    if (this.selectedPeriod === PeriodType.ByMonth){
      this.setStartDate(date);
      picker.close();
    }
  }

  getMaxMonth(date: Date, picker: MatDatepicker<Moment>): void {
    if (this.selectedPeriod === PeriodType.ByMonth){
      this.setEndDate(date);
      picker.close();
    }
  }
  
  openPicker(dt: MatDatepicker<Moment>): void {
    dt.open();
  }

  setStartTypedDate(event): void{
    let date: Date;
    let value = event.currentTarget.value;
    date = new Date(formatDate(event.target.value, this.possibleFormats[this.selectedPeriod], 'en-US'));
    this.setStartDate(date);
  }

  setEndTypedDate(event): void{
    let date: Date;
    let value = event.currentTarget.value;
    date = new Date(formatDate(event.target.value, this.possibleFormats[this.selectedPeriod], 'en-US'));
    this.setEndDate(date);
  }

  private setStartDate(date: Date) : void {
    const formattedDate = DateHelper.dateFormat(date);
    this.selectedStartDate = formattedDate;
    this.startDateEmitter.emit(formattedDate);
  }

  private setEndDate(date: Date): void {
    const formattedDate = DateHelper.dateFormat(date);
    this.selectedEndDate = formattedDate;
    this.endDateEmitter.emit(formattedDate);
  }

  private setMinAndMaxDate(): void {
    if ((this.selectedVoivodeship != null || this.selectedCity != null) && this.selectedPeriod === PeriodType.ByYear) {
      this.getFirstApostasyByRegion();
    }else{
      this.setFirstApostasyFromConfig();
    }
  }

  private setFirstApostasyFromConfig(): void {
    this.tempMinDate = this.selectedPeriod === PeriodType.ByYear ? this.appConfig.config.firstApostasy : this.appConfig.config.startDate;
    this.parseDate();
  }

  private getFirstApostasyByRegion(): void {
    const request: FirstByRegion = {
      voivodeshipId: this.selectedVoivodeship,
      cityId: this.selectedCity
    }
    this.mainService.getFirstApostasyByRegion(request).subscribe((res: FirstResponse) => {
      this.tempMinDate = res.date;
      this.parseDate();
    });
  }

  private parseDate(): void {
    if (this.tempMinDate.length < 5) {
      this.tempMinDate = `${this.tempMinDate}-01-01`;
    }
    this.minDate = new Date(this.tempMinDate);
    const maxDate = new Date();
    this.maxDate = maxDate;
    this.selectedStartDate = this.tempMinDate;
    this.selectedEndDate = DateHelper.dateFormat(maxDate);
    this.startDateEmitter.emit(this.tempMinDate);
  }

}
