import { SubComponentService } from './sub-component.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { componentModel } from './sub-component.model';
import { SchemeService } from '../scheme/scheme.service';
import { SubSchemeService } from '../sub-scheme/sub-scheme.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sub-component',
  templateUrl: './sub-component.component.html',
  styleUrls: ['./sub-component.component.scss']
})
export class SubComponentComponent implements OnInit {
  onAlphabetInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
  }
  SchemeDetails: any[] = [];
  SubSchemeDetails: any[] = [];
  SubComponentDetails: any[] = [];
  lastUsedId: number = 0;
  currentSubComponentId: number | null = null;
  formValue!: FormGroup;
  componentModelObj: componentModel = new componentModel();
  api: any;

  detailsData: any[]=[];

  constructor(
    private formBuilder: FormBuilder, 
    private schemeService: SchemeService,
    private subSchemeService: SubSchemeService,
    private SubComponentService: SubComponentService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getSchemeDetails();
    this.getSubSchemeDetails();
    this.getSubComponentDetails();
    this.formValue = this.formBuilder.group({
      schemeId: [0],
      subSchemeId: [0],
      subComponent: ['', [Validators.required, Validators.maxLength(150)]],
      componentCode: ['', [Validators.required, Validators.maxLength(150)]],
    });
    
    console.log('SchemeDetails:', this.SchemeDetails);
    console.log('SubSchemeDetails:', this.SubSchemeDetails); // Add this line to debug
  }

  getSchemeDetails() {
    this.schemeService.getScheme().subscribe((res: any) => {
      console.log('Scheme API Response:', res); // Add this line to debug
      this.SchemeDetails = res;
    });
  }
  getSubSchemeDetails() {
    this.subSchemeService.getSubScheme().subscribe((res: any) => {
      console.log('Sub-Scheme API Response:', res); // Add this line to debug
      this.SubSchemeDetails = res;
    });
  }

  getSubComponentDetails() {
    this.SubComponentService.getSubComponent().subscribe((res: any) => {
      const maxId = Math.max(...res.map((item: any) => item.id));
      this.lastUsedId = maxId > 0 ? maxId : 0;
      this.SubComponentDetails = res;
    });
  }

  postSubComponentDetails() {
    debugger;
    const subComponent = this.formValue.value.subComponent?.trim();
    const componentCode = this.formValue.value.componentCode?.trim();
    const schemeId = this.formValue.value.schemeId;
    const subSchemeId = this.formValue.value.subSchemeId;

    // Check if any input is null or empty
    if (!subComponent || !componentCode || !schemeId || !subSchemeId) {
        this.toastr.error("Please enter all the details");
        return;
    }

    const duplicate = this.SubComponentDetails?.some(s => 
        s.subComponent?.toLowerCase() === subComponent.toLowerCase() && 
        s.componentCode?.toLowerCase() === componentCode.toLowerCase() && 
        s.schemeId == schemeId && 
        s.subSchemeId == subSchemeId
    );

    if (duplicate) {
        this.toastr.error("Sub-Component already exists in the selected Scheme");
        return;
    }

    this.componentModelObj.subComponent = subComponent;
    this.componentModelObj.componentCode = componentCode;
    this.componentModelObj.schemeId = schemeId;
    this.componentModelObj.subSchemeId = subSchemeId;

    if (this.currentSubComponentId == null || this.currentSubComponentId == 0) {
        this.componentModelObj.id = ++this.lastUsedId;
        this.SubComponentService.postSubComponent(this.componentModelObj)
            .subscribe(res => {
                console.log(res);
                this.toastr.success("Sub-Component Added Successfully");
                this.getSubComponentDetails();
                this.resetForm();
            },
            err => {
                this.toastr.error("Something went wrong");
            });
    } else {
        this.updateSubComponent();
    }
}


  updateSubComponent() {
    debugger;
    const subComponent = this.formValue.value.subComponent.trim(); 
    const schemeId = this.formValue.value.schemeId; 
    const componentCode = this.formValue.value.componentCode.trim(); 
    const subSchemeId = this.formValue.value.subSchemeId; 
    const duplicate = this.SubComponentDetails?.some(s =>  s.subComponent?.toLowerCase() == subComponent.toLowerCase() && s.componentCode?.toLowerCase() == componentCode.toLowerCase() && s.schemeId == schemeId && s.subSchemeId == subSchemeId);

    if (duplicate) {
      this.toastr.error("Sub-Component already exists in the selected Scheme");
      return;
    }

    if (this.currentSubComponentId !== null) {
      this.componentModelObj.SubComponent = subComponent; 
      this.componentModelObj.schemeId = schemeId; 
      this.componentModelObj.subSchemeId = subSchemeId; 
      this.componentModelObj.componentCode = componentCode; 
      this.componentModelObj.id = this.currentSubComponentId;

      this.SubComponentService.updateSubComponent(this.componentModelObj)
        .subscribe((res:any) => {
          console.log(res);
          this.toastr.success("Sub-Component Updated Successfully");
          this.getSubComponentDetails();
          this.resetForm();
        },
        (error:any) => {
          this.toastr.error("Something went wrong");
        });
    } else {
      this.toastr.error("Invalid Sub-Component ID");
    }
  }

  editSubComponent(id: number | null) {
    debugger;
    if (id === null) {
      console.error("Invalid Sub-Component ID");
      return;
    }
  
    console.log("Editing Sub-Component with ID:", id); 
    this.SubComponentService.getDetailSubComponent(id).subscribe(
      (subComponent: any) => {
        if (subComponent && subComponent.length > 0) {
          console.log("subComponent", subComponent);
          this.formValue.patchValue({
            subComponent: subComponent[0].subComponent,
            schemeId: subComponent[0].schemeId,
            subschemeId: subComponent[0].subschemeId,
            componentCode: subComponent[0].componentCode,
            id: subComponent[0].id
          });
          this.currentSubComponentId = id;
        } else {
          console.error("Sub-Component not found for ID:", id); 
          this.toastr.error("Sub-Component not found");
        }
      },
      (error: any) => {
        console.error("Error fetching Sub-Component details:", error);
      }
    );
  }
  
    
  resetForm() {
    this.formValue.reset();
    this.currentSubComponentId = null;
  }

  cancel() {
    this.formValue.reset();
    this.currentSubComponentId = null;
  }
  onSubmit(obj :any){
    debugger
    const id = this.formValue.value.id;
    if(id==0|| id==null) 
      {
        this.postSubComponentDetails();
      }
      else{
        //this.editCountry(this.currentCountryId);
        this.updateSubComponent();
        this.toastr.success("Sub-Component Updated Successfully");
        this.getSubComponentDetails();
        this.resetForm();
        obj.id=0;
        
      }
  }  

  deleteSubComponent(id: number) {
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
            this.SubComponentService.deleteSubComponent(id)
                .subscribe(
                    (res: any) => {
                        this.toastr.success("Sub-Component Deleted Successfully");
                        this.SubComponentDetails = this.SubComponentDetails.filter((subComponent: any) => subComponent.id !== id);
                    },
                    (error: any) => {
                        this.toastr.error("Cannot delete this sub-component. It is associated with other details.");
                    }
                );
        }
    });
}


  editing(id: number) {
    this.editSubComponent(id);
  }

  fetchSubComponentById(id: number) {
    debugger;
    this.api.getDetailSubComponent(id).subscribe(
      (subComponent: any) => {
        console.log("Fetched Sub-Component", subComponent);

        this.formValue.patchValue({
          schemeId: subComponent[0].schemeId,
          SubComponent : subComponent[0].SubComponent,
          subSchemeId: subComponent[0].subSchemeId,
          ComponentCode : subComponent[0].ComponentCode
        });
        // Handle the fetched country details here
      },
      (error: any) => {
        console.error("Error fetching Sub-Component by ID:", error);
      }
    );
  }
}