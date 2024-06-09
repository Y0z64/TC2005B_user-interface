import { Link } from "wouter";
import NavigationBar from "../components/shared/NavigationBar";
import { useEffect, useState } from "react";
import { User } from "../components/Card";

type Props = {
  userId: number;
};

export default function User({ userId }: Props) {
  const dbUrl = import.meta.env.VITE_BACKEND_URL;

  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("fetching data");
        const response = await fetch(dbUrl + "/users/" + userId);
        const data = (await response.json()) as User;
        console.log(data);
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [dbUrl, userId]);

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
      </NavigationBar>
      <div className="flex w-full h-full justify-center items-center flex-col">
        <div className="flex justify-center items-center w-full h-full">
          <div className="w-1/3 h-full my-8 justify-center items-center space-x-4 bg-slate-300 rounded-md px-4 flex py-4 overflow-y-auto"></div>
          <div className="w-1/3 h-full my-8 justify-center items-center space-x-4 bg-slate-300 rounded-md px-4 flex py-4 overflow-y-auto"></div>
        </div>
      </div>
    </div>
  );
}
