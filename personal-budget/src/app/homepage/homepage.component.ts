import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements AfterViewInit {
  public dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
          '#32a852',
          '#a6a832',
          '#6d32a8',
        ],
      }
    ],
    labels: []
  };

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {

    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      for (var i = 0; i < res.budget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.budget[i].budget;
        this.dataSource.labels[i] = res.budget[i].title;
      }
      this.createChart();
    });
  }
  createChart() {
    var ctx;
    var myPieChart;
    ctx = document.getElementById('myChart');
    myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource,
    });
  }
}
