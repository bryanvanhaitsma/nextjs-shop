import { client, Product } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';

async function getProducts(): Promise<Product[]> {
  const query = `*[_type == "product"]{
    _id,
    title,
    slug,
    price,
    description,
    sku,
    quantity
  }`;
  return await client.fetch(query);
}

export default async function ProductsPage() {
  const products: Product[] = await getProducts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.sku} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-gray-600">SKU: {product.sku}</p>
            <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
            <p>Quantity: {product.quantity}</p>
            <div className="prose">
              <PortableText value={product.description} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}