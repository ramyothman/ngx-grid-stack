# ngx-grid-stack

## Installation

To install this library, run:

```bash
$ npm install ngx-grid-stack --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install ngx-grid-stack
```

Then add reference to the gridstask.js, jquery, jqueryui and lodash to your index.html for how to do it check their site at 
- https://github.com/gridstack/gridstack.js

```html
  <script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
  <script
  src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.10/lodash.min.js"></script>
<script type="text/javascript" src='//cdnjs.cloudflare.com/ajax/libs/gridstack.js/0.4.0/gridstack.min.js'></script>
<script type="text/javascript" src='assets/vendor/gridstack/gridstack.all.js'></script>
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { GridStackModule } from 'grid-stack';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    GridStackModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<ngx-grid-stack class="grid-stack" [options]="options">
  <ngx-grid-stack-item [option]="widget1" class="grid-stack-item"  >
  </ngx-grid-stack-item>
  <ngx-grid-stack-item [option]="widget2" class="grid-stack-item" >
  </ngx-grid-stack-item>
</ngx-grid-stack>
```

If you want to dynamically generate widgets:

```xml
<!-- You can now use your library component in app.component.html -->  <grid-stack #gridStackMain id="gridStackMain" class="grid-stack" [options]="area">
<button (click)="AddWidget()">Add Widget</button>
<ngx-grid-stack #gridStackMain id="gridStackMain" class="grid-stack" [options]="options">
    <ngx-grid-stack-item *ngFor="let widget of widgets" id="widget-{{widget.customId}}" [option]="widget" class="grid-stack-item">
      <div class="widget-header">
        <div class="widget-header-text">Test</div>
      </div>
      <div class="widget-content">

      </div>
	</ngx-grid-stack-item>
</ngx-grid-stack>
```
```typescript
import { Component, OnInit, ViewChildren, QueryList, ViewChild, ChangeDetectorRef } from '@angular/core';
import { GridStackItem, GridStackOptions, GridStackItemComponent, GridStackComponent} from 'grid-stack'

@Component({
  selector: 'app-grid-stack',
  templateUrl: './app-grid-stack.component.html'
})
export class AppComponent {
  @ViewChildren(GridStackItemComponent) items: QueryList<GridStackItemComponent>;
  @ViewChild('gridStackMain') gridStackMain: GridStackComponent;
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

      widgetItem.width = 6;
      widgetItem.height = 4;
      widgetItem.x = 0;
      widgetItem.y = 0;
      widgetItem.customId = this.widgets.length.toString();
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

```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```
## Credit

I was looking for integrating cleanly the amazing gridstack.js (https://github.com/gridstack/gridstack.js) library with angular 4 and found this thread on stack overflow
https://stackoverflow.com/questions/39901473/wrap-gridstack-js-into-angular-2-component
Credit Goes to Answers from those users
https://stackoverflow.com/users/3758236/user3758236
https://stackoverflow.com/users/3112339/etchelon

## License

MIT © [Ramy Othman](mailto:ramy.mostafa@gmail.com)
