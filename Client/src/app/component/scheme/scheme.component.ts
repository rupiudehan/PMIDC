import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchemeService } from './scheme.service';
import { SchemeModel } from './scheme.model';


@Component({
  selector: 'app-scheme',
  templateUrl: './scheme.component.html',
  styleUrls: ['./scheme.component.scss']
})
export class SchemeComponent {

  SchemeDetails: any[] = [];
  lastUsedId: number = 0; 
  SchemeName: any;
  currentSchemeId: number | null = null;
  formValue !: FormGroup;
  schemeModelObj   : SchemeModel = new SchemeModel();
  stateForm: any;
  state: any;
  refreshPage: any;
  stateService: any;
  router: any;
  row: any;
  level: any;


  constructor (private FormBuilder: FormBuilder,
    private api :SchemeService) { }

  ngOnInit(): void {
    this.getSchemeDetails();
    this.formValue = this.FormBuilder.group({
      id:[0],
      SchemeName : ['', [Validators.required, Validators.maxLength(150)]],
    })    

  }
  
  postSchemeDetails(){
    debugger
    const schemeName = this.formValue.value.SchemeName.trim(); 


    const duplicate = this.SchemeDetails?.some(c => c.schemeName?.toLowerCase() === schemeName.toLowerCase());

    if (duplicate) {
      alert("Scheme already exists");
      return;
    }
    

    this.schemeModelObj.id = ++this.lastUsedId;
    this.schemeModelObj.SchemeName = this.formValue.value.SchemeName.trim();
    const scheme = this.schemeModelObj.SchemeName ;

    if( scheme == "" || scheme == '0')
      {
           alert("Please Enter a scheme");
      }

    else{this.api.postScheme(this.schemeModelObj)
    .subscribe(res=>{
      console.log(res);
      if(this.schemeModelObj.SchemeName.length==0 || this.schemeModelObj.SchemeName.trim()=== ''){
        alert("Scheme Cannot be null")
      }
      else{
      alert("Scheme Added Successfully")
      this.getSchemeDetails()
      this.formValue.reset()
    }
    },
    err=>{
      alert("something went wrong")
    })}
  }

onSubmit(obj :any){
  debugger
  const id = this.formValue.value.id;
  if(id==0|| id==null) 
    {
      this.postSchemeDetails();
    }
    else{
      //this.editCountry(this.currentCountryId);
      this.updateScheme(obj);
      alert("Scheme Updated Successfully");
      this.getSchemeDetails();
      this.resetForm();
      obj.id=0;
      
    }
    // this.formValue.reset();
}
  cancel() {
    const schemeNameInput = document.getElementById('schemeName') as HTMLInputElement;
    schemeNameInput.value = '';
    this.router.navigate(['/dashboard']); // Redirect to '/dashboard' route
  }
  resetForm() {
    this.formValue.reset();
    this.currentSchemeId = 0;
    this.formValue.value.id=0;
    this.formValue.value.SchemeName="";
  }

  getSchemeDetails() {
    this.api.getScheme()
      .subscribe((res: any) => { 
        const maxId = Math.max(...res.map((item: any) => item.id));
        // Update lastUsedId to ensure generated IDs are unique
        this.lastUsedId = maxId > 0 ? maxId : 0;
        this.SchemeDetails = res;
        console.log(this.SchemeDetails)
      });
  }

  deleteScheme(id: number) {
    this.api.deleteScheme(id)
      .subscribe((res: any) => { 
        alert("Scheme Deleted Successfully");
        this.SchemeDetails = this.SchemeDetails.filter((scheme: any) => scheme.id !== id);
        
      });
  }

  updateScheme(obj:any) {
    debugger;
    const schemeName = this.formValue.value.SchemeName.trim(); // Trim spaces
  
    // Check for duplicate country names, excluding the current country being edited
    const duplicate = this.SchemeDetails?.some(c => c.schemeName?.toLowerCase() === schemeName.toLowerCase());
  
    if (duplicate) {
      alert("Scheme already exists");
      return;
    }
  
    if (this.currentSchemeId !== null) {
      this.schemeModelObj.SchemeName = schemeName; // Use trimmed value
      this.schemeModelObj.id = this.currentSchemeId;
  
      this.api.updateScheme(obj)
        .subscribe(res => {
          //console.log(res);
          this.formValue.value.id=0;
        
        },
        err => {
          alert("Something went wrong");
        });
    } else {
      alert("Invalid Scheme ID");
    }
  }

  editScheme(id: any){
    // debugger;
    // Call the API to get the details of the state with the provided ID
    this.api.getDetailScheme(id).subscribe(
      (scheme: any) => {
        console.log("Scheme", scheme);
  
        // Populate the form with the retrieved state data
        this.formValue.patchValue({
          SchemeName: scheme[0].schemeName,
          id: scheme[0].id
        });
        
        this.currentSchemeId = id;
       
        // Update the stateModelObj with the correct state name
        this.schemeModelObj.SchemeName = scheme;
        // this.currentCountryId = id;
      },
      (error: any) => {
        console.error("Error fetching scheme details:", error);
      }
    );
  }

  fetchSchemeById(id: number) {
    debugger;
    this.api.getDetailScheme(id).subscribe(
      (scheme: any) => {
        console.log("Fetched Scheme", scheme);

        this.formValue.patchValue({
          SchemeName: scheme[0].SchemeName
        });
        // Handle the fetched country details here
      },
      (error: any) => {
        console.error("Error fetching scheme by ID:", error);
      }
    );
  }
}
