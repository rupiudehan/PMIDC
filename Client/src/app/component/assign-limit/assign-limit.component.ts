import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { limitModel } from './assign-limit.model';
import { LevelService } from '../levels/level.service';
import { UsersService } from '../users/users.service';
import { SchemeService } from '../scheme/scheme.service';
import { AssignLimitService } from './assign-limit.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assign-limit',
  templateUrl: './assign-limit.component.html',
  styleUrls: ['./assign-limit.component.scss']
})
export class AssignLimitComponent implements OnInit {
  SchemeDetails: any[] = [];
  UserDetails: any[] = [];
  LevelDetails: any[] = [];
  LimitDetails: any[] = [];
  lastUsedId: number = 0;
  currentLimitId: number | null = null;
  formValue!: FormGroup;
  limitModelObj: limitModel = new limitModel();
  api: any;
  isUpdate: boolean = false;

  detailsData: any[]=[];

  constructor(
    private formBuilder: FormBuilder, 
    private levelService: LevelService,
    private userService: UsersService,
    private schemeService: SchemeService,
    private assignLimitService: AssignLimitService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getLevelDetails();
    this.getUserDetails();
    this.getSchemeDetails();
    this.getLimitDetails();
    this.formValue = this.formBuilder.group({
      schemeId: [0],
      userId: [0],
      levelId: [0],
      limit: ['', [Validators.required, Validators.maxLength(150)]],
    });
    
    console.log('SchemeDetails:', this.SchemeDetails);
    console.log('LevelDetails:', this.LevelDetails);
    console.log('UserDetails:', this.UserDetails); // Add this line to debug
  }

  getSchemeDetails() {
    this.schemeService.getScheme().subscribe((res: any) => {
      console.log('Scheme API Response:', res); // Add this line to debug
      this.SchemeDetails = res;
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
      console.log('Level API Response:', res); // Add this line to debug
      this.UserDetails = res;
    });
  }

  getLimitDetails() {
    this.assignLimitService.getLimit().subscribe((res: any) => {
      const maxId = Math.max(...res.map((item: any) => item.id));
      this.lastUsedId = maxId > 0 ? maxId : 0;
      this.LimitDetails = res;
    });
  }

  postLimits() {
    debugger;
    const limit = this.formValue.value.limit;
    const schemeId = this.formValue.value.schemeId;
    const levelId = this.formValue.value.levelId;
    const userId = this.formValue.value.userId;

    // Check if any input is null or empty
    if (!limit || !schemeId || !levelId || !userId) {
        this.toastr.error("Please enter all the details");
        return;
    }

    // const duplicate = this.LimitDetails?.some(l => 
    //     l.limit == limit && 
    //     l.levelId == levelId && 
    //     l.schemeId == schemeId && 
    //     l.userId == userId
    // );

    // if (duplicate) {
    //     alert("Limit already assigned to the user");
    //     return;
    // }

    this.limitModelObj.limit = limit;
    this.limitModelObj.levelId = levelId;
    this.limitModelObj.schemeId = schemeId;
    this.limitModelObj.userId = userId;

    if (this.currentLimitId === null || this.currentLimitId === 0) {
        this.limitModelObj.id = ++this.lastUsedId;
        this.assignLimitService.postLimits(this.limitModelObj)
            .subscribe(res => {
                console.log(res);
                this.toastr.success("Limit Added Successfully");
                this.getLimitDetails();
                this.resetForm();
            },
            err => {
                this.toastr.error("Something went wrong");
            });
    } else {
        this.updateLimit();
    }
}


updateLimit() {
  debugger;
  const limit = this.formValue.value.limit; 
  const schemeId = this.formValue.value.schemeId; 
  const levelId = this.formValue.value.levelId; 
  const userId = this.formValue.value.userId; 

  // Validate input values
  if (limit === null || limit === undefined || schemeId === null || schemeId === undefined || 
      levelId === null || levelId === undefined || userId === null || userId === undefined) {
      this.toastr.error("All fields must be filled out");
      return;
  }

  // Check for duplicate limit
  const duplicate = this.LimitDetails?.some(l => 
      l.limit === limit &&
      l.levelId === levelId &&
      l.schemeId === schemeId &&
      l.userId === userId &&
      l.id !== this.currentLimitId // Exclude the current limit being edited
  );

  if (duplicate) {
      this.toastr.error("Limit already exists for the selected Scheme, Level, and User");
      return;
  }

  if (this.currentLimitId !== null) {
      this.limitModelObj.limit = limit; 
      this.limitModelObj.schemeId = schemeId; 
      this.limitModelObj.levelId = levelId; 
      this.limitModelObj.userId = userId; 
      this.limitModelObj.id = this.currentLimitId;

      this.assignLimitService.updateLimit(this.limitModelObj)
          .subscribe(
              (res: any) => {
                  console.log(res);
                  this.toastr.success("Limit Updated Successfully");
                  this.getLimitDetails();
                  this.resetForm();
                  this.isUpdate=false;
              },
              (error: any) => {
                  this.toastr.error("Something went wrong");
              }
          );
  } else {
      this.toastr.error("Invalid Limit ID");
  }
}


  editLimit(id: number | null) {
    debugger;
    if (id === null) {
      console.error("Invalid Limit ID");
      return;
    }
  
    console.log("Editing Limit with ID:", id); 
    this.assignLimitService.getDetailLimit(id).subscribe(
      (limit: any) => {
        if (limit && limit.length > 0) {
          console.log("limit", limit);
          this.formValue.patchValue({
            limit: limit[0].limit,
            schemeId: limit[0].schemeId,
            levelId: limit[0].levelId,
            userId: limit[0].userId,
            
            id: limit[0].id
          });
          this.isUpdate=true;
          this.currentLimitId = id;
        } else {
          console.error("Limit not found for ID:", id); 
          this.toastr.error("Limit not found");
        }
      },
      (error: any) => {
        console.error("Error fetching Limit details:", error);
      }
    );
  }
  
    
  resetForm() {
    this.formValue.reset();
    this.currentLimitId = null;
  }

  cancel() {
    this.formValue.reset();
    this.currentLimitId = null;
  }
  onSubmit(obj :any){
    debugger
    const id = this.formValue.value.id;
    if(id==0|| id==null) 
      {
        this.postLimits();
      }
      else{
        //this.editCountry(this.currentCountryId);
        this.updateLimit();
        this.toastr.success("Limit Updated Successfully");
        this.getLimitDetails();
        this.resetForm();
        obj.id=0;
        
      }
  }  

  deleteLimit(id: number) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            this.assignLimitService.deleteLimit(id)
                .subscribe(
                    (res: any) => {
                        this.toastr.success("Limit Deleted Successfully");
                        this.LimitDetails = this.LimitDetails.filter((limit: any) => limit.id !== id);
                    },
                    (error: any) => {
                        this.toastr.error("Cannot delete this limit. An error occurred.");
                    }
                );
        }
    });
}


  editing(id: number) {
    this.editLimit(id);
  }

  fetchLimitById(id: number) {
    debugger;
    this.api.getDetailLimit(id).subscribe(
      (limit: any) => {
        console.log("Fetched limit", limit);

        this.formValue.patchValue({
          schemeId: limit[0].schemeId,
          levelId: limit[0].levelId,
          userId : limit[0].userID,
          limit: limit[0].limit,
          
        });
        // Handle the fetched country details here
      },
      (error: any) => {
        console.error("Error fetching Limit by ID:", error);
      }
    );
  }
}
