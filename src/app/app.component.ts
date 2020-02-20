import { Component, OnInit, ViewChildren, QueryList, ViewChild, ChangeDetectorRef } from '@angular/core';
import { GridStackOptions } from './../../projects/grid-stack/src/lib/models/grid-stack-options.model';
import { GridStackItem } from './../../projects/grid-stack/src/lib/models/grid-stack-item.model';
import { GridStackComponent } from './../../projects/grid-stack/src/lib/grid-stack/grid-stack.component';
import { GridStackItemComponent} from './../../projects/grid-stack/src/lib/grid-stack-item/grid-stack-item.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChildren(GridStackItemComponent) items: QueryList<GridStackItemComponent>;
  @ViewChild('gridStackMain', { static: true }) gridStackMain: GridStackComponent;
  options: GridStackOptions = new GridStackOptions();
  widget1 = {
    x: 0,
    y: 0,
    height: 6,
    width: 6
  };

  widget2 = {
    x: 6,
    y: 0,
    height: 6,
    width: 6
  };

  widgets: GridStackItem[] = [];
  constructor(private cd: ChangeDetectorRef) {}

  AddWidget() {
      const widgetItem = new GridStackItem();

      // widgetItem.width = 6;
      // widgetItem.height = 4;
      widgetItem.x = 0;
      widgetItem.y = 0;
      widgetItem.customId = this.widgets.length.toString();
      widgetItem.minHeight = 4;
      widgetItem.minWidth = 6;
      // widgetItem.maxHeight = 4;
      // widgetItem.maxWidth = 6;
      this.widgets.push(widgetItem);
      this.cd.detectChanges();
      const arr = this.items.toArray();
      this.gridStackMain.AddWidget(arr[this.items.length - 1]);

      for (let index = 0; index < arr.length; index++) {
        const widget = arr[index];
        const widgitInitialized = widget.nativeElement.getAttribute('data-gs-init');
        const hasDraggable = widget.nativeElement.classList.contains('ui-draggable');

        if (widgitInitialized !== 'true' && !hasDraggable) {
          widget.nativeElement.setAttribute('data-gs-init', 'true');
          this.gridStackMain.AddWidget(widget);
        } else if (widgitInitialized !== 'true') {
          widget.nativeElement.setAttribute('data-gs-init', 'true');
        }
      }
  }
}
