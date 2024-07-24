import { Component } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
onSubmit() {
throw new Error('Method not implemented.');
}
  router: any;
  AddUserForm: any;

  cancel() {
    this.AddUserForm.reset();
    this.router.navigate(['./add-user']);
  }

}
