//import validate from "validate.js";
import { IProductItem, IProductsData } from "../types";
import { IEvents } from "./base/events";


export class ProductsData implements IProductsData{
    protected _items: IProductItem[];
    protected _preview: string | null;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    set items(items: IProductItem[]) {
        this._items = items;
        this.events.emit('items:changed');
    };

    get items () {
        return this._items;
    }

    getProduct(productId: string): IProductItem {
        return this.items.find((item) => item.id === productId);
    };

    set preview(productId: string | null) {
        if (!productId) {
            this._preview = null;
            return;
        }
        const selectedCard = this.getProduct(productId);
        if (selectedCard) {
            this._preview = productId;
            this.events.emit('product:selected')
        }    
    };
}
