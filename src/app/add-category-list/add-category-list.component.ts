import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-category-list',
  templateUrl: './add-category-list.component.html',
  styleUrls: ['./add-category-list.component.scss']
})
export class AddCategoryListComponent implements OnInit {
  formdata!: FormGroup;
  formdata2!: FormGroup;
  body!: any;
  categories: string[] = ['Women', 'Men', 'Kids', 'Electronics'];
  selectedId!:any;
  constructor(private router: Router, private http: HttpService, private fb: FormBuilder) 
  {

  }
  ngOnInit() 
  {
    this.datalist();

  }


  datalist() {
    this.formdata = this.fb.group({
      "category": ['', Validators.required],
      "description": ['', Validators.required]
    
  })
  
    this.formdata2 = this.fb.group({
      "parent_category": ['', Validators.required],
       "Image":[null],
    });

  }



  submit() {
    const currentDate = {
      Created_at: new Date()
    }
    let productData = {
      ...this.formdata.value,
      ...this.formdata2.value
      
    };
    if(this.selectedId==null){
    this.http.saveData('products',productData).subscribe((res:any)=>{
      console.log(res);
      this.router.navigate(['/subcategory']);
    })
  }
  else{
    this.editProduct();
  }
}

  editProduct(){
    const endPoint = "products/" + this.selectedId;
    this.http.getData(endPoint).subscribe((response:any)=>{
      console.log(response);});
    }
    
    updateproduct(){
      const endPoint = 'products' + this.selectedId;
    
      this.http.updateData(endPoint,this.body).subscribe((response:any)=>{
        console.log("data updated", response);
        this.router.navigate(['/product'])
      })
    }
      // drag and drop
      
    files: File[] = [];
  onSelect(event:any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    const file : File = event.addedFiles[0];
    this.formdata.patchValue({Image : file})
  }

  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }


}