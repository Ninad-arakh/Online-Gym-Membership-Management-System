"use client";
import { useModal } from "@/context/ModalContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const UpdateModal = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const { isOpen, closeModal } = useModal();
  const router = useRouter();

  const getUser = async () => {
    try {
      const response = await axios.get("/api/auth/me", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUser(response.data.user);
        setUsername(response.data.user?.name || "");
      }
    } catch (err) {
      router.push("/login");
    }
  };

  useEffect(() => {
    if (!user) getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.patch(
        "/api/user",
        { name: username },
        { withCredentials: true },
      ).then((res) => console.log("res" , res));

      toast.success("Username updated successfully 🎉");
      await getUser();
      closeModal();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update username");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="z-100 fixed w-full h-screen bg-[#ebe2ff] flex justify-center items-center inset-0">
      <div className="bg-linear-to-br from-[#faf8fc] via-[#f6f3fb] to-[#cab5ff] rounded-xl p-10 w-2xl shadow-xl h-[60vh] relative">
        {/* content goes here */}
        <div className="h-full flex flex-col justify-start mt-14">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Update Username
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter new username"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>

        <button
          onClick={closeModal}
          className="absolute px-2 py-0.5 flex justify-center items-center rounded-xl cursor-pointer bg-gray-600 text-white top-2 right-2"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default UpdateModal;
