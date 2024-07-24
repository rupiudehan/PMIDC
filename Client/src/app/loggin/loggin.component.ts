import { Component, TrackByFunction } from '@angular/core';


@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.scss']
})
export class LogginComponent {
    SignInOptions: any;
  trackByFn!: TrackByFunction<any>;

}
