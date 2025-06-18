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
	protected cardDelFromBusketButton?: HTMLButtonElement;
	protected cardDescription?: HTMLElement;
	protected cardBusketIndex: HTMLElement;
	protected cardId: string;

	protected colors: IColors = {
		'софт-скил': 'card__category card__category_soft',
		другое: 'card__category card__category_other',
		дополнительное: 'card__category card__category_additional',
		кнопка: 'card__category card__category_button',
		'хард-скил': 'card__category card__category_hard',
	};
    
	constructor(protected container: HTMLElement, events: IEvents) {
		super(container);
        this.events = events;

		this.cardImage = this.container.querySelector('.card__image');
		this.cardCategory = this.container.querySelector('.card__category');
		this.cardTitle = this.container.querySelector('.card__title');
		this.cardDescription = this.container.querySelector('.card__text');	
		this.cardPrice = this.container.querySelector('.card__price');
		this.cardBusketIndex = this.container.querySelector('.basket__item-index');	
		this.cardAddToBusketButton = this.container.querySelector('.button');
		this.cardDelFromBusketButton = this.container.querySelector('.basket__item-delete');

		if (this.cardAddToBusketButton) {
			this.cardAddToBusketButton.addEventListener('click', () =>
				this.events.emit('busket:add', { card: this }));
		} else if (this.cardDelFromBusketButton) {
			this.cardDelFromBusketButton.addEventListener('click', () =>
				this.events.emit('busket:delete', { card: this }));
		} else {
			this.container.addEventListener('click', () =>
				this.events.emit('card:preview', { card: this }));
		}	
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

	set description(value: string) {
		this.cardDescription.textContent = value;
	}

	set image(value: string) {
		this.cardImage.src = value;
	}

    set busketIndex(value: number) {
		console.log(value);
		this.cardBusketIndex.textContent = String(value);
    }
    
	set inBasket(value: boolean) {
		if (value) {
			this.setDisabled(this.cardAddToBusketButton, value);
			this.cardAddToBusketButton.textContent = ( value ? 'Уже в корзине' : 'В корзину');
		}
    }

}