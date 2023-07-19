import { fetchCustom } from './utils';

export async function getProducts({ nextUrl }: { nextUrl: string }) {
  const data = await fetchCustom<ProductListResponseType>(nextUrl);
  return data.result;
}

export async function getProductDetail({ code }: { code: number }) {
  const data = await fetchCustom<ProductDetailResponseType>(`${process.env.PRODUCT_DETAIL_API_URL}?code=${code}`);
  return data.result;
}
