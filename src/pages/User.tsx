import { useEffect, useState } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  description?: string;
  image?: string;
};

type Props = {
  userId: number;
};

export default function User({ userId }: Props) {
  const dbUrl = import.meta.env.VITE_DATABASE_URL;

  const [user, setUser] = useState<User|null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(dbUrl + "/users/" + userId);
        if (!response.ok) {
          throw new Error(await response.text());
        }
        const data = await response.json();
        console.log(data);
        setUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dbUrl, userId]);

  if (loading)
    return (
      <h1 className="flex justify-center items-center w-screen h-screen">
        Loading...
      </h1>
    );
  if (error)
    return (
      <h1 className="flex justify-center items-center w-screen h-screen text-red-400">
        {error}
      </h1>
    );

  return (
    <div className="h-screen w-screen flex flex-col justify-start items-center py-5">
      <h1 className="mb-4">Users</h1>
      <div className="flex flex-col w-[37.5rem] h-full justify-start items-center">
        {/* image containter */}
        <div className="aspect-square w-full">
          <img
            className="object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1496070242169-b672c576566b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJvZ3xlbnwwfHwwfHx8MA%3D%3D"
            alt="user image"
          />
        </div>
        {/* user info container */}
        <div className="flex flex-col w-full h-fit text-center">
          <h1>{user?.name}</h1>
          <h1>{user?.email}</h1>
          {user?.description && <h4>{user?.description}</h4>}
        </div>
      </div>
    </div>
  );
}
