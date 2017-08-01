import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.css',
   '../../../node_modules/ng2-dnd/bundles/style.css',
    '../../../node_modules/flag-icon-css/css/flag-icon.min.css',
    '../../../node_modules/font-awesome/css/font-awesome.min.css',]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
