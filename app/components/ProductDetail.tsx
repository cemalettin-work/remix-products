import StarIcon from './StarIcon';
import Price from './Price';

export default function ProductDetail({ productDetail }: { productDetail: ProductDetailType }) {
  const numOfStars = Math.round(productDetail.rating);

  return (
    <div className="flex flex-col gap-1 w-[350px] mx-auto border-2 rounded p-2 border-gray-400 shadow-md">
      <div className="flex justify-between">
        <span className="text-gray-400 text-sm">{productDetail.mkName}</span>
        <span className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => {
            if (i < numOfStars) {
              return <StarIcon key={i} stroke="gray" fill="gold" />;
            }
            return <StarIcon key={i} stroke="gray" fill="none" />;
          })}
        </span>
      </div>
      <div>{productDetail.productName}</div>
      <div className="text-sm bg-yellow-100 w-max px-1 font-bold">{productDetail.badge}</div>
      <img src={productDetail.imageUrl} alt={productDetail.productName} className="w-[150px] mx-auto " />
      <div className="text-center text-sm font-bold">Kapasite Seçenekleri</div>
      <div className="flex justify-around">
        {productDetail.storageOptions.map((storageOption) => (
          <div className="border-2 px-2 py-1" key={storageOption}>
            {storageOption}
          </div>
        ))}
      </div>
      <div className="text-center text-xs font-bold">
        {productDetail.countOfPrices} satıcı içinde kargo dahil en ucuz fiyat seçeneği
      </div>
      <Price className="text-center" price={productDetail.price} />
      {productDetail.freeShipping ? <div className="text-center text-green-300 text-xs">Ücretsiz Kargo</div> : null}
      <div className="text-center text-xs text-gray-500">Son güncelleme: {productDetail.lastUpdate}</div>
    </div>
  );
}
