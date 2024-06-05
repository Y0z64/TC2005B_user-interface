import { useEffect, useRef, useState } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  age?: string;
  gender?: string;
  address?: string;
  image?: string;
};

type Props = {
  userId: number;
};

export type Description = {
  name: string;
  description: string;
  prescription?: string;
};

export default function User({ userId }: Props) {
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const prescriptionRef = useRef<HTMLTextAreaElement>(null);

  const dbUrl = import.meta.env.VITE_DATABASE_URL;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState<Description | undefined>();
  const [error, setError] = useState<string | null>(null);

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
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDescription = async () => {
    try {
      const response = await fetch(dbUrl + "/description/" + userId);
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const data = await response.json();
      console.log(data);
      setDescription(data);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchDescription();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleGenerateHelp = async() => {
  //   const promp = {
  //     prompt: form.description,
  //   };
  //   const response = await fetch(apiURL + "/help", {
  //     method: "POST",
  //     body: JSON.stringify(promp),
  //   });
  //   const data = await response.json();
  //   console.log(data);
  //   return data;
  // };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    console.log("Submitting form...");

    const description = descriptionRef.current?.value;
    const prescription = prescriptionRef.current?.value;

    const response = await fetch(dbUrl + "/description/" + user?.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description, prescription }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();
    console.log(data);
  };

  if (loading) {
    return (
      <h1 className="flex justify-center items-center w-screen h-screen">
        Loading...
      </h1>
    );
  }

  if (error) {
    return (
      <h1 className="flex justify-center items-center w-screen h-screen text-red-400">
        {error}
      </h1>
    );
  }

  return (
    <div className="space-x-6 py-16 h-screen w-screen flex justify-center items-center">
      <div className="text-black w-[37.5rem] h-full pl-6 pr-5 pt-10 pb-6 bg-gray-300 rounded-md flex flex-col space-y-2">
        <img
          className="object-cover w-[100px] rounded-3xl outline outline-[2px]"
          src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
          alt="user-image"
        />
        <TextSpace title={"Name"} text={user?.name} />
        <TextSpace title={"Email"} text={user?.email} />
        <TextSpace title={"Description"} text={description?.description} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="text-black w-[37.5rem] h-full pl-6 pr-5 pt-10 pb-6 bg-gray-600 rounded-md flex flex-col justify-center items-center space-y-2"
      >
        <h1 className="text-4xl w-full">Description</h1>
        <textarea
          ref={descriptionRef}
          name="description"
          id="description"
          className="outline w-full h-[9.375rem] rounded-lg bg-gray-300 hover:outline-gray-700 transition-all duration-200 p-3 overflow-auto"
        ></textarea>
        <h1 className="text-4xl w-full">Presciption</h1>
        <textarea
          ref={prescriptionRef}
          name="prescription"
          id="prescription"
          className="outline w-full h-[9.375rem] rounded-lg bg-gray-300 hover:outline-gray-700 transition-all duration-200 p-3 overflow-auto"
        ></textarea>
        <button
          type="submit"
          id="submit"
          className="bg-green-500 w-[15rem] h-[3rem] rounded-lg text-white text-2xl flex justify-center items-center hover:bg-green-600 transition-all duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

type TextSpaceProps = {
  title: string;
  text?: string;
};

function TextSpace({ title, text }: TextSpaceProps) {
  return (
    <div className="flex flex-col justify-start items-left space-x-1 text-left">
      <h1 className="text-4xl">{title}</h1>
      <div className="text-3xl">{text}</div>
    </div>
  );
}
