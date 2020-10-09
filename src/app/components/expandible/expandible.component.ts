import { Component, ViewChild, Input, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-expandible',
  templateUrl: './expandible.component.html',
  styleUrls: ['./expandible.component.scss'],
})
export class ExpandibleComponent implements AfterViewInit {

  @ViewChild('expandWrapper', { read: ElementRef }) expandWrapper: ElementRef;
  @Input() expanded = false;
  @Input() expandHeight = '150px';

  constructor(public renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderer.setStyle(this.expandWrapper.nativeElement, 'max-height', this.expandHeight);
  }
}
