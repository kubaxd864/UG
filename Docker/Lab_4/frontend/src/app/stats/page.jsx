"use client";
import { useCallback, useEffect, useMemo, useState } from "react";

const API_BASE = "/api" || process.env.NEXT_PUBLIC_API_URL;

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Stats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadStats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/stats`, {
        headers: { "Cache-Control": "no-cache" },
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }

      const data = await response.json();
      setStats(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();

    const interval = setInterval(loadStats, 10000);
    return () => clearInterval(interval);
  }, [loadStats]);

  const viewStats = useMemo(
    () => ({
      totalProducts: stats?.totalProducts ?? 0,
      totalValue: Number(stats?.totalValue ?? 0),
      categoriesCount: stats?.categoriesCount ?? 0,
      instanceId: stats?.instanceId ?? "N/A",
    }),
    [stats],
  );

  if (loading)
    return (
      <div className="w-full flex justify-center items-center p-2 pt-10">
        Loading stats...
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
          <h1 className="text-3xl font-semibold tracking-tight">Statistics</h1>
          <p className="text-sm text-gray-600">
            Live overview of your inventory metrics.
          </p>
        </div>
        <div className="rounded-xl border border-gray-300 bg-gray-950 px-3 py-2 text-sm text-gray-600 shadow-sm">
          Last update: {lastUpdated ? lastUpdated.toLocaleTimeString() : "N/A"}
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border bg-gray-950 px-4 py-3">
          Could not refresh data: {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-2xl border border-gray-300 bg-gray-950 p-5 shadow-sm">
          <h2 className="text-sm font-medium text-gray-500">Total Products</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight">
            {viewStats.totalProducts}
          </p>
        </article>

        <article className="rounded-2xl border border-gray-300 bg-gray-950 p-5 shadow-sm">
          <h2 className="text-sm font-medium text-gray-500">Total Value</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight">
            {currencyFormatter.format(viewStats.totalValue)}
          </p>
        </article>

        <article className="rounded-2xl border border-gray-300 bg-gray-950 p-5 shadow-sm">
          <h2 className="text-sm font-medium text-gray-500">Categories</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight">
            {viewStats.categoriesCount}
          </p>
        </article>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-300 bg-gray-950 p-4">
        <h3 className="mb-2 text-sm font-medium text-gray-500">
          Backend Instance ID
        </h3>
        <p>
          <code className="rounded bg-gray-900 px-2 py-1 text-sm text-gray-500">
            {viewStats.instanceId}
          </code>
        </p>
        <p className="mt-3 text-xs text-gray-500">
          This ID changes when the backend container is recreated.
        </p>
      </div>

      <button
        onClick={loadStats}
        disabled={loading}
        className="mt-6 rounded-xl bg-gray-950 border border-gray-300 px-4 py-2 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Refreshing..." : "Refresh Stats"}
      </button>
    </section>
  );
}
