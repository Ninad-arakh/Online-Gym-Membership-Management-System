"use client"
import React, { useState } from "react"
import axios from "axios"

const SPECIALIZATIONS = [
  "Weight Training",
  "Cardio",
  "Yoga",
  "CrossFit",
  "Zumba",
  "Functional Training",
]

const CreateNewTrainerComponent = () => {
  const [trainerForm, setTrainerForm] = useState({
    name: "",
    gender: "",
    specialization: [],
    experienceYears: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setTrainerForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSpecializationChange = (value) => {
    setTrainerForm((prev) => ({
      ...prev,
      specialization: prev.specialization.includes(value)
        ? prev.specialization.filter((item) => item !== value)
        : [...prev.specialization, value],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await axios.post(
        "/api/admin/trainers",
        {
          ...trainerForm,
          experienceYears: Number(trainerForm.experienceYears),
        },
        {
          withCredentials: true,
        }
      )

      // optional reset after success
      setTrainerForm({
        name: "",
        gender: "",
        specialization: [],
        experienceYears: "",
      })
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to create trainer"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-semibold mb-6">Create New Trainer</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-900 rounded-xl shadow p-4 sm:p-6 space-y-6"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Trainer Name</label>
          <input
            type="text"
            name="name"
            value={trainerForm.name}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2"
            required
          />
        </div>

        {/* Gender + Experience */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={trainerForm.gender}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2"
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Experience (Years)
            </label>
            <input
              type="number"
              name="experienceYears"
              min="0"
              value={trainerForm.experienceYears}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2"
              required
            />
          </div>
        </div>

        {/* Specializations */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Specialization
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SPECIALIZATIONS.map((spec) => (
              <label key={spec} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={trainerForm.specialization.includes(spec)}
                  onChange={() => handleSpecializationChange(spec)}
                />
                {spec}
              </label>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-black text-white disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Trainer"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateNewTrainerComponent
