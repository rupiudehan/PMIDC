import { Component, TrackByFunction } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
SignUpOptions: any;
  trackByFn!: TrackByFunction<any>;

}
