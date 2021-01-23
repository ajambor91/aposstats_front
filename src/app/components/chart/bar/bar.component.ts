import { Output } from '@angular/core';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { PeriodType } from 'src/app/enums/period-type.enum';
import { City } from 'src/app/models/administration-units/city.model';
import { Voivodeship } from 'src/app/models/administration-units/voivodeship.model';
import {DateHelper} from 'src/app/helpers/date.helper';

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
  constructor(private datepicker: DateAdapter<any>) { }

  ngOnInit(): void {
    this.datepicker.setLocale('pl');
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
    this.periodEmitter.emit(value);
  }

  setStartDate(event: any): void {
    const startDate: Date = event.value; 
    const formattedDate = DateHelper.dateFormat(startDate);
    this.selectedStartDate = formattedDate;
    this.startDateEmitter.emit(formattedDate);
  }

  setEndDate(event: any): void {
    const endDate: Date = event.value;
    const formattedDate = DateHelper.dateFormat(endDate);
    this.selectedEndDate = formattedDate;
    this.endDateEmitter.emit(formattedDate);
  }

}
