import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../country/country.service';
import { StateService } from './state.service';
import { stateModel } from './state.model';
import { state } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {
  CountryDetails: any[] = [];
  StateDetails: any[] = [];
  lastUsedId: number = 0;
  currentStateId: number | null = null;
  formValue!: FormGroup;
  stateModelObj: stateModel = new stateModel();
  api: any;

  detailsData: any[]=[];

  constructor(
    private formBuilder: FormBuilder, 
    private countryService: CountryService,
    private stateService: StateService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCountryDetails();
    this.getStateDetails();
    this.formValue = this.formBuilder.group({
      countryId: [0],
      stateName: ['', [Validators.required, Validators.maxLength(150)]],
    });
    
    console.log('CountryDetails:', this.CountryDetails); // Add this line to debug
  }

  getCountryDetails() {
    this.countryService.getCountry().subscribe((res: any) => {
      console.log('Country API Response:', res); // Add this line to debug
      this.CountryDetails = res;
    });
  }

  getStateDetails() {
    this.stateService.getstate().subscribe((res: any) => {
      const maxId = Math.max(...res.map((item: any) => item.id));
      this.lastUsedId = maxId > 0 ? maxId : 0;
      this.StateDetails = res;
    });
  }

  postStateDetails() {
    debugger;
    const stateName = this.formValue.value.stateName.trim();
    const countryId = this.formValue.value.countryId;

  //   const duplicates = this.StateDetails?.some(s => {
  //     console.log('Checking state:', s.stateName, s.countryId);  // Log each state being checked
  //     console.log('Comparison result:', 
  //         s.stateName?.toLowerCase() === stateName.toLowerCase(), 
  //         s.countryId == countryId
  //     );
  //     return s.stateName?.toLowerCase() === stateName.toLowerCase() && s.countryId == countryId;
  // });

  //console.log('Duplicate found:', duplicates); // Log the result of the duplicate check


    const duplicate = this.StateDetails?.some(s => s.stateName?.toLowerCase() == stateName.toLowerCase() && s.countryId == countryId);

    if (duplicate) {
      this.toastr.error("State already exists in the selected country");
      return;
    }

    this.stateModelObj.stateName = stateName.trim();
    this.stateModelObj.countryId = countryId;

    if (this.currentStateId == null || this.currentStateId == 0) {
      this.stateModelObj.id = ++this.lastUsedId;
      this.stateService.postState(this.stateModelObj)
        .subscribe(res => {
          console.log(res);
          this.toastr.success("State Added Successfully");
          this.getStateDetails();
          this.resetForm();
        },
        err => {
          this.toastr.error("Something went wrong");
        });
    } else {
      this.updateState();
    }
  }

  updateState() {
    debugger;
    const stateName = this.formValue.value.stateName.trim(); 
    const countryId = this.formValue.value.countryId; 
    const duplicate = this.StateDetails?.some(s => s.stateName?.toLowerCase() === stateName.toLowerCase() && s.countryId === countryId && s.id !== this.currentStateId);

    if (duplicate) {
      this.toastr.error("State already exists in the selected country");
      return;
    }

    if (this.currentStateId !== null) {
      this.stateModelObj.stateName = stateName; 
      this.stateModelObj.countryId = countryId; 
      this.stateModelObj.id = this.currentStateId;

      this.stateService.updateState(this.stateModelObj)
        .subscribe((res:any) => {
          console.log(res);
          this.toastr.success("State Updated Successfully");
          this.getStateDetails();
          this.resetForm();
        },
        (error:any) => {
          this.toastr.error("Something went wrong");
        });
    } else {
      this.toastr.error("Invalid state ID");
    }
  }

  editState(id: number | null) {
    debugger;
    if (id === null) {
      console.error("Invalid state ID");
      return;
    }
  
    console.log("Editing state with ID:", id); 
    this.stateService.getDetailState(id).subscribe(
      (state: any) => {
        if (state && state.length > 0) {
          console.log("State", state);
          this.formValue.patchValue({
            stateName: state[0].stateName,
            countryId: state[0].countryId,
            id: state[0].id
          });
          this.currentStateId = id;
        } else {
          console.error("State not found for ID:", id); 
          this.toastr.error("State not found");
        }
      },
      (error: any) => {
        console.error("Error fetching state details:", error);
      }
    );
  }
  
    
  resetForm() {
    this.formValue.reset();
    this.currentStateId = null;
  }

  cancel() {
    this.formValue.reset();
    this.currentStateId = null;
  }
  onSubmit(obj :any){
    debugger
    const id = this.formValue.value.id;
    if(id==0|| id==null) 
      {
        this.postStateDetails();
      }
      else{
        //this.editCountry(this.currentCountryId);
        this.updateState();
        this.toastr.success("State Updated Successfully");
        this.getStateDetails();
        this.resetForm();
        obj.id=0;
        
      }
  }  

  deleteState(id: number) {
    this.stateService.deleteState(id)
      .subscribe(res => {
        this.toastr.success("State Deleted Successfully");
        this.StateDetails = this.StateDetails.filter((state: any) => state.id !== id);
      });
  }

  editing(id: number) {
    this.editState(id);
  }

  fetchStateById(id: number) {
    debugger;
    this.api.getDetailState(id).subscribe(
      (state: any) => {
        console.log("Fetched State", state);

        this.formValue.patchValue({
          countryId: state[0].countryId,
          StateName : state[0].StateName
        });
        // Handle the fetched country details here
      },
      (error: any) => {
        console.error("Error fetching country by ID:", error);
      }
    );
  }
}



