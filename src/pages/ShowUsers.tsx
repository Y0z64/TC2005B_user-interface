import { useEffect, useState } from "react";
import Userinfo, { User } from "../components/Userinfo";

const url = "http://localhost:3000";

export default function ShowUsers() {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url + "/");
        const data = (await response.json()) as User[];
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

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
