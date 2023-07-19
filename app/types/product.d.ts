type ProductInListType = {
  code: number;
  name: string;
  price: number;
  imageUrl: string;
  followCount: number;
  countOfPrices: number;
  dropRatio: number;
};

type ProductDetailType = {
  mkName: string;
  productName: string;
  badge: string;
  rating: number;
  imageUrl: string;
  storageOptions: string[];
  countOfPrices: number;
  price: number;
  freeShipping: boolean;
  lastUpdate: string;
};

type ProductListResponseType = {
  result: {
    products: ProductInListType[];
    horizontalProducts: ProductInListType[];
    nextUrl: string;
  };
};

type ProductDetailResponseType = {
  result: ProductDetailType;
};
