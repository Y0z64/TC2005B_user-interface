import { useEffect, useState } from "react";
import Card, { User } from "../components/Card";

export default function ShowUsers() {
  const [users, setUsers] = useState<User[]>();

  const dbUrl = import.meta.env.VITE_DATABASE_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("fetching data");
        const response = await fetch(dbUrl + "/");
        const data = (await response.json()) as User[];
        console.log(data);
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [dbUrl]);

  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center overflow-auto">
      <h1>Users</h1>
      <div className="flex flex-col mt-3 w-fit h-full justify-start items-center space-y-3">
        {users?.map((user, index) => (
          <Card key={index} id={user.id} name={user.name} email={user.email} />
        ))}
      </div>
    </div>
  );
}
