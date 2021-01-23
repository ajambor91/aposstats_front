import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Statistics } from 'src/app/models/statisctics/statistic.model';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent{

  @Input() stats: Statistics[];
  multi: any[];
  view: number[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  test(): void {
    const dupa = JSON.parse(JSON.stringify([this.stats]))
    const stats =  [
      {
        "name": "Germany",
        "series": [
          {
            "name": "1990",
            "value": 62000000
          },
          {
            "name": "2010",
            "value": 73000000
          },
          {
            "name": "2011",
            "value": 89400000
          }
        ]
      },
    ];

    console.log('dupa',dupa);
    console.log('stats',[stats]);
  }

}
