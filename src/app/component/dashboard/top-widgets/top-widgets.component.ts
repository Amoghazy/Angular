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
  data = {
    labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [1, 2, 3, 89, 63, 55, 35, 2, 7],
        borderColor: '#36A2EB',
        backgroundColor: '#9BD0F5',
        tension: 0.4,
      },
    ],
  };
}
