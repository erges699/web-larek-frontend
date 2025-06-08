export interface IProductItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

interface IBasket {
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

export interface IProductData {
	total: number;
	items: 	IProductItem[];
	preview: IProductItem | null;
	getProduct(productId: string): IProductItem;
	setProductList(items: IProductItem[]): void;
	setPreview(item: IProductItem): void;
}

export interface IOrderData {
	basket: IBasket;
	order: TOrder;
	getIsInBasket(item: IProductItem): IProductItem;
	addToBasket(item: IProductItem): void;
	removeFromBasket(item: IProductItem): void;
	clearBasket(): void;
	setOrderPayment(method: PaymentMethod): void;
	clearOrder(): void;
	checkPaymentValidation(data: Record<keyof TPaymentForm, string>): boolean;
	checkContactValidation(data: Record<keyof TContactForm, string>): boolean;
}

export type TOrder = Omit<IOrder, 'id' | 'items' | 'total'>;
export type TOrderResult = Pick<IOrder, 'id' | 'total'>;
export type TPaymentForm = Pick<IOrder, 'payment' | 'address'>;
export type TContactForm = Pick<IOrder, 'email' | 'phone'>;