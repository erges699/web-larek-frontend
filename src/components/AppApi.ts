import { IApi, IProductItem, IOrder, TOrderResult } from "../types";

export class AppAPI {
  private _baseApi: IApi;

  constructor(baseApi: IApi) {
    this._baseApi = baseApi;
  };

  getProductList(): Promise<IProductItem[]> {
    return this._baseApi
      .get<IProductItem[]>(`/product`)
      .then((items: IProductItem[]) => items);
  }

  getProduct(productId: string): Promise<IProductItem> {
    return this._baseApi
      .get<IProductItem>(`/product/${productId}`)
      .then((item: IProductItem) => item);
  }

  createOrder(order: IOrder): Promise<TOrderResult> {
    return this._baseApi
      .post<IOrder>(`/order`, order)
      .then((data: TOrderResult) => data);
  }
}