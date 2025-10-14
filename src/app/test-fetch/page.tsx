// app/test-fetch/page.tsx
import { client } from '@/sanity/lib/client';

export default async function TestFetchPage() {
  let testResults = {
    allDocuments: [],
    products: [],
    error: null as string | null,
  };

  try {
    // Test 1: Fetch all documents
    const allDocs = await client.fetch(`*[]{_type, _id, title, name}`);
    testResults.allDocuments = allDocs;

    // Test 2: Fetch products specifically
    const products = await client.fetch(`*[_type == "product"]{
      _id,
      title,
      slug,
      price,
      sku,
      quantity
    }`);
    testResults.products = products;

  } catch (error: any) {
    testResults.error = error.message;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Sanity Fetch Test</h1>

      {/* Error Display */}
      {testResults.error && (
        <div className="bg-red-50 border border-red-300 p-4 rounded mb-6">
          <h2 className="font-bold text-red-800">❌ Error:</h2>
          <p className="text-red-700">{testResults.error}</p>
        </div>
      )}

      {/* All Documents */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-3">
          All Documents ({testResults.allDocuments.length})
        </h2>
        <div className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
          <pre className="text-xs">
            {JSON.stringify(testResults.allDocuments, null, 2)}
          </pre>
        </div>
      </div>

      {/* Products Specifically */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-3">
          Products Only ({testResults.products.length})
        </h2>
        {testResults.products.length > 0 ? (
          <div className="space-y-4">
            {testResults.products.map((product: any) => (
              <div key={product._id} className="bg-white border p-4 rounded">
                <h3 className="font-bold">{product.title}</h3>
                <p className="text-sm text-gray-600">ID: {product._id}</p>
                <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                <p className="text-lg font-bold text-green-600">
                  ${product.price}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-300 p-4 rounded">
            <p>No products found with query.</p>
          </div>
        )}
      </div>

      {/* Raw JSON */}
      <details className="mb-8">
        <summary className="cursor-pointer text-blue-600 font-bold mb-2">
          Click to see raw JSON
        </summary>
        <div className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
          <pre className="text-xs">
            {JSON.stringify(testResults.products, null, 2)}
          </pre>
        </div>
      </details>

      {/* Client Configuration */}
      <div className="bg-blue-50 border border-blue-300 p-4 rounded">
        <h3 className="font-bold mb-2">Client Configuration:</h3>
        <pre className="text-sm">
{`Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}
API Version: Check your client.ts file
Use CDN: Check your client.ts file`}
        </pre>
      </div>
    </div>
  );
}