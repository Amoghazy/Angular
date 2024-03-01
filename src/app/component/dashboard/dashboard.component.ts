import { Component } from '@angular/core';
import { TopWidgetsComponent } from './top-widgets/top-widgets.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TopWidgetsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
