import { Component } from '@angular/core';
import { RolesService } from './roles.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RoleModel } from './roles.model';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent {

  RoleDetails: any[] = [];
  lastUsedId: number = 0; // Variable to store the last used ID
  RoleName: any;
  currentRoleId: number | null = null;
  formVal !: FormGroup;
  RoleModelObj   : RoleModel = new RoleModel();
  refreshPage: any;
  
  router: any;
  row: any;

  constructor (private FormBuilder: FormBuilder,
    private api :RolesService) { }
   
  ngOnInit(): void {
    this.getRoleDetails();
    this.formVal = this.FormBuilder.group({
      id:[0],
      RoleName : ['', [Validators.required, Validators.maxLength(150)]],
    })    

  }
  
  postRoleDetails(){
    debugger
    const roleName = this.formVal.value.RoleName.trim(); 


    const duplicate = this.RoleDetails?.some(r => r.roleName?.toLowerCase() === roleName.toLowerCase());

    if (duplicate) {
      alert("Role already exists");
      return;
    }
    

    this.RoleModelObj.id = ++this.lastUsedId;
    this.RoleModelObj.RoleName = this.formVal.value.RoleName.trim();
    const role = this.RoleModelObj.RoleName ;

    if( role == "" || role == '0')
      {
           alert("Please Enter a Role");
      }

    else {this.api.postRole(this.RoleModelObj)
    .subscribe(res=>{
      console.log(res);
      if(this.RoleModelObj.RoleName.length==0 || this.RoleModelObj.RoleName.trim()=== ''){
        alert("Role Cannot be null")
      }
      else{
      alert("Role Added Successfully")
      this.getRoleDetails()
      this.formVal.reset()
    }
    },
    (error: any)=>{
      alert("something went wrong")
    })}
  }

onSubmit(obj :any){
  debugger
  const id = this.formVal.value.id;
  if(id==0|| id==null) 
    {
      this.postRoleDetails();
    }
    else{
      
      this.updateRole(obj);
      alert("Role Updated Successfully");
      this.getRoleDetails();
      this.resetForm();
      obj.id=0;
      
    }
    // this.formValue.reset();
}
  cancel() {
    const roleNameInput = document.getElementById('roleName') as HTMLInputElement;
    roleNameInput.value = '';
    this.router.navigate(['/dashboard']); // Redirect to '/dashboard' route
  }
  resetForm() {
    this.formVal.reset();
    this.currentRoleId = 0;
    this.formVal.value.id=0;
    this.formVal.value.RoleName="";
  }

  getRoleDetails() {
    this.api.getRole()
      .subscribe((res: any) => { 
        const maxId = Math.max(...res.map((item: any) => item.id));
        // Update lastUsedId to ensure generated IDs are unique
        this.lastUsedId = maxId > 0 ? maxId : 0;
        this.RoleDetails = res;
        console.log(this.RoleDetails)
      });
  }

  deleteRole(id: number) {
    this.api.deleteRole(id)
      .subscribe((res: any) => { 
        alert("Role Deleted Successfully");
        this.RoleDetails = this.RoleDetails.filter((role: any) => role.id !== id);
        
      });
  }

  updateRole(obj:any) {
    debugger;
    const roleName = this.formVal.value.RoleName.trim();
  
    
    const duplicate = this.RoleDetails?.some(r => r.roleName?.toLowerCase() === roleName.toLowerCase());
  
    if (duplicate) {
      alert("Role already exists");
      return;
    }
  
    if (this.currentRoleId !== null) {
      this.RoleModelObj.RoleName = roleName; 
      this.RoleModelObj.id = this.currentRoleId;
  
      this.api.updateRole(obj)
        .subscribe((res: any) => {
          //console.log(res);
          this.formVal.value.id=0;
        
        },
        err => {
          alert("Something went wrong");
        });
    } else {
      alert("Invalid Role ID");
    }
  }

  editRole(id: any){
    // debugger;
    // Call the API to get the details of the state with the provided ID
    this.api.getDetailRole(id).subscribe(
      (role: any) => {
        console.log("Role", role);
  
        // Populate the form with the retrieved state data
        this.formVal.patchValue({
          RoleName: role[0].roleName,
          id: role[0].id
        });
        
        this.currentRoleId = id;
       
        // Update the stateModelObj with the correct state name
        this.RoleModelObj.RoleName = role;
        // this.currentCountryId = id;
      },
      (error: any) => {
        console.error("Error fetching role details:", error);
      }
    );
  }

  fetchRoleById(id: number) {
    debugger;
    this.api.getDetailRole(id).subscribe(
      (role: any) => {
        console.log("Fetched Role", role);

        this.formVal.patchValue({
          RoleName: role[0].RoleName
        });
        
      },
      (error: any) => {
        console.error("Error fetching Role by ID:", error);
      }
    );
  }
}