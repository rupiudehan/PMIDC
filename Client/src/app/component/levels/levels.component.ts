import { Component } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { LevelModel } from './level.model';
import { LevelService } from './level.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss']
})
export class LevelsComponent {
  onAlphabetInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
  }


LevelDetails: any[] = [];
lastUsedId: number = 0; 
LevelName: any;
currentLevelId: number | null = null;
formValue !: FormGroup;
levelModelObj   : LevelModel = new LevelModel();
refreshPage: any;
router: any;
row: any;
isUpdate: boolean = false;
level: any;

constructor (private FormBuilder: FormBuilder,
  private api :LevelService,
  private toastr: ToastrService) { }

ngOnInit(): void {
    this.getLevelDetails();
    this.formValue = this.FormBuilder.group({
      id:[0],
      LevelName : ['', [Validators.required, Validators.maxLength(150)]],
    })    

  }
  
  postLevelDetails(){
    debugger
    const levelName = this.formValue.value.LevelName.trim(); // Trim spaces


    // Check for duplicate country names
    const duplicate = this.LevelDetails?.some(l => l.levelName?.toLowerCase() === levelName.toLowerCase());

    if (duplicate) {
      this.toastr.error("Level already exists");
      this.formValue.reset();
      this.currentLevelId = 0;
    this.formValue.value.id=0;
    this.formValue.value.LevelName="";
      return;
    }

    
    

    this.levelModelObj.id = ++this.lastUsedId;
    this.levelModelObj.LevelName = this.formValue.value.LevelName.trim();
    const level = this.levelModelObj.LevelName ;

    if( level == "" || level == '0')
      {
           this.toastr.warning("Please Enter a Level");
      }

    else{this.api.postLevel(this.levelModelObj)
    .subscribe((res: any)=>{
      console.log(res);
      if(this.levelModelObj.LevelName.length==0 || this.levelModelObj.LevelName.trim()=== ''){
        this.toastr.warning("Level Cannot be null")
      }
      else{
        this.toastr.success("Level Added Successfully")
      this.getLevelDetails();
      this.formValue.reset();
      this.currentLevelId = 0;
    this.formValue.value.id=0;
    this.formValue.value.LevelName="";
    }
    },
    (error: any)=>{
      this.toastr.error("something went wrong")
    })}
  }

onSubmit(obj :any){
  debugger
  const id = this.formValue.value.id;
  if(id==0|| id==null) 
    {
      this.postLevelDetails();
    }
    else{
      // this.editLevel(this.currentLevelId);
      this.updateLevel(obj);
      const levelName = this.formValue.value.LevelName?.trim();

  if (!levelName) {
      // this.toastr.error("Please enter a level name");
      return;
  }
      this.toastr.success("Level Updated Successfully");
      this.getLevelDetails();
      this.resetForm();
      obj.id=0;
      
    }
    // this.formValue.reset();
}
  cancel() {
    const levelNameInput = document.getElementById('levelName') as HTMLInputElement;
    levelNameInput.value = '';
    this.router.navigate(['/dashboard']); // Redirect to '/dashboard' route
  }
  resetForm() {
    this.formValue.reset();
    this.currentLevelId = 0;
    this.formValue.value.id=0;
    this.formValue.value.LevelName="";
  }

  getLevelDetails() {
    this.api.getLevel()
      .subscribe((res: any) => { 
        const maxId = Math.max(...res.map((item: any) => item.id));
        // Update lastUsedId to ensure generated IDs are unique
        this.lastUsedId = maxId > 0 ? maxId : 0;
        this.LevelDetails = res;
        console.log(this.LevelDetails)
      });
  }

  deleteLevel(id: number) {
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
            this.api.deleteLevel(id)
                .subscribe(
                    (res: any) => {
                        this.toastr.success("Level Deleted Successfully");
                        this.LevelDetails = this.LevelDetails.filter((level: any) => level.id !== id);
                    },
                    (error: any) => {
                        if (error.status === 400 && error.error && error.error.error === 'Cannot delete level. It is associated with other details.') {
                            this.toastr.error("Cannot delete level. It is associated with other details.");
                        } else {
                            this.toastr.error("Cannot delete this level. It is associated with other details.");
                        }
                    }
                );
        }
    });
}


updateLevel(obj: any) {
  debugger;
  const levelName = this.formValue.value.LevelName?.trim();

  if (!levelName) {
      this.toastr.error("Please enter a level name");
      return;
  }

  // Check for duplicate level names, excluding the current level being edited
  const duplicate = this.LevelDetails?.some(l => l.levelName?.toLowerCase() === levelName.toLowerCase() && l.id !== this.currentLevelId);

  if (duplicate) {
      this.toastr.error("Level already exists");
      return;
  }

  if (this.currentLevelId !== null) {
      this.levelModelObj.LevelName = levelName; // Use trimmed value
      this.levelModelObj.id = this.currentLevelId;

      this.api.updateLevel(this.levelModelObj)
          .subscribe((res: any) => {
              console.log(res);
              // this.toastr.success("Level Updated Successfully");
              this.formValue.reset();
              this.getLevelDetails();
              this.isUpdate=false;
          },
          (error: any) => {
              this.toastr.error("Something went wrong");
          });
  } else {
      this.toastr.error("Invalid Level ID");
  }
}


  editLevel(id: any){
    // debugger;
    // Call the API to get the details of the state with the provided ID
    this.api.getDetailLevel(id).subscribe(
      (level: any) => {
        console.log("Level", level);
  
        // Populate the form with the retrieved state data
        this.formValue.patchValue({
          LevelName: level[0].levelName,
          id: level[0].id
        });
        this.isUpdate=true;
        this.currentLevelId = id;
       
        // Update the stateModelObj with the correct state name
        this.levelModelObj.LevelName = level;
        // this.currentCountryId = id;
      },
      (error: any) => {
        console.error("Error fetching level details:", error);
      }
    );
  }

  fetchLevelById(id: number) {
    debugger;
    this.api.getDetailLevel(id).subscribe(
      (level: any) => {
        console.log("Fetched Level", level);

        this.formValue.patchValue({
          LevelName: level[0].LevelName
        });
        // Handle the fetched country details here
      },
      (error: any) => {
        console.error("Error fetching Level by ID:", error);
      }
    );
  }
}

function onAlphabetInputChange(event: Event | undefined, Event: { new(type: string, eventInitDict?: EventInit): Event; prototype: Event; readonly NONE: 0; readonly CAPTURING_PHASE: 1; readonly AT_TARGET: 2; readonly BUBBLING_PHASE: 3; }) {
  throw new Error('Function not implemented.');
}
