"use client";
import { useCallback, useEffect, useMemo, useState } from "react";

const API_BASE = "/api" || process.env.NEXT_PUBLIC_API_URL;

const initialFormData = {
  name: "",
  price: "",
  category: "",
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);

  const fetchProducts = async () => {
    const response = await fetch(`${API_BASE}/items`);
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
  };

  const addProduct = async (product) => {
    const response = await fetch(`${API_BASE}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error("Failed to add product");
    return response.json();
  };

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const dashboardStats = useMemo(() => {
    const totalValue = products.reduce(
      (sum, product) => sum + Number(product.price || 0),
      0,
    );

    const categories = new Set(products.map((product) => product.category));

    return {
      count: products.length,
      categories: categories.size,
      totalValue,
    };
  }, [products]);

  const handleInputChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category) {
      alert("Please fill all fields");
      return;
    }

    try {
      setSubmitting(true);
      await addProduct(formData);
      setFormData(initialFormData);
      await loadProducts();
    } catch (err) {
      alert("Error adding product: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="w-full flex justify-center items-center p-2 pt-10">
        Loading products...
      </div>
    );
  if (error)
    return (
      <div className="w-full flex justify-center items-center p-2 pt-10 text-red-600">
        Error: {error}
      </div>
    );

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Products</h1>
          <p className="text-sm text-gray-600">
            Manage your inventory in one place.
          </p>
        </div>

        <div className="grid w-full max-w-md grid-cols-3 gap-2 text-sm sm:w-auto">
          <div className="rounded-xl border border-gray-300 bg-gray-950 p-3 shadow-sm">
            <p className="text-gray-500">Items</p>
            <p className="text-lg font-semibold">{dashboardStats.count}</p>
          </div>
          <div className="rounded-xl border border-gray-300 bg-gray-950 p-3 shadow-sm">
            <p className="text-gray-500">Categories</p>
            <p className="text-lg font-semibold">{dashboardStats.categories}</p>
          </div>
          <div className="rounded-xl border border-gray-300 bg-gray-950 p-3 shadow-sm">
            <p className="text-gray-500">Value</p>
            <p className="text-lg font-semibold">
              {currencyFormatter.format(dashboardStats.totalValue)}
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-8 rounded-2xl border border-gray-200 bg-gray-950 p-4 shadow-sm"
      >
        <h2 className="mb-4 text-lg font-semibold">Add New Product</h2>
        <div className="grid gap-3 md:grid-cols-[2fr_1fr_1fr_auto]">
          <input
            type="text"
            placeholder="Product name"
            value={formData.name}
            onChange={handleInputChange("name")}
            className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none transition focus:border-black"
          />
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange("price")}
            className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none transition focus:border-black"
          />
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={handleInputChange("category")}
            className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none transition focus:border-black"
          />
          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-black px-4 py-2 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-600">
          No products yet. Add your first item using the form above.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="rounded-2xl border border-gray-200 bg-gray-950 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <span className="rounded-full bg-gray-300 px-2 py-1 text-xs text-gray-600">
                  #{product.id}
                </span>
              </div>
              <p className="mb-2 text-2xl font-bold">
                {currencyFormatter.format(Number(product.price || 0))}
              </p>
              <p className="inline-flex rounded-full border border-gray-200 px-2 py-1 text-sm text-gray-500">
                {product.category}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
