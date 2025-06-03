interface IProductItem {
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

type PaymentMethod = 'cash' | 'card';

interface IOrder {
	payment: PaymentMethod;
	email: string;
	phone: string;
	address: string;
	items: string[];
	total: number;
}

