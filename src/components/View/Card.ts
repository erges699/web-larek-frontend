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

	set title(title: string) {
		this.cardTitle.textContent = title;
	}

	set price(price: number | null) {
		this.cardPrice.textContent = price ? String(price) + ' синапсов' : 'Бесценно';
	}

	set category(category: string) {
		this.cardCategory.textContent = category;
		this.cardCategory.className = this.colors[category];
	}

	set description(description: string) {
		this.cardDescription.textContent = description;
	}

	set image(image: string) {
		this.cardImage.src = image;
	}

    set busketIndex(value: number) {
        if (this.cardBusketIndex) { 
            console.log(value);
            this.cardBusketIndex.textContent = String(value);
        }
    }
}