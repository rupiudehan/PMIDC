import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from './country.service';
import { CountryModel } from './country.model';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent {

  CountryDetails: any[] = [];
  lastUsedId: number = 0; 
  CountryName: any;
  currentCountryId: number | null = null;
  formValue !: FormGroup;
  countryModelObj   : CountryModel = new CountryModel();
  stateForm: any;
  state: any;
  refreshPage: any;
  stateService: any;
  router: any;
  row: any;
  level: any;

  constructor (private FormBuilder: FormBuilder,
    private api :CountryService) { }
   
  ngOnInit(): void {
    this.getCountryDetails();
    this.formValue = this.FormBuilder.group({
      id:[0],
      CountryName : ['', [Validators.required, Validators.maxLength(150)]],
    })    

  }
  
  postCountryDetails(){
    debugger
    const countryName = this.formValue.value.CountryName.trim(); 


    const duplicate = this.CountryDetails?.some(c => c.countryName?.toLowerCase() === countryName.toLowerCase());

    if (duplicate) {
      alert("Country already exists");
      return;
    }
    

    this.countryModelObj.id = ++this.lastUsedId;
    this.countryModelObj.CountryName = this.formValue.value.CountryName.trim();
    const country = this.countryModelObj.CountryName ;

    if( country == "" || country == '0')
      {
           alert("Please Enter a Country");
      }

    else{this.api.postCountry(this.countryModelObj)
    .subscribe(res=>{
      console.log(res);
      if(this.countryModelObj.CountryName.length==0 || this.countryModelObj.CountryName.trim()=== ''){}
      else{
      alert("Country Added Successfully")
      this.getCountryDetails()
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
      this.postCountryDetails();
    }
    else{
      //this.editCountry(this.currentCountryId);
      this.updateCountry(obj);
      alert("Country Updated Successfully");
      this.getCountryDetails();
      this.resetForm();
      obj.id=0;
      
    }
    // this.formValue.reset();
}
  cancel() {
    const countryNameInput = document.getElementById('countryName') as HTMLInputElement;
    countryNameInput.value = '';
    this.router.navigate(['/dashboard']); // Redirect to '/dashboard' route
  }
  resetForm() {
    this.formValue.reset();
    this.currentCountryId = 0;
    this.formValue.value.id=0;
    this.formValue.value.CountryName="";
  }

  getCountryDetails() {
    this.api.getCountry()
      .subscribe((res: any) => { 
        const maxId = Math.max(...res.map((item: any) => item.id));
        // Update lastUsedId to ensure generated IDs are unique
        this.lastUsedId = maxId > 0 ? maxId : 0;
        this.CountryDetails = res;
        console.log(this.CountryDetails)
      });
  }

  deleteCountry(id: number) {
    this.api.deleteCountry(id)
      .subscribe((res: any) => { 
        alert("Country Deleted Successfully");
        this.CountryDetails = this.CountryDetails.filter((country: any) => country.id !== id);
        
      });
  }

  updateCountry(obj:any) {
    debugger;
    const countryName = this.formValue.value.CountryName.trim(); // Trim spaces
  
    // Check for duplicate country names, excluding the current country being edited
    const duplicate = this.CountryDetails?.some(c => c.countryName?.toLowerCase() === countryName.toLowerCase());

    if (duplicate) {
      alert("Country already exists");
      return;
    }
  
    if (this.currentCountryId !== null) {
      this.countryModelObj.CountryName = countryName; // Use trimmed value
      this.countryModelObj.id = this.currentCountryId;
  
      this.api.updateCountry(obj)
        .subscribe(res => {
          //console.log(res);
          this.formValue.value.id=0;
        
        },
        err => {
          alert("Something went wrong");
        });
    } else {
      alert("Invalid country ID");
    }
  }

  editCountry(id: any){
    // debugger;
    // Call the API to get the details of the state with the provided ID
    this.api.getDetailCountry(id).subscribe(
      (country: any) => {
        console.log("Country", country);
  
        // Populate the form with the retrieved state data
        this.formValue.patchValue({
          CountryName: country[0].countryName,
          id: country[0].id
        });
        
        this.currentCountryId = id;
       
        // Update the stateModelObj with the correct state name
        this.countryModelObj.CountryName = country;
        // this.currentCountryId = id;
      },
      (error: any) => {
        console.error("Error fetching country details:", error);
      }
    );
  }

  fetchCountryById(id: number) {
    debugger;
    this.api.getDetailCountry(id).subscribe(
      (country: any) => {
        console.log("Fetched Country", country);

        this.formValue.patchValue({
          CountryName: country[0].CountryName
        });
        // Handle the fetched country details here
      },
      (error: any) => {
        console.error("Error fetching country by ID:", error);
      }
    );
  }
}
