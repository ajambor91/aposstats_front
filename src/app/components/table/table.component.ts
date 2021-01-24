import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Statistics } from 'src/app/models/statisctics/statistic.model';
import { TableData } from 'src/app/models/statisctics/table-data.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() set dataTable(data: TableData[]) {
    this.getApi(data);
  }

  dataSource: MatTableDataSource<TableData[]>;
  displayedColumns: string[] = ['name','value'];

  constructor() { }

  getApi(data){
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = data;
  }

}
