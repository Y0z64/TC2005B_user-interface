import { useEffect, useState } from "react";
import Userinfo, { User } from "../components/Userinfo";

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
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th className="px-4 py-2 w-[9.375rem]">User</th>
            <th className="px-4 py-2 w-[9.375rem]">Email</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <Userinfo key={index} name={user.name} email={user.email} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
