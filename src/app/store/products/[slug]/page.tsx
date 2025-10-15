import { client } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';
import { Product } from '@/sanity/types';
import { notFound } from 'next/navigation';

type Props = {
  params: { 
    slug: string 
  }
}

async function getProduct(slug: string): Promise<Product | null> {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    title,
    price,
    description,
    sku,
    quantity
  }`;

  try {
    const product = await client.fetch(query, { slug });
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }

}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div key={product._id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-gray-600">SKU: {product.sku}</p>
            <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
            <p>Quantity: {product.quantity}</p>
            <div className="prose">
              <PortableText value={product.description} />
            </div>
          </div>
      </div>
    </div>
  );
}