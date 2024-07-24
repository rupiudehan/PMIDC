import { Component } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { LevelModel } from './level.model';
import { LevelService } from './level.service';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss']
})
export class LevelsComponent {


LevelDetails: any[] = [];
lastUsedId: number = 0; 
LevelName: any;
currentLevelId: number | null = null;
formValue !: FormGroup;
levelModelObj   : LevelModel = new LevelModel();
refreshPage: any;
router: any;
row: any;

level: any;

constructor (private FormBuilder: FormBuilder,
  private api :LevelService) { }

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
      alert("Level already exists");
      return;
    }
    

    this.levelModelObj.id = ++this.lastUsedId;
    this.levelModelObj.LevelName = this.formValue.value.LevelName.trim();
    const level = this.levelModelObj.LevelName ;

    if( level == "" || level == '0')
      {
           alert("Please Enter a Level");
      }

    else{this.api.postLevel(this.levelModelObj)
    .subscribe((res: any)=>{
      console.log(res);
      if(this.levelModelObj.LevelName.length==0 || this.levelModelObj.LevelName.trim()=== ''){
        alert("Level Cannot be null")
      }
      else{
      alert("Level Added Successfully")
      this.getLevelDetails()
      this.formValue.reset()
    }
    },
    (error: any)=>{
      alert("something went wrong")
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
      alert("Level Updated Successfully");
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
    this.api.deleteLevel(id)
      .subscribe((res: any) => { 
        alert("Level Deleted Successfully");
        this.LevelDetails = this.LevelDetails.filter((level: any) => level.id !== id);
        
      });
  }

  updateLevel(obj:any) {
    debugger;
    const levelName = this.formValue.value.LevelName.trim(); // Trim spaces
  
    // Check for duplicate country names, excluding the current country being edited
    const duplicate = this.LevelDetails?.some(l => l.levelName?.toLowerCase() === levelName.toLowerCase());

  
    if (duplicate) {
      alert("Level already exists");
      return;
    }
  
    if (this.currentLevelId !== null) {
      this.levelModelObj.LevelName = levelName; // Use trimmed value
      this.levelModelObj.id = this.currentLevelId;
  
      this.api.updateLevel(obj)
        .subscribe((res: any) => {
          // console.log(res);
          this.formValue.value.id=0;
        
        },
        (error: any) => {
          alert("Something went wrong");
        });
    } else {
      alert("Invalid Level ID");
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