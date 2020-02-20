import {
  Component, Input, Output, OnInit, ComponentRef, ElementRef, ViewChild,
  EventEmitter, OnDestroy, AfterViewInit, ViewContainerRef, Renderer2
} from '@angular/core';
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

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.jWidgetRef = el.nativeElement;
  }
  get nativeElement(): HTMLElement {
    return this.el.nativeElement;
  }
  ngOnInit() {
    this.RenderWidget(null);
  }

  UpdateWidget(item: GridStackItem) { }
  RenderWidget(item: GridStackItem) {
    const renderer = this.renderer;
    if (item != null) {
      this.option = item;
    }

    __ngRendererSetElementAttributeHelper(this.renderer, this.nativeElement, 'style', 'margin-left:' + this.option.marginWidth + ';');
    __ngRendererSetElementAttributeHelper(this.renderer, this.nativeElement, 'data-gs-x', String(this.option.x));
    __ngRendererSetElementAttributeHelper(this.renderer, this.nativeElement, 'data-gs-y', String(this.option.y));
    __ngRendererSetElementAttributeHelper(this.renderer, this.nativeElement, 'data-gs-width', String(this.option.width));
    __ngRendererSetElementAttributeHelper(this.renderer, this.nativeElement, 'data-gs-height', String(this.option.height));

    if (this.option.minWidth) {
      __ngRendererSetElementAttributeHelper(renderer, this.nativeElement, 'data-gs-min-width', String(this.option.minWidth));
    }

    if (this.option.maxHeight) {
      __ngRendererSetElementAttributeHelper(renderer, this.nativeElement, 'data-gs-max-height', String(this.option.maxHeight));
    }

    if (this.option.maxWidth) {
      __ngRendererSetElementAttributeHelper(renderer, this.nativeElement, 'data-gs-max-width', String(this.option.maxWidth));
    }

    if (this.option.minHeight) {
      __ngRendererSetElementAttributeHelper(renderer, this.nativeElement, 'data-gs-min-height', String(this.option.minHeight));
    }

    if (this.option.noResize != null && this.option.noResize === true) {
      __ngRendererSetElementAttributeHelper(renderer, this.nativeElement, 'data-gs-no-resize', 'yes');
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

  ngAfterViewInit(): void { }

  ngOnDestroy(): void {
    if (this.contentComponentRef !== null) {
      this.contentComponentRef.destroy();
    }
  }
}

type AnyDuringRendererMigration = any;

function __ngRendererSplitNamespaceHelper(name: AnyDuringRendererMigration) {
  if (name[0] === ':') {
    const match = name.match(/^:([^:]+):(.+)$/);
    return [match[1], match[2]];
  }
  return ['', name];
}

function __ngRendererSetElementAttributeHelper(
  renderer: AnyDuringRendererMigration,
  element: AnyDuringRendererMigration,
  namespaceAndName: AnyDuringRendererMigration,
  value?: AnyDuringRendererMigration) {
  const [namespace, name] = __ngRendererSplitNamespaceHelper(namespaceAndName);
  if (value != null) {
    renderer.setAttribute(element, name, value, namespace);
  } else {
    renderer.removeAttribute(element, name, namespace);
  }
}
