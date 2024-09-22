"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UpdateUserInfo = () => {
  const { data: session, update } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [message, setMessage] = useState("");
  // const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    update({
      ...session,
      user: {
        ...session.user,
        name,
      },
    });
    // router.refresh();
  };

  return (
    <div className="flex items-center  flex-col justify-center h-screen  text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-2xl font-semibold mb-4">Update Your Information</h2>

        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 bg-gray-700 text-white rounded focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white"
        >
          Update Name
        </button>

        {message && <p className="text-green-500 mt-3">{message}</p>}
      </form>
      {session?.user?.name}
      <button
        onClick={async () => {
          await signOut();
        }}
      >
        SignOut
      </button>
    </div>
  );
};

export default UpdateUserInfo;
