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
    // this.mainService.getConfig().subscribe( res => {
    //   console.log(res);
    // });
  }
  
}
