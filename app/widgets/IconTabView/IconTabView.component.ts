import {
    Component, EventEmitter,
    ElementRef, ViewChild,
    AfterViewInit, OnInit,
    Input, Output
} from '@angular/core';
import { Label } from 'ui/label';
import { View } from 'ui/core/view';
import { GridLayout, ItemSpec, GridUnitType } from 'ui/layouts/grid-layout';
import { GestureTypes, TouchGestureEventData } from 'ui/gestures';
import { Color } from 'color';
import { IconWithDigit } from '../../widgets/IconWithDigit/IconWithDigit.component';


@Component({
    selector: 'IconTabView',
    templateUrl: 'widgets/IconTabView/IconTabView.html',
    styleUrls: ['widgets/IconTabView/style.css']
})
export class IconTabView extends View implements OnInit {
    @Input() tabEntries: TabEntry[];    
    @Input() gridRow: number = 0;
    @Input() gridCol: number = 0;
    @Input() gridRSpan: number = 1;
    @Input() gridCSpan: number = 1;

    @Output() tap: EventEmitter<number> = new EventEmitter<number>();

    private _index : number;
    @Input()
    get index() : number { return this._index; }
    @Output() indexChange : EventEmitter<number> = new EventEmitter<number>();
    set index(val: number) {
        if (val != undefined && val != this._index) {
            this._index = val;
            this.indexChange.emit(val);
        }
    }

    ngOnInit() {
        this.onIconTap = this.onIconTap.bind(this);
    }

    onIconTap(id:number) {
        this.index = id;
        console.log("Index: " + id);
        this.tap.emit(id);
    }
}

export class TabEntry {
    constructor(public icon?: string, public text?: string, public digit?: string, public activeColor?: string,
        public activeBg?: string, public normalColor?: string, public normalBg?: string) {

    }
}