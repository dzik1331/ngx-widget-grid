import {Component, Input, ElementRef, Output, EventEmitter, OnDestroy, Inject, forwardRef} from "@angular/core";
import {WidgetConfig} from "../../models/WidgetConfig.model";
import {GridRectangle} from "../../models/GridRectangle.model";
import {ResizeDirections, AllDirections} from "../../Utils";
@Component({
    selector: 'ngx-widget',
    styleUrls: ['./widget.component.css'],
    templateUrl: './widget.component.html'
})
export class NgxWidgetComponent {
    constructor(private elRef: ElementRef) {
        this.widgetConfig = new WidgetConfig(this.position);
    }

    public _position: GridRectangle;
    @Input()
    set position(position: GridRectangle) {
        this._position = position;
        this.widgetConfig.position = position;
        this.positionChange.emit(position);
    };

    get position(): GridRectangle {
        return this._position;
    }

    @Output()
    positionChange: EventEmitter<GridRectangle> = new EventEmitter();

    @Input() movable: boolean = false;

    public _resizable: boolean = false;
    @Input()
    set resizable(resizable: boolean) {
        this._resizable = resizable;
        if (resizable) {
            this.setResizeDirections();
        }
    }

    get resizable() {
        return this._resizable;
    }

    public allDirections: any = ResizeDirections;

    public _resizeDirections: string[] = AllDirections;
    public isTopResizable: boolean = false;
    public isRightResizable: boolean = false;
    public isBottomResizable: boolean = false;
    public isLeftResizable: boolean = false;
    public isTopRightResizable: boolean = false;
    public isTopLeftResizable: boolean = false;
    public isBottomRightResizable: boolean = false;
    public isBottomLeftResizable: boolean = false;

    @Input()
    set resizeDirections(dirs: string[]) {
        this._resizeDirections = dirs.filter((dir: string) => {
            return AllDirections.indexOf(dir.toUpperCase()) !== -1;
        });
        this.setResizeDirections();
    }

    setResizeDirections() {
        this.isTopResizable = false;
        this.isRightResizable = false;
        this.isBottomResizable = false;
        this.isLeftResizable = false;
        this.isTopRightResizable = false;
        this.isTopLeftResizable = false;
        this.isBottomRightResizable = false;
        this.isBottomLeftResizable = false;
        this._resizeDirections.forEach((dir) => {
            switch (dir) {
                case ResizeDirections.top:
                    this.isTopResizable = true;
                    break;
                case ResizeDirections.left:
                    this.isLeftResizable = true;
                    break;
                case ResizeDirections.bottom:
                    this.isBottomResizable = true;
                    break;
                case ResizeDirections.right:
                    this.isRightResizable = true;
                    break;
                case ResizeDirections.topLeft:
                    this.isTopLeftResizable = true;
                    break;
                case ResizeDirections.topRight:
                    this.isTopRightResizable = true;
                    break;
                case ResizeDirections.bottomLeft:
                    this.isBottomLeftResizable = true;
                    break;
                case ResizeDirections.bottomRight:
                    this.isBottomRightResizable = true;
                    break;
                default:
            }
        });
    }

    get resizeDirections() {
        return this._resizeDirections;
    }

    public widgetConfig: WidgetConfig;


    getConfig(): WidgetConfig {
        return this.widgetConfig;
    }

    getEl(): ElementRef {
        return this.elRef;
    }
}
