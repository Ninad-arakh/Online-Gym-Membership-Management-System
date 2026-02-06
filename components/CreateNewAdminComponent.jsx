"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const CreateNewAdminComponent = () => {
  const [adminForm, setAdminForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "/api/admin/users",
        adminForm,
        { withCredentials: true }
      );

      toast.success("Admin created successfully");

      setAdminForm({
        name: "",
        email: "",
        password: "",
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-linear-to-br from-black via-red-600/70 to-black px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl rounded-2xl bg-neutral-900 p-6 md:p-8 shadow-2xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-white text-center">
          Create New Admin
        </h2>

        {/* Name */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">
            Admin Name
          </label>
          <input
            type="text"
            name="name"
            value={adminForm.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={adminForm.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={adminForm.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700 transition disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Admin"}
        </button>
      </form>
    </div>
  );
};

export default CreateNewAdminComponent;
