import { Component } from "../base/Component";
import { IEvents } from '../base/events';

interface ICardsCatalog {
    catalog: HTMLElement[];
}

export class CardsCatalog extends Component<ICardsCatalog> {
    protected _catalog: HTMLElement;
    protected events: IEvents;
	protected headerBasket: HTMLElement;
	protected headerBasketCounter: HTMLSpanElement;
	protected gallery: HTMLMediaElement;    
	protected modal: HTMLElement;
	protected modalTemplate: HTMLElement;
	protected wrapper: HTMLElement;    

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

		this.wrapper = this.container.querySelector('.page__wrapper');
		this.headerBasket = this.container.querySelector('.header__basket');
		this._catalog = this.container.querySelector('.gallery');
		this.headerBasketCounter = this.container.querySelector(
			'.header__basket-counter'
		);

		this.headerBasket.addEventListener('click', () => {
			this.events.emit('basket:open');
		});        
    }

    set catalog(items: HTMLElement[]) {
        this._catalog.replaceChildren(...items);
    }

	set basketCounter(count: number) {
		this.headerBasketCounter.textContent = String(count);
	}

	set scrollLock(value: boolean) {
		if (value) {
			this.wrapper.classList.add('page__wrapper_locked');
		} else {
			this.wrapper.classList.remove('page__wrapper_locked');
		}
	}    
}