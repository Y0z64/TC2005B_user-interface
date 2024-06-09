import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dbUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch(dbUrl + "/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        address1: city,
        address2: address,
        age,
        gender,
        description,
      }),
    });

    if (!response.ok) {
      setError(await response.text());
      console.error("Failed to register user");
    }

    if (response.ok) {
      setSuccess("User registered successfully");
      console.log("User registered successfully");
      console.log(response.json());
    }
  };

  return (
    <div className="flex flex-col space-y-4 h-screen w-screen justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-full justify-center items-center w-[28.125rem] text-left"
      >
        <h1 className="mb-8 text-8xl font-mono">Register</h1>
        <label
          htmlFor="name"
          className="text-white text-2xl font-semibold w-full text-left mb-[0.1875rem] "
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-12 text-lg w-full rounded-xl border-2 mb-4 border-gray-400 hover:border-white transition-all ease-in-out duration-200 bg-gray-400 bg-opacity-25 pl-3"
        />
        <label
          htmlFor="email"
          className="text-white text-2xl font-semibold w-full text-left mb-[0.1875rem]"
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 text-lg w-full rounded-xl border-2 mb-4 border-gray-400 hover:border-white transition-all ease-in-out duration-200 bg-gray-400 bg-opacity-25 pl-3"
        />
        <label
          htmlFor="age"
          className="text-white text-2xl font-semibold w-full text-left mb-[0.1875rem]"
        >
          Age
        </label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="h-12 text-lg w-full rounded-xl border-2 mb-4 border-gray-400 hover:border-white transition-all ease-in-out duration-200 bg-gray-400 bg-opacity-25 pl-3"
        />
        <label
          htmlFor="gender"
          className="text-white text-2xl font-semibold w-full text-left mb-[0.1875rem]"
        >
          Gender
        </label>
        <input
          type="text"
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="h-12 text-lg w-full rounded-xl border-2 mb-4 border-gray-400 hover:border-white transition-all ease-in-out duration-200 bg-gray-400 bg-opacity-25 pl-3"
        />
        <label
          htmlFor="address1"
          className="text-white text-2xl font-semibold w-full text-left mb-[0.1875rem]"
        >
          City
        </label>
        <input
          type="text"
          id="address1"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="h-12 text-lg w-full rounded-xl border-2 mb-4 border-gray-400 hover:border-white transition-all ease-in-out duration-200 bg-gray-400 bg-opacity-25 pl-3"
        />
        <label
          htmlFor="address2"
          className="text-white text-2xl font-semibold w-full text-left mb-[0.1875rem]"
        >
          Address
        </label>
        <input
          type="text"
          id="address2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="h-12 text-lg w-full rounded-xl border-2 mb-4 border-gray-400 hover:border-white transition-all ease-in-out duration-200 bg-gray-400 bg-opacity-25 pl-3"
        />

        <label
          htmlFor="description"
          className="text-white text-2xl font-semibold w-full text-left mb-[0.1875rem]"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="h-24 text-lg w-full rounded-xl border-2 mb-4 border-gray-400 hover:border-white transition-all ease-in-out duration-200 bg-gray-400 bg-opacity-25 pl-3"
        />
        <button
          type="submit"
          id="submit"
          className="h-16 mt-8 font-semibold text-2xl  rounded-xl w-full justify-center flex items-center hover:scale-105 transition-all ease-in-out duration-200 bg-[#00c896] hover:bg-[#6ae0b7]"
        >
          Submit
        </button>
        {success && (
          <p className="text-green-500 text-2xl w-full text-center h-fit">
            {success}
          </p>
        )}
        {error && (
          <p className="text-red-500 text-2xl w-full text-center h-fit">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
