import { createElement } from "../../utils/utils";
import { Component } from "../base/Component"; 
import { IEvents } from '../base/events';

interface IBasket{
	items: HTMLElement;
	total: number;
}

export class Basket extends Component<IBasket> {
    protected events: IEvents;
    protected busketTitle: HTMLElement;
	protected busketPrice: HTMLElement;
	protected basketList: HTMLElement;    
	protected busketButton: HTMLButtonElement;      

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;
		this.basketList = this.container.querySelector('.basket__list');
		this.busketButton = container.querySelector('.button');
		this.busketPrice = container.querySelector('.basket__price'); 
		if (this.busketButton) {
			this.busketButton.addEventListener('click', () => {
				events.emit('order:open');
			});
		}
        this.busketSet = []               
    } 

    set busketSet(items: HTMLElement[]) {
		if (items.length) {
			this.setDisabled(this.busketButton, false);
			this.basketList.replaceChildren(...items);
		} else {
			this.setDisabled(this.busketButton, true);
			this.basketList.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		}        
    }

	set busketAmount(total: number) {
		this.busketPrice.textContent  = String(total) + ' синапсов';
	}
}