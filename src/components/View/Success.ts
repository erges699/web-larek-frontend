import { Component } from "../base/Component"; 
import { IEvents } from '../base/events';

interface ISuccess {
    total: number;
}

export class Success extends Component<ISuccess> {
    protected events: IEvents;
    protected successTitle: HTMLElement;
    protected successDescription: HTMLElement;  
    protected successButton: HTMLButtonElement;      

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.successTitle = this.container.querySelector('.order-success__title');
        this.successDescription = this.container.querySelector('.order-success__description');
        this.successButton = this.container.querySelector('.order-success__close');

        this.successButton.addEventListener('click', () => {
            this.events.emit('success: submit');
        });
    }

    set total(value: number) {
        this.successDescription.textContent = `Списано ${value} синапсов`;
    }
}