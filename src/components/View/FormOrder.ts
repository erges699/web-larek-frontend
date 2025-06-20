import { TPaymentForm, PaymentMethod } from "../../types";
import { Component } from "../base/Component"; 
import { IEvents } from '../base/events';
import { Form } from "../Form";

//export class FormOrder<TPaymentForm>  extends Form<TPaymentForm> {
export class FormOrder extends Form<TPaymentForm> {
    protected addressInput: HTMLInputElement;
    protected paymentMethod: PaymentMethod = null;
    protected cashButton: HTMLButtonElement;
    protected cardButton: HTMLButtonElement;
    protected events: IEvents;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container, events);

        this.addressInput = container.querySelector('input[name="address"]');
        this.cardButton = container.querySelector('button[name="card"]');
        this.cashButton = container.querySelector('button[name="cash"]');

        this.cardButton.addEventListener('click', () => {
            this.cashButton.classList.remove('button_alt-active');
            this.cardButton.classList.add('button_alt-active');
            this.paymentMethod = 'card';
            this.events.emit(
                `form: ${this.formName}.change`,
                { field: 'payment', value: this.paymentMethod }
            );
        });

        this.cashButton.addEventListener('click', () => {
            this.cardButton.classList.remove('button_alt-active');
            this.cashButton.classList.add('button_alt-active');
            this.paymentMethod = 'cash';
            this.events.emit(
                `form: ${this.formName}.change`,
                { field: 'payment', value: this.paymentMethod }
            );
        });
    }

    set address(value: string) {
        //console.log('formOrder: address =', value);
        this.addressInput.value = value;
    }

    set payment(method: PaymentMethod) {
        //console.log('formOrder: payment =', method);
        this.paymentMethod = method;
    }

}