import { Link } from '@remix-run/react';
import Price from './Price';

export default function HorizontalProduct({ product }: { product: ProductInListType }) {
  return (
    <div className="flex w-[300px] h-[150px] p-2 flex-shrink-0">
      <Link to={`/products/${product.code}`} className="relative">
        <img src={product.imageUrl} alt={product.name} className="w-full h-full" />
        <div className="absolute top-2 -right-2 rounded-[50%] bg-red-500 text-xs text-white font-bold p-1">
          {product.dropRatio}%
        </div>
      </Link>
      <div></div>
      <div className="flex flex-col gap-1 ml-4 text-sm">
        <h2 className="font-bold italic text-gray-400 text-xs">{product.name}</h2>
        <Price className="text-left" price={product.price} />
        <div className="text-xs text-gray-500">
          {product.countOfPrices} satıcı {'>'}
        </div>
        <div className="text-xs">{product.followCount} takip</div>
      </div>
    </div>
  );
}
