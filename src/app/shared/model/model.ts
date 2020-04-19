export interface PRODUCT {
  name: string;
  id: number;
  sellingPrice: number;
  discount: number;
  img: string;
  count: number;
  discountPrice?: number;
}

export interface ADDEDPRODUCT {
  product: PRODUCT;
  count: number;
  totalPrice: number;
  totalDiscount: number;
}

export interface CARTDETAILS {
  porduct: ADDEDPRODUCT[];
  count: number;
  totalPayable: number;
  netDiscount: number;
}
