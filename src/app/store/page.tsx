import { client } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';
import { Product } from '@/sanity/types';



async function getProducts(query: string): Promise<Product[]> {

  try {
    const products = await client.fetch(query);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}




export default async function ProductsPage() {

  const notFeaturedQuery = `*[_type == "product" && featured != true]{
    _id,
    title,
    "slug": slug.current,
    price,
    featured,
    description,
    sku,
    quantity
  }`;
  const notFeaturedProducts: Product[] = await getProducts(notFeaturedQuery);

  const featuredQuery = `*[_type == "product" && featured == true]{
    _id,
    title,
    "slug": slug.current,
    price,
    featured,
    description,
    sku,
    quantity
  }`;
  const featuredProducts: Product[] = await getProducts(featuredQuery);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Our Amazing Store</h1>
      <h2 className="text-xl font-bold">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProducts.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg">
            <h3 className="text-xl font-semibold"><a href={`/store/products/${product.slug}`}>{product.title}</a></h3>
            <p className="text-gray-600">SKU: {product.sku}</p>
            <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
            <p>Quantity: {product.quantity}</p>
            <div className="prose">
              <PortableText value={product.description} />
            </div>
          </div>
        ))}
      </div>
      
      <h2 className="text-xl font-bold">Other Amazing Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notFeaturedProducts.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg">
            <h3 className="text-xl font-semibold"><a href={`/store/products/${product.slug}`}>{product.title}</a></h3>
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