import { Component,OnInit,ViewChild } from '@angular/core';
import { HttpService } from '../http.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.scss']
})
export class SubCategoryListComponent  implements OnInit{
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

 
    dataSource!:any;
     data:any[]=[];
    constructor(private http:HttpService,private router:Router) {}
  
    ngOnInit() {
      this.getDatalist();
    }
    
     getDatalist(){
    this.http.getData('products').subscribe((response:any)=>{
      if(response && response.length > 0){
        this.dataSource = new MatTableDataSource(response);
        // console.log(response);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort =this.sort;
  
      }
    })
  }
    displayedColumns: any[] = ["Category","Description","Total_items","Created_at","Actions"];
  
  
  
    deleteProduct(row:any,index:any){
      const url = 'products/' + row.id;
      this.http.deleteData(url).subscribe((response: any) => {
        const data = this.dataSource.data; // Get the underlying data array
        data.splice(index, 1); // Remove the item from the data array
        this.dataSource.data = data;
        this.dataSource._updateChangeSubscription(response);
      })
  
    }
       
  }
  export interface CategoryData{
    Category:string,
    Description:string ,
    parent_category:string,
  }
  
