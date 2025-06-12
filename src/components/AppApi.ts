import { IApi, IProductItem, IOrder, IOrderResult } from "../types";
import { ApiListResponse } from './base/api';

export class AppAPI {
  private _baseApi: IApi;
  private _cdn: string;

  constructor(baseApi: IApi, cdn: string) {
    this._baseApi = baseApi;
    this._cdn = cdn;
  };

  getProductList(): Promise<IProductItem[]> {
    return this._baseApi
      .get<ApiListResponse<IProductItem>>(`/product`)
      .then((data: ApiListResponse<IProductItem>) => 
        data.items.map((item) => ({
          ...item,
          image: this._cdn + item.image,
        }))
    );
  }

  getProduct(productId: string): Promise<IProductItem> {
    return this._baseApi
      .get<IProductItem>(`/product/${productId}`)
      .then((item: IProductItem) => ({
        ...item,
        image: this._cdn + item.image,
      })
    );   
  }

  createOrder(order: IOrder): Promise<IOrderResult> {
    return this._baseApi
      .post<IOrder>(`/order`, order)
      .then((res:IOrderResult) => res);
  }
}