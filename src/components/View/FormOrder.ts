import { IOrder, PaymentMethod } from "../../types";
import { Component } from "../base/Component"; 
import { IEvents } from '../base/events';
import { Form } from "../Form";

export class FormOrder<IOrder>  extends Form<IOrder> {
    protected _addressInput: HTMLInputElement;
    protected _paymentMethod: PaymentMethod = null;
    protected _cashButton: HTMLButtonElement;
    protected _cardButton: HTMLButtonElement;
    protected events: IEvents;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container, events);

        this._addressInput = container.querySelector('input[name="address"]');
        this._cardButton = container.querySelector('button[name="card"]');
        this._cashButton = container.querySelector('button[name="cash"]');

        this._cardButton.addEventListener('click', () => {
            this._cashButton.classList.remove('button_alt-active');
            this._cardButton.classList.add('button_alt-active');
            this._paymentMethod = 'card';
            this.events.emit(
                `form: ${this._formName}.change`,
                { field: 'payment', value: this._paymentMethod }
            );
        });

        this._cashButton.addEventListener('click', () => {
            this._cardButton.classList.remove('button_alt-active');
            this._cashButton.classList.add('button_alt-active');
            this._paymentMethod = 'cash';
            this.events.emit(
                `form: ${this._formName}.change`,
                { field: 'payment', value: this._paymentMethod }
            );
        });
    }

    set address(value: string) {
        console.log('formOrder: address =', value);
        this._addressInput.value = value;
    }

    set payment(method: PaymentMethod) {
        console.log('formOrder: payment =', method);
        this._paymentMethod = method;
    }

}