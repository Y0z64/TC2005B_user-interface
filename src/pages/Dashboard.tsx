import { useEffect, useState } from "react";
import Card, { User } from "../components/Card";
import NavigationBar from "../components/shared/NavigationBar";
import { Link } from "wouter";

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>();
  const [search, setSearch] = useState<string>("");

  const dbUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("fetching data");
        const response = await fetch(dbUrl + "/users/");
        const data = (await response.json()) as User[];
        console.log(data);
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [dbUrl]);

  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center overflow-auto">
      <NavigationBar>
        <Link href="/">
          <p>Dashboard</p>
        </Link>
        <Link href="/register">
          <p>Registro</p>
        </Link>
        <Link href="/">
          <p></p>
        </Link>
        <div className="flex justify-center items-center w-fit h-fit">
          <input
            className="px-2 rounded-lg border border-[#6d848a] selection:border-[#f2ecff]"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </NavigationBar>
      <h1>Users</h1>
      <div className="flex mt-3 w-full h-full justify-center items-start">
        <div className="grid grid-cols-2 gap-4 h-full grid-rows-10">
          {filteredUsers?.map((user, index) => (
            <Card
              key={index}
              id={user.id}
              name={user.name}
              email={user.email}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
