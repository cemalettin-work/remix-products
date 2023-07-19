import { getTRCurrency, splitTRFraction } from '~/utils';

export default function Price({ price, className }: { price: number; className: string }) {
  const priceStr = getTRCurrency(price);
  const splitted = splitTRFraction(priceStr);
  return (
    <div className={className}>
      <span className="text-lg font-bold">{splitted.integer}</span>
      <span className="text-xs">,{splitted.fraction}</span>
    </div>
  );
}
