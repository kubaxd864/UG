export default function Home() {
  return (
    <section className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden px-4 py-14 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-cyan-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-6 h-72 w-72 rounded-full bg-emerald-200/50 blur-3xl" />

      <div className="mx-auto max-w-4xl">
        <div className="relative rounded-4xl border bg-gray-950 text-white p-8 sm:p-10">
          <h1 className="text-3xl font-semibold tracking-tightsm:text-4xl">
            Product Dashboard
          </h1>
          <p className="mt-4 text-base leading-7 sm:text-lg">
            Welcome to the Product Dashboard application.
          </p>
          <p className="mt-5 text-sm font-medium uppercase tracking-[0.2em]">
            Use the navigation menu to
          </p>
          <ul className="mt-4 space-y-3">
            <li className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-500" />
              View and manage products
            </li>
            <li className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              View product statistics
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
