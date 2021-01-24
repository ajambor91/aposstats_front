import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/app-config/app-config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  startDate: string;
  constructor(private appConfig: AppConfig) { }

  ngOnInit(): void {
    this.startDate = this.appConfig.config.startDate;
  }

}
