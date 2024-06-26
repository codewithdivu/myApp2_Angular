import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../Components/Common/navbar/navbar.component';
import { SpinnerLoadingComponent } from '../../Components/Common/spinner-loading/spinner-loading.component';
import { FooterComponent } from '../../Components/Common/footer/footer.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent,FooterComponent ],
  templateUrl: './dashboard-layout.component.html',
  styles: ``,
})
export class DashboardLayoutComponent {}
