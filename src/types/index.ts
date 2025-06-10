export interface IProductItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IBasket {
	items: string[];
	total: number;
}

export type PaymentMethod = 'cash' | 'card';

export interface IOrder {
	payment: PaymentMethod;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
	id: string;
}

export interface IProductsData {
	items: 	IProductItem[];
	preview: string | null;
	getProduct(productId: string): IProductItem;
}

export interface IOrderData {
	basket: IBasket;
	order: TOrder;
	isInBasket(item: IProductItem): boolean;
	addToBasket(item: IProductItem): void;
	removeFromBasket(item: IProductItem): void;
	clearBasket(): void;
	createOrderToPost(): IOrder;
	setOrderField(): void;
	clearOrder(): void;
	checkFormFieldValidation(): boolean;
}

export type TOrder = Omit<IOrder, 'id' | 'items' | 'total'>;

export type TOrderResult = Pick<IOrder, 'id' | 'total'>;

export type TPaymentForm = Pick<IOrder, 'payment' | 'address'>;

export type TContactForm = Pick<IOrder, 'email' | 'phone'>;

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}