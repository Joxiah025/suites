import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FlowserviceService } from '../flowservice.service';
import swal from 'sweetalert2';


declare var $: any;
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: [
    './new.component.css',
    '../../../node_modules/ng2-dnd/bundles/style.css',
    '../../../node_modules/flag-icon-css/css/flag-icon.min.css',
    '../../../node_modules/font-awesome/css/font-awesome.min.css',
  ]
})
export class NewComponent implements OnInit {
  public toolspace: Array<Input> = [];
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
  
  constructor(private router: Router, private flow: FlowserviceService) {
    if(!localStorage.getItem('flowtitle')){
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
    
      //toolspace
    this.toolspace.push(new Input('Input Box','fa fa-edit', 'text'));
    this.toolspace.push(new Input('Telephone','fa fa-phone', 'tel'));
    this.toolspace.push(new Input('Email Box','fa fa-envelope', 'email'));
    this.toolspace.push(new Input('Date','fa fa-calendar', 'date'));
    this.toolspace.push(new Input('Time','fa fa-clock-o', 'time'));
    this.toolspace.push(new Input('Color Picker','fa fa-square', 'color'));
    this.toolspace.push(new Input('Textbox','fa fa-edit', 'textarea'));
    this.toolspace.push(new Input('Number','fa fa-edit', 'number'));
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

  saveForm(){
    let flowinfo = localStorage.flowtitle;
    let other = JSON.parse(localStorage.theme);
    let user = JSON.parse(localStorage.lwUser);
    let data = {
      'title': flowinfo,
      'bg': other.bg,
      'textColor': other.text,
      'btnColor': other.inputbtn,
      'user': user.email
    };

    this.flow.addFlow(data).subscribe(
      (resp) => {
        if(resp.status == 200){
          let gold = JSON.parse(localStorage.form);
          let data = {
            'questions': gold,
            'flowid': resp.message
          };
          this.flow.addQuestions(data).subscribe(
            (res) =>{
              if(res.status == 200){

                this.router.navigate(['report']);
              }else{
                swal('An error occurred','There was an error saving your flow','error');
              }
            }
          )      
        }
      }      
    );

  }

   refresh(e) {
        //this.active = false;
        //this.formList.splice(0,1);
        //$('#modForm').submit(function(e){
      e.preventDefault();
      console.log("hello");
    //});
  }
  
  saveFormInput(value){
    localStorage.setItem('form', value);  
     
  }

  getSavedInput(){
    this.sonar = JSON.parse(localStorage.form);
    (this.sonar) ? this.active = true : '';
    return this.sonar;
  }


  addToForm($event: any) {
    var self = this;
    var form = '<form id="modForm"><div class="form-group">'+
              '<label>Element Label</label>'+
              '<input type="hidden" name="type" value="'+$event.dragData.type+'">'+
              '<input type="text" name="label" value="'+$event.dragData.name+'" placeholder="The label for this element" class="form-control">'+
            '</div>'+
            '<div class="form-group">'+
              '<label>Required</label>'+
              '<div class="radio">'+
                '<label><input type="radio" name="required" value="1"> Yes</label>'+
                '&nbsp;&nbsp;&nbsp;&nbsp;'+
                '<label><input type="radio" name="required" value="0" checked> No</label>'+
              '</div>'+
            '</div>'+
            ' <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>&nbsp;&nbsp;&nbsp;&nbsp;'+
          '<button type="submit" class="btn btn-primary">Save changes</button>'+
          '</form>';
          
    $('.modal-body').html(form);
      $('#modForm').submit(function(e){
        var grey = JSON.parse(localStorage.getItem('form')) || [];
        e.preventDefault();
        var info = $(this).serializeArray();
        var f1 = toSimpleJson(info);
        grey.push(f1);

        function toSimpleJson(serializedData) {
            var o = {};
            $.each(serializedData, function () {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }      
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        }
        self.saveFormInput(JSON.stringify(grey));
        self.formList = self.getSavedInput();
        $('#loadModal').modal('hide');
      });
    $('#loadModal').modal({
      show: true,
      backdrop:'static'
    }).on('hidden.bs.modal', function (e) {
      $('.modal-body').html("");
    });

    //this.active = true;
    //this.saveFormInput($event.dragData);
  }

remove(val){
  var cool = this.formList.indexOf(val);
  if(cool !== -1){
    this.formList.splice(cool,1);
  }
  localStorage.setItem('form',JSON.stringify(this.formList));
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

titleColor(val){
  let cov = this.theme.indexOf(val);
  localStorage.setItem('theme',JSON.stringify({'bg':val.bg,'text':val.text,'color':val.color,'inputbtn':val.inputbtn}));
  this.background = this.titleBg();
  this.text = this.titleTxt();
  this.btn = this.btnStyle();
}


}

class Input {
  constructor(public name: string, public icon: string,public type: string, ) {}
}

class Theme {
  constructor(public style: string, public fa: string, public bg: string, public text: string, public color: string, public inputbtn: string) {}
}
