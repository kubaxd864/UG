import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full flex flex-row gap-5 justify-center items-center p-3">
      <Link href={"/"}>
        <p>Home</p>
      </Link>
      <Link href={"/products"}>
        <p>Products</p>
      </Link>
      <Link href={"/stats"}>
        <p>Stats</p>
      </Link>
    </header>
  );
}
