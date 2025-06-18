import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IModalData {
	content: HTMLElement;
}

export class Modal <T> extends Component<T> {
    protected modal: HTMLElement;
    protected events: IEvents;
    protected _content: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
      super(container);
      this.events = events;
      this._content = this.container.querySelector('.modal__content');
      const closeButtonElement = this.container.querySelector(".modal__close");
      closeButtonElement.addEventListener("click", this.close.bind(this));
      this.container.addEventListener("mousedown", (evt) => {
        if (evt.target === evt.currentTarget) {
          this.close();
        }
      });
      this.handleEscUp = this.handleEscUp.bind(this);
    }

    set content(value: HTMLElement) {
      this._content.replaceChildren(value);
    }

    open() {
      this.container.classList.add("modal_active");
      document.addEventListener("keyup", this.handleEscUp);
      this.events.emit('modal: cardsCatalog.scrollLock', { lock: true });
    }
  
    close() {
      this.container.classList.remove("modal_active");
      document.removeEventListener("keyup", this.handleEscUp);
      this.events.emit('modal: cardsCatalog.scrollLock', { lock: false });      
    }
  
    handleEscUp (evt: KeyboardEvent) {
        if (evt.key === "Escape") {
          this.close();
        }
      };
  }
  