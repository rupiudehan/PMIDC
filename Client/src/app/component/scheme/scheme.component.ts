import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchemeService } from './scheme.service';
import { SchemeModel } from './scheme.model';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-scheme',
  templateUrl: './scheme.component.html',
  styleUrls: ['./scheme.component.scss']
})
export class SchemeComponent {
  onAlphabetInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
  }
  

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
  isUpdate: boolean = false;
  filteredSchemeDetails: any[] = [];


  constructor (private FormBuilder: FormBuilder,
    private api :SchemeService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getSchemeDetails();
    this.formValue = this.FormBuilder.group({
      id:[0],
      SchemeName : ['', [Validators.required, Validators.maxLength(150)]],
    })    

  }

  onSearch(searchValue: string) {
    if (!searchValue.trim()) {
      // If search input is empty, show all countries
      this.filteredSchemeDetails = this.SchemeDetails;
    } else {
      // Filter countries based on search input
      this.filteredSchemeDetails = this.SchemeDetails.filter(scheme =>
        scheme.SchemeName.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  }
  
  postSchemeDetails(){
    debugger
    const schemeName = this.formValue.value.SchemeName.trim(); 


    const duplicate = this.SchemeDetails?.some(c => c.schemeName?.toLowerCase() === schemeName.toLowerCase());

    if (duplicate) {
      this.toastr.error("Scheme already exists");
      this.resetForm();
      this.currentSchemeId = 0;
    this.formValue.value.id=0;
    this.formValue.value.SchemeName="";
      return;
    }
    

    this.schemeModelObj.id = ++this.lastUsedId;
    this.schemeModelObj.SchemeName = this.formValue.value.SchemeName.trim();
    const scheme = this.schemeModelObj.SchemeName ;

    if( scheme == "" || scheme == '0')
      {
        this.toastr.warning("Please Enter a scheme");
      }

    else{this.api.postScheme(this.schemeModelObj)
    .subscribe(res=>{
      console.log(res);
      if(this.schemeModelObj.SchemeName.length==0 || this.schemeModelObj.SchemeName.trim()=== ''){
        this.toastr.warning("Scheme Cannot be null")
      }
      else{
        this.toastr.success("Scheme Added Successfully")
      this.getSchemeDetails();
      this.formValue.reset();
      this.currentSchemeId = 0;
      this.formValue.value.id=0;
      this.formValue.value.SchemeName="";
    }
    },
    err=>{
      this.toastr.error("something went wrong")
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
      this.toastr.success("Scheme Updated Successfully");
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
            this.api.deleteScheme(id)
                .subscribe(
                    (res: any) => {
                        this.toastr.success("Scheme Deleted Successfully");
                        this.SchemeDetails = this.SchemeDetails.filter((scheme: any) => scheme.id !== id);
                    },
                    (error: any) => {
                        if (error.status === 400 && error.error && error.error.error === 'Cannot delete scheme. It is associated with other details.') {
                            this.toastr.error("Cannot delete scheme. It is associated with other details.");
                        } else {
                            this.toastr.error("Cannot delete this scheme. It is associated with other details.");
                        }
                    }
                );
        }
    });
}


updateScheme(obj: any) {
  debugger;
  const schemeName = this.formValue.value.SchemeName?.trim(); // Trim spaces and check for null/undefined

  if (!schemeName) {
      this.toastr.error("Scheme Name cannot be null or empty");
      return;
  }

  // Check for duplicate scheme names, excluding the current scheme being edited
  const duplicate = this.SchemeDetails?.some(c => c.schemeName?.toLowerCase() === schemeName.toLowerCase());

  if (duplicate) {
      this.toastr.error("Scheme already exists");
      return;
  }

  if (this.currentSchemeId !== null) {
      this.schemeModelObj.SchemeName = schemeName; // Use trimmed value
      this.schemeModelObj.id = this.currentSchemeId;

      this.api.updateScheme(this.schemeModelObj)
          .subscribe(
              res => {
                  this.formValue.reset(); // Reset the form
                  // this.toastr.success("Scheme updated successfully");
                  this.formValue.reset();
                  this.getSchemeDetails();
                  this.isUpdate=false;
              },
              err => {
                  this.toastr.error("Something went wrong");
              }
          );
  } else {
      this.toastr.error("Invalid Scheme ID");
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
        this.isUpdate=true;
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
