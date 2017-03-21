import { Router } from "@angular/router";
import {
    Component,
    OnInit,
    ElementRef,
    Input,
    ViewChild,    
    AfterViewInit,
} from "@angular/core";
import {
  StackLayout
} from 'ui/layouts/stack-layout';
import { Color } from "color";
import { View } from 'ui/core/view';

import o = require("data/observable");


@Component({
  selector: "test",
  templateUrl: "pages/test/test.html",
  styleUrls: ["pages/test/test-common.css", "pages/test/test.css"]
})
export class TestComponent implements AfterViewInit {
  @ViewChild("sl") sl : ElementRef;
  @Input("h") h: string;
  
  hh: string;
  
  nn : Function;
  
  
  private _onTap : Function;
  @Input()
  get onTap() { return this._onTap; }
  set onTap(val) {
    console.log("In set: " + val);
    if (val != this._onTap) {
      this._onTap = val;
    }
  }

 ngAfterViewInit () {
   //console.log(this.onTap);
 }

  changeColor() {
    //alert("hello");
    //this.stack.backgroundColor = new Color("Blue");
    //this.bg = new Color("yellow");
    this.h = "you";
    this.hh = "hhhh";
    //alert("change h");
  }

  propH(changObj) {
    alert(changObj.propertyName + " " + changObj.value);
  }

  onTouch(event) {
    if (event.action == "up") {      
      //this.tap.emit({value: this.indexId});
      console.log("test.onTouch() + " + !this.nn);      
      this.nn && this.nn();
    }
  }
}