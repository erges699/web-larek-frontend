import { IProductItem} from "../../types";
import { Component } from "../base/Component"; 
import { IEvents } from '../base/events';
import { categories } from '../../utils/constants';
import { cloneTemplate } from '../../utils/utils';

interface IColors {
	[key: string]: string;
}

export class Card extends Component<IProductItem> {
    protected events: IEvents;
    protected cardTitle: HTMLElement;
	protected cardImage?: HTMLImageElement;
	protected cardPrice: HTMLElement;
	protected cardCategory?: HTMLElement;
	protected cardAddToBusketButton?: HTMLButtonElement;
	protected cardId: string;

	protected colors: IColors = {
		'софт-скил': 'card__category card__category_soft',
		'другое': 'card__category card__category_other',
		'дополнительное': 'card__category card__category_additional',
		'кнопка': 'card__category card__category_button',
		'хард-скил': 'card__category card__category_hard',
	};
    
	constructor(protected container: HTMLElement, events: IEvents) {
		super(container);
        this.events = events;

		this.cardImage = this.container.querySelector('.card__image');
		this.cardCategory = this.container.querySelector('.card__category');
		this.cardTitle = this.container.querySelector('.card__title');
		this.cardPrice = this.container.querySelector('.card__price');
		this.cardAddToBusketButton = null;
	}

	set id(id) {
		this.cardId = id;
	}

	get id() {
		return this.cardId;
	}

	set title(value: string) {
		this.cardTitle.textContent = value;
	}

	set price(value: number | null) {
		this.cardPrice.textContent = value ? String(value) + ' синапсов' : 'Бесценно';
	}

	set category(value: string) {
		this.cardCategory.textContent = value;
		this.cardCategory.className = this.colors[value];
	}

	set image(value: string) {
		this.cardImage.src = value;
	}
	
	set inBasket(value: boolean) {
		if (value) {
			this.cardAddToBusketButton.disabled = !value;
			this.cardAddToBusketButton.textContent = 'Уже в корзине';
		} else {
			this.cardAddToBusketButton.disabled = value;
			this.cardAddToBusketButton.textContent = 'В корзинКу';			
		}
    }
}

export class CardCatalog extends Card {
	protected cardAddToBusketButton?: HTMLButtonElement;
	protected cardDescription?: HTMLElement;
	protected events: IEvents;
    
	constructor(protected container: HTMLElement, events: IEvents) {
		super(container, events);

		this.container.addEventListener('click', () =>
			this.events.emit('card:preview', { card: this }));
	}

}


export class CardPreview extends Card {
	protected cardAddToBusketButton?: HTMLButtonElement;
	protected cardDescription?: HTMLElement;
	protected events: IEvents;
    
	constructor(protected container: HTMLElement, events: IEvents) {
		super(container, events);

		this.cardDescription = this.container.querySelector('.card__text');	
		this.cardAddToBusketButton = this.container.querySelector('.card__button');

		this.cardAddToBusketButton.addEventListener('click', () =>
			this.events.emit('busket:add', { card: this }));
	}

	set description(value: string) {
		this.cardDescription.textContent = value;
	}


}

export class CardBasket extends Card {
    protected events: IEvents;
	protected cardDelFromBusketButton?: HTMLButtonElement;
	protected cardBusketIndex?: HTMLElement;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container, events);

		this.cardBusketIndex = this.container.querySelector('.basket__item-index');	
		this.cardDelFromBusketButton = this.container.querySelector('.basket__item-delete');

		this.cardDelFromBusketButton.addEventListener('click', () =>
			this.events.emit('busket:delete', { card: this }));

	}

    set busketIndex(value: number) {
		this.cardBusketIndex.textContent = String(value);
    }
}