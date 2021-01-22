import { Component, OnInit } from '@angular/core';
import { Request } from './models/request/request.model';
import { MainService } from './services/main-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'aposstatsfront';

  constructor(private mainService: MainService){}

  ngOnInit(): void {
    const request: Request = {
      cityId: 1812
    };
    this.mainService.getApostasies(request).subscribe( res => {
      console.log(res);
    });
  }
  
}
