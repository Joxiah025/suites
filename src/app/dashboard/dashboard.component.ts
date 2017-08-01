import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { HeaderComponent } from '../header/header.component';


// let win : any = typeof window !== 'undefined' && window || {};

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.css',
    '../../../node_modules/flag-icon-css/css/flag-icon.min.css',
    '../../../node_modules/font-awesome/css/font-awesome.min.css',
  ]
})
export class DashboardComponent implements OnInit {
  
  constructor(private router: Router) {
    
  }

  ngOnInit() {
  }

 titleBox($event: any){
   var self = this;
  swal({
    title:"Flow Title", 
    input: "text", 
    type: "question",
    showCancelButton: true,
    }).then(function(value){
    if(value){
      localStorage.setItem('flowtitle',value);
      self.router.navigate(['new']);
    }else{
      swal("No title provided!","You didn't provide a title for this report flow!","error");
    }
  }
  )
  
  
 }

}
