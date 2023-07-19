import { Link } from '@remix-run/react';
import Price from './Price';

export default function VerticalProduct({ product }: { product: ProductInListType }) {
  return (
    <div className="flex flex-col w-[200px] h-[250px] p-2 m-2">
      <Link className="flex justify-center relative" to={`/products/${product.code}`}>
        <img src={product.imageUrl} alt={product.name} className="h-[150px]" />
        {product.dropRatio ? (
          <div className="absolute top-2 -left-2 rounded-[50%] bg-red-500 text-xs text-white font-bold p-1">
            {product.dropRatio}%
          </div>
        ) : null}
      </Link>
      <div className="text-xs">{product.name}</div>
      <Price price={product.price} className="text-center" />
      <div className="text-xs text-gray-500">
        {product.countOfPrices} satıcı {'>'}
      </div>
      {product.followCount ? <div className="text-xs">{product.followCount} takip</div> : null}
    </div>
  );
}
