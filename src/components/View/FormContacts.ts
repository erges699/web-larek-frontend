import { IOrder } from "../../types";
import { Component } from "../base/Component"; 
import { IEvents } from '../base/events';

export interface IFormState {
    valid?: boolean;
    errors?: string;
}

export class FormContacts extends Component<IOrder> {
    protected events: IEvents;

}