export interface IProductItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

interface IBasket {
	items: Map<string, number>;
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

export interface IProductList {
	total: number;
	items: 	IProductItem[];
	getProduct(productId: string): IProductItem;
}

export type TOrderResult = Pick<IOrder, 'id' | 'total'>;
export type TPaymentForm = Pick<IOrder, 'payment' | 'address'>;
export type TContactForm = Pick<IOrder, 'email' | 'phone'>;