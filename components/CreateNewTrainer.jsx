"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const SPECIALIZATIONS = [
  "Weight Training",
  "Cardio",
  "Yoga",
  "CrossFit",
  "Zumba",
  "Functional Training",
];

const CreateNewTrainerComponent = () => {
  const [trainerForm, setTrainerForm] = useState({
    name: "",
    age: "",
    gender: "",
    specialization: [],
    experienceYears: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainerForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSpecializationChange = (value) => {
    setTrainerForm((prev) => ({
      ...prev,
      specialization: prev.specialization.includes(value)
        ? prev.specialization.filter((item) => item !== value)
        : [...prev.specialization, value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "/api/admin/trainers",
        {
          ...trainerForm,
          age: Number(trainerForm.age),
          experienceYears: Number(trainerForm.experienceYears),
        },
        { withCredentials: true },
      );

      toast.success("Trainer created successfully");

      setTrainerForm({
        name: "",
        age: "",
        gender: "",
        specialization: [],
        experienceYears: "",
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create trainer");
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
          Create New Trainer
        </h2>

        {/* Trainer Name */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">
            Trainer Name
          </label>
          <input
            type="text"
            name="name"
            value={trainerForm.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        {/* Gender & Experience */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={trainerForm.gender}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">Age</label>
            <input
              type="number"
              min="18"
              name="age"
              value={trainerForm.age}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Experience (Years)
            </label>
            <input
              type="number"
              min="0"
              name="experienceYears"
              value={trainerForm.experienceYears}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
        </div>

        {/* Specializations */}
        <div>
          <label className="block text-sm text-neutral-400 mb-2">
            Specializations
          </label>
          <div className="flex flex-wrap gap-2">
            {SPECIALIZATIONS.map((spec) => {
              const active = trainerForm.specialization.includes(spec);
              return (
                <button
                  type="button"
                  key={spec}
                  onClick={() => handleSpecializationChange(spec)}
                  className={`rounded-full px-3 py-1 text-sm transition
                    ${
                      active
                        ? "bg-red-600 text-white"
                        : "bg-white/10 text-neutral-300 hover:bg-white/20"
                    }`}
                >
                  {spec}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700 transition disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Trainer"}
        </button>
      </form>
    </div>
  );
};

export default CreateNewTrainerComponent;
