import { json, type V2_MetaFunction } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import { getProducts } from '~/api.server';
import Button from '~/components/Button';
import ErrorComp from '~/components/ErrorComp';
import HorizontalProduct from '~/components/HorizontalProduct';
import VerticalProduct from '~/components/VerticalProduct';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export async function loader() {
  // request the initial page data here
  try {
    const initialUrl = process.env.ALL_PRODUCTS_API_INITIAL_URL as string;
    const data = await getProducts({ nextUrl: initialUrl });
    return json({
      verticalProducts: data.products,
      horizontalProducts: data.horizontalProducts,
      // keep track of page and its url so we can go back and forth
      nextUrl: data.nextUrl,
      currUrl: initialUrl,
      page: 0,
    });
  } catch (error) {
    console.error(error);
    throw new Response(JSON.stringify({ error: 'Failed to load products' }), {
      status: 500,
    });
  }
}

export default function Index() {
  const initialData = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof loader>();

  const [data, setData] = useState(initialData);
  const { verticalProducts, nextUrl, currUrl, page } = data;
  const { horizontalProducts } = initialData;

  // keep track of page and its url so we can go back and forth
  const pageToUrl = useRef(new Map([[page, currUrl]]));

  useEffect(() => {
    pageToUrl.current.set(page, currUrl);
  }, [page, currUrl]);

  const isLoading = fetcher.state === 'submitting' || fetcher.state === 'loading';

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (fetcher.data) {
      setData(fetcher.data);
    }
  }, [fetcher, isLoading]);

  const fetchNextPage = () => {
    const newPage = page + 1;
    fetcher.load(`products/?page=${newPage}&nextUrl=${nextUrl}`);
  };

  const fetchPrevPage = async () => {
    const newPage = page - 1;
    const _nextUrl = pageToUrl.current.get(newPage);
    fetcher.load(`products/?page=${newPage}&nextUrl=${_nextUrl}`);
  };

  const nextDisabled = !nextUrl || isLoading;
  const prevDisabled = page === 0 || isLoading;

  return (
    <div className="w-full">
      <h1 className="text-center font-bold text-lg my-2">Products</h1>
      <hr className="my-2" />

      <div className="flex gap-1 flex-wrap justify-center">
        {horizontalProducts.map((product) => (
          <HorizontalProduct key={product.code} product={product} />
        ))}
      </div>
      <hr className="my-2" />
      {fetcher.state === 'submitting' || fetcher.state === 'loading' ? (
        <div className="grid place-items-center w-[400px] h-[800px] mx-auto">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 w-[400px] mx-auto">
          {verticalProducts.map((product) => (
            <VerticalProduct key={product.code} product={product} />
          ))}
        </div>
      )}
      <hr className="my-2" />

      <div className="flex gap-1 mx-auto w-[200px] justify-around">
        <Button disabled={prevDisabled} onClick={() => fetchPrevPage()}>
          Geri
        </Button>
        <Button disabled={nextDisabled} onClick={() => fetchNextPage()}>
          İleri
        </Button>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  return <ErrorComp />;
}
