//import validate from "validate.js";
import { IProductItem, IProductsData } from "../types";
import { IEvents } from "./base/events";


export class ProductsData implements IProductsData{
    protected _items: IProductItem[];
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    set items(items: IProductItem[]) {
        this._items = items;
    };

    get items () {
        return this._items;
    }

    getProduct(productId: string) {
        return this._items.find((item) => item.id === productId);
    };
}
