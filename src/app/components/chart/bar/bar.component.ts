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

  private readonly possibleFormats = ['yyyy', 'MM.yyyy','dd.MM.yyyy']
  constructor(private datepicker: DateAdapter<any>, private appConfig: AppConfig) { }

  ngOnInit(): void {
    this.datepicker.setLocale('pl');
    this.setMinAndMaxDate();
    
  }

  selectVoivodeship(id: number): void {
    this.selectedVoivodeship = id;
    this.voivodeshipIdEmitter.emit(id);
  }

  selectCity(id: number): void {
    this.selectedCity = id;
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
    const minDate = this.selectedPeriod === PeriodType.ByYear ? this.appConfig.config.firstApostasy : this.appConfig.config.startDate;
    this.minDate = new Date(minDate);
    const maxDate = new Date();
    this.maxDate = maxDate;
  }

}
