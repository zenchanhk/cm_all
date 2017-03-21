import {
  Component, EventEmitter,
  ElementRef, ViewChild,
  AfterViewInit, OnInit,
  Input, Output
} from '@angular/core';
import { Label } from 'ui/label';
import { View } from 'ui/core/view';
import { StackLayout } from 'ui/layouts/stack-layout';
import { GestureTypes, TouchGestureEventData } from 'ui/gestures';
import { Color } from 'color';


@Component({
  selector: 'IconWithDigit',
  templateUrl: 'widgets/IconWithDigit/IconWithDigit.html',
  styleUrls: ['widgets/IconWithDigit/style.css']
})
export class IconWithDigit extends View implements AfterViewInit {
  @ViewChild('iconWithDigit') layoutRef: ElementRef; //Outmost Layout
  @ViewChild('lblDigit') digitRef: ElementRef;    //Digital Label
  @ViewChild('lblIcon') iconRef: ElementRef;    //Digital Label      

  private layoutView: StackLayout;
  private digitLbl: Label;
  private iconLbl: Label;
  private isDigitVisible: boolean = false;

  //data-binding property
  @Input() onIconTap: Function;
  @Input() text: string;
  @Input() icon: string;
  @Input() indexId: number;
  @Input() normalBg: string;
  @Input() normalColor: string;
  @Input() activeBg: string;
  @Input() activeColor: string;
  @Input() gridCol: number = 0;

  private _isActive: boolean;
  @Input()
  get isActive(): boolean { return this._isActive; }
  set isActive(val: boolean) {
    if (val != undefined && val != this._isActive) {
      this._isActive = val;
      if (val)
        this.changeStatus("active");
      else
        this.changeStatus("deactive");
    }
  }

  private _digit: string;
  @Input()
  get digit(): string { return this._digit; }
  set digit(val: string) {
    if (!(Number(val) > 9 && this._digit == "..") &&
      (!(Number(val) == 0 && this._digit == ""))) {
      if (val != null && val != this._digit) {
        switch (Number(val)) {
          case 0:
            this.drawCircle(4);
            break;
          default:
            this.drawCircle(8);
        }

        this._digit = Number(val) > 9 ? ".." : (Number(val) == 0 ? "" : val);
        if (Number(val) < 0) this.isDigitVisible = false;
        else this.isDigitVisible = true;        
      }      
    }
  }

  ngAfterViewInit() {
    this.layoutView = <StackLayout>this.layoutRef.nativeElement;
    this.digitLbl = <Label>this.digitRef.nativeElement;
    this.iconLbl = <Label>this.iconRef.nativeElement;

    //this block will be called again here after view init
    if (this._digit == "")       
        this.drawCircle(4);
    else this.drawCircle(8);        

    if (this._isActive)
      this.changeStatus("active");
    else
      this.changeStatus("deactive");
    //end of block  
  }

  private drawCircle(radius: number) {
    if (this.digitLbl) {
      this.digitLbl.width = radius * 2;
      this.digitLbl.height = radius * 2;
      this.digitLbl.borderRadius = radius;
      //this.digitLblLeft = this.iconLbl.getMeasuredWidth() / 4 - (radius - 5);
      //this.digitLblTop = radius - 5 > 0 ? radius - 5 : 0;
    }
  }

  private changeBg(component, bgColor: string) {
    component.backgroundColor = new Color(bgColor);
  }

  private changeColor(component, bgColor: string) {
    component.color = new Color(bgColor);
  }

  private changeStatus(status: string) {
    switch (status) {
      case "active":
        if (this.layoutView) {
          this.activeBg && this.changeBg(this.layoutView, this.activeBg);
          this.activeColor && this.changeColor(this.layoutView, this.activeColor);
        }
        break;
      case "deactive":
        if (this.layoutView) {
          if (this.normalBg)
            this.changeBg(this.layoutView, this.normalBg);
          else
            this.layoutView.backgroundColor = null;
          if (this.normalColor)
            this.changeColor(this.layoutView, this.normalColor);
          else
            this.layoutView.color = null;
        }
        break;
    }
  }

  onTouch(event) {
    if (event.action == "up") {
      //this.isActive = !this._isActive;
      //console.log(this.isActive);
      //this.tap.emit({value: this.indexId});
      //this.isActive = true;
      this.onIconTap && this.onIconTap(this.indexId);
    }
  }
}