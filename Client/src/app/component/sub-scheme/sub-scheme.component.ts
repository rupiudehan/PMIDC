import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { subSchemeModel } from './sub-scheme.model';
import { SchemeService } from '../scheme/scheme.service';
import { SubSchemeService } from './sub-scheme.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sub-scheme',
  templateUrl: './sub-scheme.component.html',
  styleUrls: ['./sub-scheme.component.scss']
})
export class SubSchemeComponent implements OnInit {
  onAlphabetInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
  }
  SchemeDetails: any[] = [];
  subSchemeDetails: any[] = [];
  lastUsedId: number = 0;
  currentSubSchemeId: number | null = null;
  formValue!: FormGroup;
  subSchemeModelObj: subSchemeModel = new subSchemeModel();
  api: any;
  detailsData: any[]=[];
  isUpdate: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private schemeService: SchemeService,
    private subSchemeService: SubSchemeService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getSchemeDetails();
    this.getSubSchemeDetails();
    this.formValue = this.formBuilder.group({
      schemeId: [0],
      subScheme: ['', [Validators.required, Validators.maxLength(150)]],
    });
    
    console.log('SchemeDetails:', this.SchemeDetails); // Add this line to debug
  }

  getSchemeDetails() {
    this.schemeService.getScheme().subscribe((res: any) => {
      console.log('Scheme API Response:', res); // Add this line to debug
      this.SchemeDetails = res;
    });
  }

  getSubSchemeDetails() {
    this.subSchemeService.getSubScheme().subscribe((res: any) => {
      const maxId = Math.max(...res.map((item: any) => item.id));
      this.lastUsedId = maxId > 0 ? maxId : 0;
      this.subSchemeDetails = res;
    });
  }

  postSubSchemeDetails() {
    debugger;
    const subScheme = this.formValue.value.subScheme?.trim();
    const schemeId = this.formValue.value.schemeId;

    // Check if any input is null or empty
    if (!subScheme || !schemeId) {
        this.toastr.error("Please enter all the details");
        return;
    }

    const duplicate = this.subSchemeDetails?.some(s => 
        s.subScheme?.toLowerCase() === subScheme.toLowerCase() && 
        s.schemeId == schemeId
    );

    if (duplicate) {
        this.toastr.error("Sub-Scheme already exists in the selected Scheme");
        this.formValue.reset();
        return;
    }

    this.subSchemeModelObj.subScheme = subScheme;
    this.subSchemeModelObj.schemeId = schemeId;

    if (this.currentSubSchemeId === null || this.currentSubSchemeId === 0) {
        this.subSchemeModelObj.id = ++this.lastUsedId;
        this.subSchemeService.postSubScheme(this.subSchemeModelObj)
            .subscribe(res => {
                console.log(res);
                this.toastr.success("Sub-Scheme Added Successfully");
                this.getSubSchemeDetails();
                this.resetForm();
            },
            err => {
                this.toastr.error("Something went wrong");
            });
    } else {
        this.updateSubScheme();
    }
}


updateSubScheme() {
  debugger;
  const subScheme = this.formValue.value.subScheme?.trim(); 
  const schemeId = this.formValue.value.schemeId; 

  // Validate subScheme and schemeId
  if (!subScheme || !schemeId) {
      this.toastr.error("Sub-Scheme and Scheme ID cannot be null or empty");
      return;
  }

  // Check for duplicate sub-scheme names within the same scheme, excluding the current sub-scheme being edited
  const duplicate = this.subSchemeDetails?.some(s => s.subScheme?.toLowerCase() === subScheme.toLowerCase() && s.schemeId === schemeId && s.id !== this.currentSubSchemeId);

  if (duplicate) {
      this.toastr.error("Sub-Scheme already exists in the selected Scheme");
      return;
  }

  if (this.currentSubSchemeId !== null) {
      this.subSchemeModelObj.subScheme = subScheme; 
      this.subSchemeModelObj.schemeId = schemeId; 
      this.subSchemeModelObj.id = this.currentSubSchemeId;

      this.subSchemeService.updateSubScheme(this.subSchemeModelObj)
          .subscribe(
              (res: any) => {
                  console.log(res);
                  this.toastr.success("Sub-Scheme Updated Successfully");
                  this.getSubSchemeDetails();
                  this.resetForm();
                  this.isUpdate=false;
              },
              (error: any) => {
                  this.toastr.error("Something went wrong");
              }
          );
  } else {
      this.toastr.error("Invalid Sub-Scheme ID");
  }
}


  editSubScheme(id: number | null) {
    debugger;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (id === null) {
      console.error("Invalid Sub-Scheme ID");
      return;
    }
  
    console.log("Editing Sub-Scheme with ID:", id); 
    this.subSchemeService.getDetailSubScheme(id).subscribe(
      (subScheme: any) => {
        if (subScheme && subScheme.length > 0) {
          console.log("Sub-Scheme", subScheme);
          this.formValue.patchValue({
            subScheme: subScheme[0].subScheme,
            schemeId: subScheme[0].schemeId,
            id: subScheme[0].id
          });
          this.isUpdate=true;
          this.currentSubSchemeId = id;
        } else {
          console.error("Sub-Scheme not found for ID:", id); 
          this.toastr.error("State not found");
        }
      },
      (error: any) => {
        console.error("Error fetching Sub-Scheme details:", error);
      }
    );
  }
  
    
  resetForm() {
    this.formValue.reset();
    this.currentSubSchemeId = null;
  }

  cancel() {
    this.formValue.reset();
    this.currentSubSchemeId = null;
  }
  onSubmit(obj :any){
    debugger
    const id = this.formValue.value.id;
    if(id==0|| id==null) 
      {
        this.postSubSchemeDetails();
      }
      else{
        //this.editCountry(this.currentCountryId);
        this.updateSubScheme();
        this.toastr.success("Sub-Scheme Updated Successfully");
        this.getSubSchemeDetails();
        this.resetForm();
        obj.id=0;
        
      }
  }  

  deleteSubScheme(id: number) {
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
            this.subSchemeService.deleteSubScheme(id)
                .subscribe(
                    (res: any) => {
                        this.toastr.success("Sub-Scheme Deleted Successfully");
                        this.subSchemeDetails = this.subSchemeDetails.filter((subScheme: any) => subScheme.id !== id);
                    },
                    (error: any) => {
                        if (error.status === 400 && error.error && error.error.error === 'Cannot delete sub-scheme. It is associated with other details.') {
                            this.toastr.error("Cannot delete sub-scheme. It is associated with other details.");
                        } else {
                            this.toastr.error("Cannot delete this sub-scheme. It is associated with other details.");
                        }
                    }
                );
        }
    });
}


  editing(id: number) {
    this.editSubScheme(id);
  }

  fetchSubSchemeById(id: number) {
    debugger;
    this.api.getDetailSubScheme(id).subscribe(
      (subScheme: any) => {
        console.log("Fetched Sub-Scheme", subScheme);

        this.formValue.patchValue({
          schemeId: subScheme[0].schemeId,
          SubScheme : subScheme[0].SubScheme
        });
        // Handle the fetched country details here
      },
      (error: any) => {
        console.error("Error fetching Scheme by ID:", error);
      }
    );
  }
}