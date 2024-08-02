import { Component } from '@angular/core';
import { FormGroup , FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { FundsModel } from './funds.model';
import { FundsService } from './funds.service';
import { ToastrService } from 'ngx-toastr';
import { maxDigitValidator } from 'src/app/maxDigitValidator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.scss']
})
export class FundsComponent {

  FundDetails: any[] = [];
  lastUsedId: number = 0; 
  Funds: any;
  currentFundId: number | null = null;
  formValue !: FormGroup;
  fundsModelObj : FundsModel = new FundsModel();
  refreshPage: any;
  router: any;
  row: any;
  isUpdate: boolean = false;

  constructor (private FormBuilder: FormBuilder,
    private api :FundsService,
    private toastr: ToastrService) { }
   
  ngOnInit(): void {
    this.getFundDetails();
    this.formValue = this.FormBuilder.group({
      id:[0],
      Funds : ['', [Validators.required, Validators.maxLength(17), maxDigitValidator(17)]],
    })    

  }
  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
  
    if (value.length > 17) {
      inputElement.value = value.slice(0, 17);
    }
  }
  

//   maxDigitsValidator(maxDigits: number): ValidatorFn {
//     return (control: AbstractControl): { [key: string]: any } | null => {
//         const value = control.value;
//         if (value && value.toString().length > maxDigits) {
//             return { 'maxDigits': true };
//         }
//         return null;
//     };
// }
  
  postFundDetails(){
    debugger;
    const funds = this.formValue.value.Funds; 

    // Check if funds is null or 0
    if(funds == null || funds == 0) {
        this.toastr.warning("Please Enter Amount");
        return;
    }

    // const duplicate = this.FundDetails?.some(f => f.funds?.toLowerCase() === funds.toLowerCase());

    // if (duplicate) {
    //   alert("Funds already exist");
    //   return;
    // }

    this.fundsModelObj.id = ++this.lastUsedId;
    this.fundsModelObj.Funds = funds;

    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to add this amount? You won't be able to Edit or Delete this record! ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add it!'
    }).then((result) => {
        if (result.isConfirmed) {
            this.api.postFunds(this.fundsModelObj)
            .subscribe(res => {
                console.log(res);
                this.toastr.success("Funds Added Successfully");
                this.getFundDetails();
                this.formValue.reset();
            },
            err => {
                this.toastr.error("Something went wrong");
            });
        }
    });
}


onSubmit(obj :any){
  debugger
  const id = this.formValue.value.id;
  if(id==0|| id==null) 
    {
      this.postFundDetails();
    }
    else{
      //this.editCountry(this.currentCountryId);
      this.updateFunds(obj);
      // this.toastr.success("Fund Updated Successfully");
      this.getFundDetails();
      this.resetForm();
      obj.id=0;
      
    }
    // this.formValue.reset();
}
  // cancel() {
  //   const countryNameInput = document.getElementById('countryName') as HTMLInputElement;
  //   countryNameInput.value = '';
  //   this.router.navigate(['/dashboard']); // Redirect to '/dashboard' route
  // }
  resetForm() {
    this.formValue.reset();
    this.currentFundId = 0;
    this.formValue.value.id=0;
    this.formValue.value.Funds="";
  }

  getFundDetails() {
    this.api.getFunds()
      .subscribe((res: any) => { 
        const maxId = Math.max(...res.map((item: any) => item.id));
        // Update lastUsedId to ensure generated IDs are unique
        this.lastUsedId = maxId > 0 ? maxId : 0;
        this.FundDetails = res;
        console.log(this.FundDetails)
      });
  }

  deleteFunds(id: number) {
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
            this.api.deleteFunds(id)
                .subscribe(
                    (res: any) => {
                        this.toastr.success("Funds Deleted Successfully");
                        this.FundDetails = this.FundDetails.filter((funds: any) => funds.id !== id);
                    },
                    (error: any) => {
                        this.toastr.error("Cannot delete these funds. An error occurred.");
                    }
                );
        }
    });
}


updateFunds(obj: any) {
  debugger;
  const funds = this.formValue.value.Funds; // Get the value from the form

  // Check if the funds value is null, empty, or consists only of whitespace
  if (!funds || funds === '') {
    this.toastr.warning("Please enter a valid fund name");
    return;
  }

  // Check for duplicate fund names, excluding the current fund being edited
  // const duplicate = this.FundDetails?.some(f => f.Funds?.toLowerCase() === funds.toLowerCase() && f.id !== this.currentFundId);

  // if (duplicate) {
  //   this.toastr.error("Fund already exists");
  //   return;
  // }

  if (this.currentFundId !== null) {
    this.fundsModelObj.Funds = funds; // Use the value from the form
    this.fundsModelObj.id = this.currentFundId;

    this.api.updateFunds(this.fundsModelObj)
      .subscribe(res => {
        this.toastr.success("Fund updated successfully");
        this.formValue.reset();
        this.isUpdate = false;
        this.getFundDetails();
      },
      err => {
        this.toastr.error("Something went wrong");
      });
  } else {
    this.toastr.error("Invalid Fund ID");
  }
}



  editFunds(id: any){
    // debugger;
    // Call the API to get the details of the state with the provided ID
    this.api.getDetailFunds(id).subscribe(
      (funds: any) => {
        console.log("Fund", funds);
  
        // Populate the form with the retrieved state data
        this.formValue.patchValue({
          Funds: funds[0].funds,
          id: funds[0].id
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.isUpdate=true;
        this.currentFundId = id;
       
        // Update the stateModelObj with the correct state name
        this.fundsModelObj.Funds = funds;
        // this.currentCountryId = id;
      },
      (error: any) => {
        console.error("Error fetching Fund details:", error);
      }
    );
  }

  fetchFundById(id: number) {
    debugger;
    this.api.getDetailFunds(id).subscribe(
      (funds: any) => {
        console.log("Funds Fetched.", funds);

        this.formValue.patchValue({
          Funds: funds[0].Funds
        });
        // Handle the fetched country details here
      },
      (error: any) => {
        console.error("Error fetching Funds by ID:", error);
      }
    );
  }
}
