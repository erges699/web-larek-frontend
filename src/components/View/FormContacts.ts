import { TContactForm } from "../../types";
import { Component } from "../base/Component"; 
import { IEvents } from '../base/events';
import { Form } from "../Form";
 
//export class FormContacts<TContactForm>  extends Form<TContactForm> {
export class FormContacts extends Form<TContactForm> {
    protected emailInput: HTMLInputElement;
	protected phoneInput: HTMLInputElement;
    protected events: IEvents;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container, events);

		this.emailInput = container.querySelector('input[name="email"]');
		this.phoneInput = container.querySelector('input[name="phone"]');
    }

	set email(value: string) {
        console.log('formContacts: email =', value);
        this.emailInput.value = value;
	}

	set phone(value: string) {
        console.log('formContacts: phone =', value);
        this.phoneInput.value = value;
	}
}