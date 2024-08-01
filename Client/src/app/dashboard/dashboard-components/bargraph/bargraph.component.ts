import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';

@Component({
  selector: 'app-bargraph',
  templateUrl: './bargraph.component.html',
  styleUrls: ['./bargraph.component.scss']
})
export class BargraphComponent {
  public chartOptions: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchChartData();
  }

  fetchChartData(): void {
    this.http.get<any[]>('http://localhost:3000/api/bargraph').subscribe(data => {
      // Transform the API data
      const categories = data.map(item => item.agencyName);
      const seriesData = data.map(item => parseInt(item.sum, 10));

      // Update chart options
      this.chartOptions = {
        series: [{
          name: 'Sum',
          data: seriesData
        }],
        chart: {
          type: 'bar'
        },
        xaxis: {
          categories: categories
        },
        plotOptions: {
          bar: {
            horizontal: false,
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: 'Agency Sales',
          align: 'center'
        }
      };
    });
  }
}
