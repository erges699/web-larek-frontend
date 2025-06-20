import { IOrder } from "../../types";
import { Component } from "../base/Component"; 
import { IEvents } from '../base/events';
import { Form } from "../Form";
 

export class FormContacts<IOrder>  extends Form<IOrder> {
    protected _emailInput: HTMLInputElement;
	protected _phoneInput: HTMLInputElement;
    protected events: IEvents;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container, events);

		this._emailInput = container.querySelector('input[name="email"]');
		this._phoneInput = container.querySelector('input[name="phone"]');
    }

	set email(value: string) {
        console.log('formContacts: email =', value);
        this._emailInput.value = value;
	}

	set phone(value: string) {
        console.log('formContacts: phone =', value);
        this._phoneInput.value = value;
	}
}