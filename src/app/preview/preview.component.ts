import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: [
    './preview.component.css', 
    '../../../node_modules/ng2-dnd/bundles/style.css',
    '../../../node_modules/flag-icon-css/css/flag-icon.min.css',
    '../../../node_modules/font-awesome/css/font-awesome.min.css',
    ]
})
export class PreviewComponent implements OnInit {
  public formList: Array<any> = [];
  public filmLove: Array<any> = [];
  public active: boolean = false;
  public editableText;
  public code;
  public sonar;
  public title;
  public theme:Array<Theme> = [];
  public background;
  public text;
  public btn;
  
  constructor(private router: Router) {
    //theme
    this.theme.push(new Theme("btn btn-secondary bt-xs btn-icon mb-1 mr-1",'fa fa-cog','','teal','secondary','btn btn-secondary'));
    this.theme.push(new Theme("btn btn-teal bt-xs btn-icon mb-1 mr-1",'fa fa-cog','bg-teal','white','teal','btn btn-teal'));
    this.theme.push(new Theme("btn btn-warning bt-xs btn-icon mb-1 mr-1",'fa fa-cog','bg-warning','white','warning','btn btn-warning'));
    this.theme.push(new Theme("btn btn-purple bt-xs btn-icon mb-1 mr-1",'fa fa-cog','bg-purple','white','purple','btn btn-purple'));
    this.theme.push(new Theme("btn btn-info bt-xs btn-icon mb-1 mr-1",'fa fa-cog','bg-info','white','info','btn btn-info'));
    this.theme.push(new Theme("btn btn-danger bt-xs btn-icon mb-1 mr-1",'fa fa-cog','bg-danger','white','danger','btn btn-danger'));
    this.theme.push(new Theme("btn btn-pink bt-xs btn-icon mb-1 mr-1",'fa fa-cog','bg-pink','white','pink','btn btn-pink'));
    this.theme.push(new Theme("btn btn-blue bt-xs btn-icon mb-1 mr-1",'fa fa-cog','bg-blue','white','blue','btn btn-blue'));
    //others
    this.title = localStorage.getItem('flowtitle');
    this.formList = this.getSavedInput();
    this.background = this.titleBg();
    this.text = this.titleTxt();
    this.btn = this.btnStyle();
  }

  ngOnInit() {
    if(!localStorage.getItem('flowtitle')){
      this.router.navigate['dashboard'];
    }
  }

  refresh(){
    this.title = localStorage.getItem('flowtitle');
    this.formList = this.getSavedInput();
    this.background = this.titleBg();
    this.text = this.titleTxt();
    this.btn = this.btnStyle();
  }

  saveFormInput(value){
    localStorage.setItem('form', value);  
     
  }

  getSavedInput(){
    this.sonar = JSON.parse(localStorage.form);
    (this.sonar) ? this.active = true : '';
    return this.sonar;
  }

titleBg(){
  let call = JSON.parse(localStorage.theme);
  console.log(call);
  return call.bg || '';
}

titleTxt(){
  let call = JSON.parse(localStorage.theme);
  console.log(call);
  return call.text || '';
}
btnStyle(){
  let call = JSON.parse(localStorage.theme);
  console.log(call);
  return call.inputbtn;
}

}


class Theme {
  constructor(public style: string, public fa: string, public bg: string, public text: string, public color: string, public inputbtn: string) {}
}