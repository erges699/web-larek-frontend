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

    getProduct(itemId: string) {
        return this._items.find((item) => item.id === itemId);
    };

    set preview(itemId: string | null) {
        if (!itemId) {
            this._preview = null;
            return;
        }
        const selectedCard = this.getProduct(itemId);
        if (selectedCard) {
            this._preview = itemId;
            this.events.emit('product:selected')
        }    
    };
}
