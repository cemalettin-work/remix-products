import { json, type LoaderArgs } from '@remix-run/node';
import { getProducts } from '~/api.server';

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const nextUrl = url.searchParams.get('nextUrl') || (process.env.ALL_PRODUCTS_API_INITIAL_URL as string);
  const page = parseInt(url.searchParams.get('page') || '0');

  try {
    const data = await getProducts({ nextUrl });
    return json({
      verticalProducts: data.products,
      horizontalProducts: data.horizontalProducts,
      // keep track of page and its url so we can go back and forth
      nextUrl: data.nextUrl,
      currUrl: nextUrl,
      page,
    });
  } catch (error) {
    console.error(error);
    throw new Response(JSON.stringify({ error: 'Failed to load products' }), {
      status: 500,
    });
  }
}
