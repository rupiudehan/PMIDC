import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit{

  chartSeries: ApexNonAxisChartSeries = [];
  chartLabels = ["Funds Available", "Assigned Funds"];
  chartDetails: ApexChart = {
    type: 'pie',
    toolbar: {
      show: false
    }
  };


  chartTitle: ApexTitleSubtitle = {
    text: 'Funds Status',
    align: 'center'
  };

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    this.http.get<any>('http://localhost:3000/api/piechart').subscribe(data => {
      // Debugging to check data received
      console.log('API Data:', data);

      // Update the chart series and labels
      this.chartSeries = data.map((item: any) => Number(item.title));
      //this.chartLabels = data.labels;

      // Manually trigger change detection to ensure the view updates
      this.cdr.detectChanges();

      // Debugging to confirm data binding
      console.log('Chart Series:', this.chartSeries);
      console.log('Chart Labels:', this.chartLabels);
    });
  }
}
