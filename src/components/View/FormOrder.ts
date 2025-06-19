import { IOrder } from "../../types";
import { Component } from "../base/Component"; 
import { IEvents } from '../base/events';

export interface IFormState {
    valid?: boolean;
    errors?: string;
}

export class FormOrder extends Component<IOrder> {
    protected events: IEvents;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container);
        this.events = events;
    }

}