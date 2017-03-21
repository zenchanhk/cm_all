import { Component, Input, OnInit, ElementRef, AfterViewInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { IconWithDigit } from "../../widgets/IconWithDigit/IconWithDigit.component";
import { TabEntry } from "../../widgets/IconTabView/IconTabView.component";
import { TestComponent } from "../../pages/test/test.component"
import { StackLayout } from 'ui/layouts/stack-layout';
import { View } from 'ui/core/view';
import builder = require("ui/builder");

@Component({
    selector: "test1",
    templateUrl: "pages/test1/test1.html",
    styleUrls: ["pages/test1/style.css"],
})
export class Test1 implements OnInit {
    //@ViewChild("id") icon: ElementRef;
    @ViewChild("sl") sl: ElementRef;
    stack: StackLayout;
    c: number = 0;
    i: number = 0;
    icon1 = String.fromCharCode(0xe908);
    iconWD: IconWithDigit;
    a = [{"text": "a"}, {"text": "b"}];
    items: TabEntry[];
     
    idx: number = 0;
    
    ngAfterViewInit() {
        //this.iconWD = <IconWithDigit>this.icon.nativeElement;
        //console.log(this.icon.nativeElement);
        this.stack = <StackLayout>this.sl.nativeElement;
        var tmp = builder.load({path:"pages/greeter",name:"greeter"});
        //var tmp = builder.load("../../pages/test/test.component.ts");
        console.log(typeof tmp);
        //this.stack.addChild(tmp);     
    }

    ngOnInit() {
        //this.testClick1 = this.testClick1.bind(this);
        this.t1 = this.t1.bind(this);
        this.items = [new TabEntry(String.fromCharCode(0xf015),"首页", "3","green"),
        new TabEntry(String.fromCharCode(0xf267),"发现", "0","green"),
        new TabEntry(String.fromCharCode(0xf08a),"收藏", "2","green"),
        new TabEntry(String.fromCharCode(0xf2be),"我","-1", "green")];        
    }

    Click() {
        this.idx++;
        if (this.idx > this.items.length-1) this.idx = 0;
        console.log(this.idx);
        //console.log("clicked: id=" + id + "; i=" + this.i);
    }

    public t1(val) : void {
        let tmp = Number(this.items[val].digit);        
        if (tmp>12) tmp = -2;
        console.log("val:" + val + ", digit:" + (tmp++).toString());
        //this.items[val].digit=(tmp++).toString();
        this.items[val].digit=tmp.toString();
    };

    t2(data) {
        console.log(data.value);
    }
}