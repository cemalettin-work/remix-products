import { json, type V2_MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getProducts } from '~/api.server';
import ErrorComp from '~/components/ErrorComp';

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
    return json({ error: 'Failed to load products' }, { status: 500 });
  }
}

export default function Index() {
  const initialData = useLoaderData<typeof loader>();

  return (
    <div className="w-full mx-auto">
      <pre>{JSON.stringify(initialData, null, 2)}</pre>
    </div>
  );
}

export function ErrorBoundary() {
  return <ErrorComp />;
}
