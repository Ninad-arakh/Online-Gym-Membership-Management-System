"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const DEFAULT_SPECIALIZATIONS = [
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

  const [specializations, setSpecializations] = useState(
    DEFAULT_SPECIALIZATIONS,
  );
  const [newSpec, setNewSpec] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainerForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecializationChange = (value) => {
    setTrainerForm((prev) => ({
      ...prev,
      specialization: prev.specialization.includes(value)
        ? prev.specialization.filter((item) => item !== value)
        : [...prev.specialization, value],
    }));
  };

  const addNewSpecialization = () => {
    const trimmed = newSpec.trim();
    if (!trimmed) return;

    if (specializations.includes(trimmed)) {
      toast.error("Specialization already exists");
      return;
    }

    setSpecializations((prev) => [...prev, trimmed]);
    setTrainerForm((prev) => ({
      ...prev,
      specialization: [...prev.specialization, trimmed],
    }));
    setNewSpec("");
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
    <div className="flex min-h-screen w-full items-center justify-center bg-linear-to-br from-slate-50 via-indigo-50 to-purple-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl rounded-2xl border border-slate-200 bg-linear-to-br from-[#faf8fc] via-[#f6f3fb] to-[#cab5ff] p-6 md:p-8 shadow-xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-slate-800">
          Create New Trainer
        </h2>

        {/* Trainer Name */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Trainer Name
          </label>
          <input
            type="text"
            name="name"
            value={trainerForm.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Gender & Experience */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={trainerForm.gender}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Age
            </label>
            <input
              type="number"
              min="18"
              name="age"
              value={trainerForm.age}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Experience (Years)
            </label>
            <input
              type="number"
              min="0"
              name="experienceYears"
              value={trainerForm.experienceYears}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Specializations */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Specializations
          </label>

          <div className="flex flex-wrap gap-2 mb-3">
            {specializations.map((spec) => {
              const active = trainerForm.specialization.includes(spec);
              return (
                <button
                  type="button"
                  key={spec}
                  onClick={() => handleSpecializationChange(spec)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition
                    ${
                      active
                        ? "bg-indigo-600 text-white shadow"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                >
                  {spec}
                </button>
              );
            })}
          </div>

          {/* Add new specialization */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newSpec}
              onChange={(e) => setNewSpec(e.target.value)}
              placeholder="Add new specialization"
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={addNewSpecialization}
              className="rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-700 transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Trainer"}
        </button>
      </form>
    </div>
  );
};

export default CreateNewTrainerComponent;
