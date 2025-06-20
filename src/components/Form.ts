import { Component } from "./base/Component"; 
import { IEvents } from './base/events';

export interface IFormState {
    valid?: boolean;
    errors?: string[];
}

export class Form<T> extends Component<IFormState> {
    protected formSubmit: HTMLButtonElement;
    protected formErrors: HTMLElement;
    protected formName: string;
    protected events: IEvents;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;
        this.formName = this.container.getAttribute('name')+'Form';

        this.formSubmit = this.container.querySelector('button[type=submit]');
        this.formErrors = this.container.querySelector('.form__errors');

        this.container.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const field = target.name as keyof T;
            const value = target.value;
            this.onInputChange(field, value);
        });

        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.events.emit(`${this.formName}:submit`);
        });
    }

    protected onInputChange(field: keyof T, value: string) {
        this.events.emit(`${this.formName}.${String(field)}:change`, {
            field,
            value
        });
    }
    
    set valid(value: boolean) {
        console.log(`${this.formName}: order: валидация — Valid:`, value);
        this.formSubmit.disabled = !value;
    }

    set errors(value: string) {
        console.log(`${this.formName}: ошибочки:`, value);
        this.setText(this.formErrors, value);
    }

    render(state: Partial<T> & IFormState) {
        const {valid, errors, ...inputs} = state;
        super.render({valid, errors});
        Object.assign(this, inputs);
        return this.container;

    }

}