import { Component, OnInit } from '@angular/core';
import { AppConfig } from './app-config/app-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'AposStats - analiza apostazji';
  startDate: string;
  constructor(private appConfig: AppConfig){}

  ngOnInit(): void {
    this.startDate = this.appConfig.config.startDate;
  }
  
}
