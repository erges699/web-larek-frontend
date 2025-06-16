import { IProductItem} from "../../types";
import { Component } from "../base/Component"; 
import { IEvents } from '../base/events';
import { categories } from '../../utils/constants';
import { cloneTemplate } from '../../utils/utils';

interface IColors {
	[key: string]: string;
}

//interface ICardActions {
//    onClick: (event: MouseEvent) => void;
//}

export class Card extends Component<IProductItem> {
    protected events: IEvents;
    protected cardTitle: HTMLElement;
	protected cardImage?: HTMLImageElement;
	protected cardPrice: HTMLElement;
	protected cardCategory?: HTMLElement;
	protected cardButton?: HTMLButtonElement;
	protected cardDescription?: HTMLElement;
	protected cardId: string;

	protected colors: IColors = {
		'софт-скил': 'card__category card__category_soft',
		другое: 'card__category card__category_other',
		дополнительное: 'card__category card__category_additional',
		кнопка: 'card__category card__category_button',
		'хард-скил': 'card__category card__category_hard',
	};
    
	constructor(protected container: HTMLElement, events: IEvents) {
    //, actions?: ICardActions
		super(container);
        this.events = events;

		this.cardTitle = this.container.querySelector('.card__title');
		this.cardImage = this.container.querySelector('.card__image');
		this.cardPrice = this.container.querySelector('.card__price');
		this.cardCategory = this.container.querySelector('.card__category');
		this.cardButton = this.container.querySelector('.card__button');
		this.cardDescription = this.container.querySelector('.card__text');

        //if (actions?.onClick) {
        //    if (this.cardButton) {
        //        this.cardButton.addEventListener('click', actions.onClick);
        //    } else {
        //        container.addEventListener('click', actions.onClick);
        //    }
        //}
		if (this.cardButton) {
			this.cardButton.addEventListener('click', () =>
				this.events.emit('button:select', { button: this})
			);
		} else {
			this.container.addEventListener('click', () =>
				this.events.emit('card:select', { card: this})
			);
		}
    }

	render(data?: Partial<IProductItem>): HTMLElement;
	render(cardData: Partial<IProductItem>, title: string, price: number | null ): HTMLElement;

    render(cardData: Partial<IProductItem> | undefined) {
        if (!cardData) return this.container;

        const { title, price, ...otherCardData } = cardData;
        return super.render(otherCardData);
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
}