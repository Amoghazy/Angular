import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { topedgit } from './Datatop';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-top-widgets',
  standalone: true,
  imports: [NzIconModule, NgChartsModule],
  templateUrl: './top-widgets.component.html',
  styleUrl: './top-widgets.component.scss',
})
export class TopWidgetsComponent {
  topedgit = topedgit;
  labels: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  data = [
    {
      label: '',
      data: [30, 20, 37, 50, 33, 55, 35, 40, 25],
      borderColor: '#36A2EB',
      backgroundColor: '#9BD0F5',
      // borderWidth: 1,

      tension: 0.4,
      fill: true,
      pointRadius: 0,
      pointHitRadius: 10,
      pointHoverRadius: 0,
    },
  ];
  chartOptions = {
    maintainAspectRatio: false,
    
    interaction: {
      mode: 'index' as const,
      axis: 'y' as const,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
        },
        ticks: {
          display: true,
        },
      },
      y: {
        grid: {
          display: true,
        },
        ticks: {
          display:true,
        },
        border: {
          display: true,
        },
      },
    },
  };
}
