import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolesService } from '../roles/roles.service';
import { LevelService } from '../levels/level.service';
import { UsersService } from './users.service';
import { userModel } from './users.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  onAlphabetInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
  }
  passwordVisible: boolean = false;
  RoleDetails: any[] = [];
  LevelDetails: any[] = [];
  UserDetails: any[] = [];
  lastUsedId: number = 0;
  currentUserId: number | null = null;
  formValue!: FormGroup;
  userModelObj: userModel = new userModel();
  api: any;
  isUpdate: boolean = false;
  detailsData: any[]=[];

  constructor(
    private formBuilder: FormBuilder, 
    private roleService: RolesService,
    private levelService: LevelService,
    private userService: UsersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    
    this.getRoleDetails();
    this.getLevelDetails();
    this.getUserDetails();
    this.formValue = this.formBuilder.group({
      roleId: [0],
      levelId: [0],
      agencyName: ['', [Validators.required, Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')]],
      password: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
    });
    
    console.log('RoleDetails:', this.RoleDetails); // Add this line to debug
    console.log('LevelDetails:', this.LevelDetails);
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  getRoleDetails() {
    this.roleService.getRole().subscribe((res: any) => {
      console.log('Role API Response:', res); // Add this line to debug
      this.RoleDetails = res;
    });
  }
  getLevelDetails() {
    this.levelService.getLevel().subscribe((res: any) => {
      console.log('Level API Response:', res); // Add this line to debug
      this.LevelDetails = res;
    });
  }

  getUserDetails() {
    this.userService.getUser().subscribe((res: any) => {
      const maxId = Math.max(...res.map((item: any) => item.id));
      this.lastUsedId = maxId > 0 ? maxId : 0;
      this.UserDetails = res;
    });
  }

  postUserDetails() {
    debugger;
    const agencyName = this.formValue.value.agencyName!=null?this.formValue.value.agencyName.trim():'';
    const email = this.formValue.value.email.trim();
    const password = this.formValue.value.password;
    const roleId = this.formValue.value.roleId;
    const levelId = this.formValue.value.levelId;

    // Check if any input is null or empty
    if (!agencyName || !email || !password || !roleId || !levelId) {
        this.toastr.error("Please enter all the details");
        return;
    }

    const duplicate = this.UserDetails?.some(u => 
        u.agencyName?.toLowerCase() == agencyName.toLowerCase() ||
        u.roleId == roleId && 
        u.levelId == levelId &&
        u.email?.toLowerCase() === email.toLowerCase()
    );

    if (duplicate) {
        this.toastr.warning("User already exists.");
        return;
    }

    this.userModelObj.agencyName = agencyName;
    this.userModelObj.email = email;
    this.userModelObj.password = password;
    this.userModelObj.roleId = roleId;
    this.userModelObj.levelId = levelId;

    if (this.currentUserId == null || this.currentUserId == 0) {
        this.userModelObj.id = ++this.lastUsedId;
        this.userService.postUser(this.userModelObj)
            .subscribe((res:any) => {
                console.log(res);
                this.toastr.success("User Added Successfully");
                this.getUserDetails();
                this.resetForm();
            },
            (error:any) => {
                this.toastr.error("Something went wrong");
            });
    } else {
        this.updateUser();
    }
}

updateUser() {
  debugger;
  const agencyName = this.formValue.value.agencyName?.trim(); 
  const email = this.formValue.value.email?.trim(); 
  const password = this.formValue.value.password?.trim(); 
  const roleId = this.formValue.value.roleId;
  const levelId = this.formValue.value.levelId;

  // Check if any mandatory field is empty
  if (!agencyName || !email || !password || !roleId || !levelId) {
      this.toastr.error("Please enter all mandatory fields");
      return;
  }

  // Check for duplicate user information, excluding the current user being edited
  const duplicate = this.UserDetails?.some(u => 
      u.agencyName?.toLowerCase() === agencyName.toLowerCase() &&
      u.roleId === roleId && 
      u.levelId === levelId && 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.id != this.currentUserId
  );

  if (duplicate) {
      this.toastr.error("User with the same details already exists");
      return;
  }

  if (this.currentUserId !== null) {
      this.userModelObj.agencyName = agencyName; 
      this.userModelObj.email = email; 
      this.userModelObj.password = password; 
      this.userModelObj.roleId = roleId; 
      this.userModelObj.levelId = levelId; 
      this.userModelObj.id = this.currentUserId;

      this.userService.updateUser(this.userModelObj)
          .subscribe((res: any) => {
              console.log(res);
              // this.toastr.success("User Updated Successfully");
              this.getUserDetails();
              this.resetForm();
              this.isUpdate=false;
          },
          (error: any) => {
              this.toastr.error("Something went wrong");
          });
  } else {
      this.toastr.error("Invalid User ID");
  }
}


editUser(id: number | null) {
  debugger;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (id === null) {
    console.error("Invalid user ID");
    return;
  }

  console.log("Editing user with ID:", id); 
  this.userService.getDetailUser(id).subscribe(
    (user: any) => {
      if (user && user.length > 0) {
        console.log("User", user);
        this.formValue.patchValue({
          agencyName: user[0].agencyName,
          email: user[0].email,
          password: user[0].password,
          roleId: user[0].roleId,
          levelId: user[0].levelId,
          id: user[0].id
        });
        this.isUpdate = true;
        this.currentUserId = id;
        
      } else {
        console.error("User not found for ID:", id); 
        this.toastr.error("User not found");
      }
    },
    (error: any) => {
      console.error("Error fetching User details:", error);
    }
  );
}

  
    
  resetForm() {
    debugger;
    this.formValue.reset();
    this.currentUserId = 0;
    this.formValue.value.agencyName= '';
    this.formValue.get('email')?.enable();
    this.formValue.value.email= '';
    this.formValue.value.id=0;
}

onEditClick() {
        
  }


  cancel() {
    this.formValue.reset();
    this.currentUserId = null;
    this.formValue.value.id=0;
    this.formValue.value.agencyName="";
    this.isUpdate=false;
    
  }
  onSubmit(obj :any){
    debugger

    if (this.email?.invalid) {
      this.toastr.error("Email is invalid");
      return;
    }
  

    const id = this.currentUserId;
    if(id==0|| id==null) 
      {
        this.postUserDetails();
      }
      else{
        //this.editCountry(this.currentCountryId);
        this.updateUser();
        this.toastr.success("User Details Updated Successfully");
        this.getUserDetails();
        this.resetForm();
        obj.id=0;
        
      }
  }  

  deleteUser(id: number) {
    this.userService.deleteUser(id)
      .subscribe((res:any) => {
        this.toastr.success("User Deleted Successfully");
        this.UserDetails = this.UserDetails.filter((user: any) => user.id !== id);
      });
  }

  get email(){
    return this.formValue.get('email');
  }

  editing(id: number) {
    this.editUser(id);
  }

  fetchUserById(id: number) {
    debugger;
    this.api.getDetailUser(id).subscribe(
      (user: any) => {
        console.log("Fetched User", user);

        this.formValue.patchValue({
          roleId: user[0].roleId,
          levelId: user[0].levelId,
          AgencyName : user[0].AgencyName
        });
        // Handle the fetched country details here
      },
      (error: any) => {
        console.error("Error fetching user by ID:", error);
      }
    );
  }
}
