import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../Services/api.service';
import { ApiResponse } from '../../../Interfaces/ApiResponse';
import { Statistics } from '../../../Interfaces/Statistics';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnInit {
  statistics: Statistics = {
    osszesVasarlo: 0,
    osszesTermek: 0,
    vegosszeg: 0,
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService
      .getAll('http://localhost:3000/statistics')
      .then((data: ApiResponse<Statistics>) => {
        this.statistics = data.data;
      });
  }
}
