import { Link } from "wouter";
import NavigationBar from "../components/shared/NavigationBar";
import { useEffect, useState } from "react";
import { type User } from "../components/Card";
import { Trash2 } from "lucide-react";

type Props = {
  userId: number;
};

type Description = {
  id: number;
  name: string;
  description: string;
  prescription: string;
};

const dbUrl = import.meta.env.VITE_BACKEND_URL;

export default function User({ userId }: Props) {
  const [user, setUser] = useState<User>();
  const [descriptions, setDescriptions] = useState<Description[]>([]);
  const [description, setDescription] = useState<string>("");
  const [prescription, setPrescription] = useState<string>("");
  const [loadingPrescription, setLoadingPrescription] =
    useState<boolean>(false);

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

  async function fetchDescriptions() {
    try {
      console.log("fetching data");
      const response = await fetch(dbUrl + "/description/" + userId);
      const data = (await response.json()) as Description[];
      setDescriptions(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function getPrescription(description: string) {
    setLoadingPrescription(true);
    try {
      console.log("fetching nearbyy response");
      const response = await fetch(dbUrl + "/nearbyy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: description }),
      });
      const result = await response.json();
      const prescription = await result.response;
      setPrescription(prescription);
    } catch (err) {
      console.log(err);
    }
    setLoadingPrescription(false);
  }

  async function sendPrescription(description: string, prescription: string) {
    try {
      console.log("fetching data");
      const response = await fetch(dbUrl + "/description/" + userId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: description,
          prescription: prescription,
        }),
      });
      const data = (await response.json()) as Description;
      setDescriptions([...descriptions, data]);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
    fetchDescriptions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="flex sm:flex-col w-full h-full justify-center items-center flex-col mt-3">
        <div className="flex justify-center items-center w-full h-full space-x-4 flex-grow">
          <div className="w-[43.125rem] h-full justify-start items-center space-x-4 bg-slate-300 rounded-md px-4 flex flex-col py-10 overflow-y-auto">
            <img
              className="object-cover w-[10.9375rem] aspect-square rounded-full outline outline-gray-500"
              src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              alt="user-image"
            />
            <span className="w-full flex flex-col items-left justify-center text-gray-700 pl-4">
              <h2 className="text-gray-700 text-[33px]">Name</h2>
              <p className="text-gray-500 text-[25px]">{user?.name}</p>
              <h2 className="text-gray-700 text-[33px]">Email</h2>
              <p className="text-gray-500 text-[25px]">{user?.email}</p>
              <h2 className="text-gray-700 text-[33px]">Age</h2>
              <p className="text-gray-500 text-[25px]">{user?.age}</p>
              <h2 className="text-gray-700 text-[33px]">Gender</h2>
              <p className="text-gray-500 text-[25px]">{user?.gender}</p>
              <h2 className="text-gray-700 text-[33px]">City</h2>
              <p className="text-gray-500 text-[25px]">{user?.city}</p>
              <h2 className="text-gray-700 text-[33px]">Address</h2>
              <p className="text-gray-500 text-[25px]">{user?.address}</p>
            </span>
          </div>
          <div className="w-[43.125rem] h-full justify-center items-start px-4 py-8 bg-slate-300 rounded-md flex overflow-y-auto flex-col">
            <form
              className="flex justify-center items-start w-full h-full flex-col"
              onSubmit={(e) => {
                e.preventDefault();
                getPrescription(description);
              }}
            >
              <div className="flex justify-center items-start w-full h-full flex-col ">
                <h2 className="text-gray-700 text-[33px]">Descripcion</h2>
                <textarea
                  name="description"
                  id="description"
                  className="w-full h-full p-2 overflow-y-auto bg-gray-400 rounded-lg mb-4 outline outline-[3px] outline-gray-500 text-gray-900"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex justify-center items-start w-full h-full flex-col ">
                <h2 className="text-gray-700 text-[33px]">Prescripcion</h2>
                <textarea
                  name="prescription"
                  id="prescription"
                  className="w-full h-full p-2 overflow-y-auto bg-gray-400 rounded-lg mb-4 outline outline-[3px] outline-gray-500 text-gray-900"
                  value={loadingPrescription ? "Loading..." : prescription}
                  onChange={(e) => setPrescription(e.target.value)}
                  readOnly={loadingPrescription}
                />
              </div>
              <button
                type="submit"
                id="submit"
                name="submit"
                className="h-24 w-full bg-gray-500 flex tracking-wide outline outline-transparent hover:outline-gray-800 hover:bg-gray-800 transition-all ease-in-out duration-50 hover:border-transparent justify-center items-center text-2xl"
              >
                Generar ayuda
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  sendPrescription(description, prescription);
                  fetchDescriptions();
                }}
                name="guardar"
                className="h-24 w-full mt-2 bg-gray-500 flex tracking-wide outline outline-transparent hover:outline-gray-800 hover:bg-gray-800 transition-all ease-in-out duration-50  hover:border-transparent justify-center items-center text-2xl"
              >
                Guardar
              </button>
            </form>
          </div>
        </div>
        <div className="h-fit w-full flex overflow-x-auto justify-start items-start px-3 py-4 flex-shrink-0 space-x-3">
          {descriptions.length === 0 && (
            <div className="h-[18.75rem] w-full flex justify-center items-center rounded-xl text-[1.5rem]">
              No descriptions found...
            </div>
          )}
          {descriptions.map((description, idx) => (
            <DescriptionCell
              description={description.description}
              prescription={description.prescription}
              id={description.id}
              key={idx}
              refetch={() => fetchDescriptions()}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type DescriptionProps = {
  description: string;
  prescription: string;
  id: number;
  refetch: () => void;
};

function DescriptionCell({
  description,
  prescription,
  id,
  refetch,
}: DescriptionProps) {
  const [loading, setLoading] = useState<boolean>(false);

  async function deleteDescription(id: number) {
    setLoading(true);
    try {
      console.log("fetching data");
      const response = await fetch(dbUrl + "/description/" + id, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data.response);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }
  return (
    <div className="flex flex-col flex-shrink-0 items-start justify-start p-4 text-xl h-[18.75rem] w-[550px] text-gray-900 text-wrap bg-slate-300 rounded-xl shadow-md shadow-gray-400">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col justify-start items-start w-full h-full overflow-y-scroll">
          <h2 className="text-[1.50rem]">Description</h2>
          <span className="h-full w-full block text-pretty break-words">
            {description}
          </span>
          <h2 className="text-[1.50rem]">Prescription</h2>
          <span className="h-full w-full block text-pretty break-words">
            {prescription}
          </span>
        </div>
      )}
      <div className="w-full flex h-6 justify-end items-center">
        <Trash2
          className="w-6 h-6 cursor-pointer"
          onClick={async () => {
            await deleteDescription(id);
            refetch();
          }}
        />
      </div>
    </div>
  );
}
