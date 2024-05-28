import { Link } from "wouter";

export default function Home() {
  return (
    <nav className="w-screen h-screen flex justify-center items-center flex-col">
      <h1>All pages</h1>
      <div className="w-fit h-fit py-6 px-8 flex flex-col justify-center items-center">
        <Link className="text-white text-4xl" href="/">
          <a>Home</a>
        </Link>
        <Link className="text-white text-4xl" href="/showUsers">
          <a>Show all users</a>
        </Link>
      </div>
    </nav>
  );
}