import { Component, Input, Output, OnInit, ComponentRef, ElementRef, ViewChild, Renderer, EventEmitter, OnDestroy, AfterViewInit, ViewContainerRef } from '@angular/core';
import { GridStackItem } from './../models/grid-stack-item.model';
declare var jQuery: any;
declare var _: any;
@Component({
  selector: 'ngx-grid-stack-item',
  templateUrl: './grid-stack-item.component.html',
  styleUrls: ['./grid-stack-item.component.css']
})
export class GridStackItemComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('contentPlaceholder', { read: ViewContainerRef }) contentPlaceholder: ViewContainerRef;
  @Input() contentTemplate: string;
  @Input() option: GridStackItem;
  @Output() GridConfigurationChanged = new EventEmitter<GridStackItem>();

  contentComponentRef: ComponentRef<any> = null;
  jGridRef: any = null;
  public jWidgetRef: any = null;

  constructor(private el: ElementRef, private renderer: Renderer) {
    this.jWidgetRef = el.nativeElement;
  }
  get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }
  ngOnInit() {
    this.RenderWidget(null);
  }

  UpdateWidget(item: GridStackItem) {}
  RenderWidget(item: GridStackItem) {
    const renderer = this.renderer;
    if (item != null) {
      this.option = item;
    }

    this.renderer.setElementAttribute(this.nativeElement, 'style', 'margin-left:' + this.option.marginWidth + ';');
    this.renderer.setElementAttribute(this.nativeElement, 'data-gs-x', String(this.option.x));
    this.renderer.setElementAttribute(this.nativeElement, 'data-gs-y', String(this.option.y));
    this.renderer.setElementAttribute(this.nativeElement, 'data-gs-width', String(this.option.width));
    this.renderer.setElementAttribute(this.nativeElement, 'data-gs-height', String(this.option.height));
    if (this.option.minWidth) {
      renderer.setElementAttribute(this.nativeElement, 'data-gs-min-width', String(this.option.minWidth));
    }
    if (this.option.maxHeight) {
      renderer.setElementAttribute(this.nativeElement, 'data-gs-max-height', String(this.option.maxHeight));
    }
    if (this.option.maxWidth) {
      renderer.setElementAttribute(this.nativeElement, 'data-gs-max-width', String(this.option.maxWidth));
    }
    if (this.option.minHeight) {
      renderer.setElementAttribute(this.nativeElement, 'data-gs-min-height', String(this.option.minHeight));
    }

    if (this.option.noResize != null && this.option.noResize === true) {
      renderer.setElementAttribute(this.nativeElement, 'data-gs-no-resize', 'yes');
    }
  }

  update(x: number, y: number, width: number, height: number): void {
    // console.log('here');
    if (x === this.option.x && y === this.option.y && width === this.option.width && height === this.option.height) {
      return;
    }

    if (this.option != null) {
      this.option.x = x;
      this.option.y = y;
      this.option.width = width;
      this.option.height = height;

      const optionNew = GridStackItem.Clone(this.option);
      this.GridConfigurationChanged.emit(optionNew);
    }
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    if (this.contentComponentRef !== null) {
      this.contentComponentRef.destroy();
    }
  }
}
