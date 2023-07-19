import { json, Response, type LoaderArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { getProductDetail } from '~/api.server';
import ErrorComp from '~/components/ErrorComp';
import ProductDetail from '~/components/ProductDetail';

export async function loader({ params }: LoaderArgs) {
  if (!params.code) {
    throw new Response(JSON.stringify({ error: 'Missing product code' }), { status: 400 });
  }

  try {
    const data = await getProductDetail({ code: parseInt(params.code) });
    return json({ productDetail: data });
  } catch (error) {
    console.error(error);
    throw new Response(JSON.stringify({ error: 'Failed to load product detail' }), {
      status: 500,
    });
  }
}

export default function Index() {
  const { productDetail } = useLoaderData<typeof loader>();

  return (
    <div>
      <Link to="/" className="text-blue-500 hover:underline">
        Home
      </Link>
      <ProductDetail productDetail={productDetail} />
    </div>
  );
}

export function ErrorBoundary() {
  return <ErrorComp />;
}
