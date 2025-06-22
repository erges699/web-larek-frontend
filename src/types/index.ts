export interface IProductItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
	busketIndex: number;
	inBusket: boolean;
}

export type PaymentMethod = 'cash' | 'card';

export interface IOrder {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
	id?: string;
}

export interface IOrderResult {
	id?: string;
	total: number;
}

export interface IProductsData {
	items: 	IProductItem[];
	getProduct(productId: string): IProductItem;
}

export interface IOrderData {
	items: 	IProductItem[];
	total: number | null;
	order: TOrder;
	isInBasket(itemId: string): boolean;
	addToBasket(item: IProductItem): void;
	removeFromBasket(productId: string): void;
	clearBasket(): void;
	countPrices(): number; 
	countBasketAmount(): number;
	setOrderField(field: keyof TOrder, value: string): void;
	clearOrder(): void;
	orderContactsValidation(): boolean;
	orderFormValidation(): boolean;
}

export type TOrder = Omit<IOrder, 'id' | 'items' | 'total'>;

export type TPaymentForm = Pick<IOrder, 'payment' | 'address'>;

export type TContactForm = Pick<IOrder, 'email' | 'phone'>;

export type TForm = Pick<IOrder, 'email' | 'phone' | 'payment' | 'address'>;

//export type TFormErrors = Record<keyof TPaymentForm | keyof TContactForm, string>;
export type TFormErrors = Partial<Record<keyof IOrder, string>>;

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}
