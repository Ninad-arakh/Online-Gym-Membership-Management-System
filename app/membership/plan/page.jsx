"use client";
import React, { useEffect, useState } from "react";
import bgImg from "@/public/bgImg2.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LoaderOne } from "@/components/ui/loader";
import axios from "axios";
import { SidebarDemo } from "@/components/Sidebar-Demo";
import MembershipPlans from "@/components/MembershipPlans";
import { LabelInputContainer } from "@/components/Signup-form-demo";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const MembershipPlan = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [plans, setPlans] = useState([]);
  const [featuresInput, setFeaturesInput] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [Form, setForm] = useState({
    title: "",
    slug: "basic",
    price: 0,
    description: "",
    features: [],
    duration: 0,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // -------- Validations --------
    if (!Form.title.trim()) {
      return alert("Plan name is required");
    }

    if (Number(Form.price) <= 200) {
      return alert("Price must be greater than 200");
    }

    if (Number(Form.duration) <= 0) {
      return alert("Duration must be greater than 0");
    }

    if (!Form.description.trim()) {
      return alert("Description is required");
    }

    // if (!Form.features.length || Form.features.some((f) => !f)) {
    //   return alert("Please add at least one valid feature");
    // }

    // -------- Derived values (schema-specific) --------
    const slug = Form.slug;

    const durationInDays = Number(Form.duration) * 30;
    const parsedFeatures = featuresInput
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    try {
      const response = await axios.post(
        "/api/plans",
        {
          slug, // REQUIRED & UNIQUE
          title: Form.title,
          price: Number(Form.price),
          billingCycle: "monthly",
          durationInDays,
          description: Form.description,
          features: parsedFeatures,
          isPopular: false,
          isActive: true,
          access: {
            workoutLibrary: false,
            personalizedWorkout: false,
            dietPlan: false,
            personalizedDiet: false,
            trainerChat: false,
            liveSessions: false,
            progressTracking: false,
            prioritySupport: false,
          },
        },
        {
          withCredentials: true,
        },
      );

      // console.log("response of plans : ", response);

      if (response.status === 201 || response.status === 200) {
        setForm({
          title: "",
          price: 0,
          description: "",
          features: [],
          duration: 0,
        });
        setFeaturesInput("");

        handleClose();
      }
    } catch (err) {
      console.log(err);
      alert(
        err?.response?.data?.message ||
          "Something went wrong while creating plan",
      );
    }
  };

  const router = useRouter();

  const getUser = async () => {
    try {
      const response = await axios.get("/api/auth/me", {
        withCredentials: true,
      });
      //   console.log("response : ", response)
      if (response.status === 200) {
        setUser(response.data.user);
      } else {
      }
    } catch (err) {
      router.push("/login");
      console.log(err);
    }
  };



  useEffect(() => {
    if (!user) {
      getUser();
    } else {
      // getPlans();
    }
  }, [user]);

  if (!user) {
    return <LoaderOne />;
  } else {
    return (
      <div>
        <Image
          src={bgImg}
          alt="background"
          className="w-full h-screen bg-cover absolute inset-0 -z-10"
        />

        <SidebarDemo user={user}>
          <div className="w-full flex flex-col gap-3 my-5">
            <div className="flex w-full justify-between  px-8">
              <h2 className="text-white md:text-3xl text-xl  py-4">
                Gym Membership Plans
              </h2>

              {user.role === "admin" && (
                <button
                  onClick={handleOpen}
                  className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800/60 rounded-lg group cursor-pointer "
                >
                  <span className="absolute w-0 h-0 transition-all duration-400 ease-out bg-[#F5C542]/90 rounded-full group-hover:w-full group-hover:h-56"></span>
                  <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-linear-to-b from-transparent via-transparent to-gray-700"></span>
                  <span className="relative text-xs md:text-sm group-hover:text-black transition-all duration-300 font-semibold">
                    Add New Plan +
                  </span>
                </button>
              )}
            </div>
            <MembershipPlans user={user} />
          </div>

          {open && (
            <div className="absolute w-full h-full backdrop-blur-md z-20 flex justify-center items-center">
              <form
                onSubmit={handleSubmit}
                className="relative bg-slate-900/90 text-white w-full mx-2 md:mx-0 md:w-4/12 p-8 overflow-scroll no-scrollbar  rounded-xl"
              >
                <button
                  className="absolute top-2 right-2 cursor-pointer bg-gray-600 px-2  rounded-xl flex justify-center items-center"
                  onClick={(e) => {
                    handleClose();
                    e.preventDefault();
                  }}
                >
                  X
                </button>
                <h2 className="text-2xl text-center mb-4">Create New Plan</h2>

                <LabelInputContainer className="mb-4">
                  <Label htmlFor="title" className="text-white">
                    Plan Name
                  </Label>
                  <Input
                    id="title"
                    value={Form.title}
                    onChange={handleChange}
                    placeholder="Plus Ultra"
                    type="text"
                    className="bg-gray-800/70 text-white"
                  />
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                  <Label htmlFor="slug" className="text-white">
                    Plan Type
                  </Label>
                  <select
                    id="slug"
                    value={Form.slug}
                    onChange={handleChange}
                    className="w-full rounded-md bg-gray-800/70 text-white p-3 outline-none"
                  >
                    <option value="free">Free</option>
                    <option value="basic">Basic</option>
                    <option value="pro">Pro</option>
                    <option value="elite">Elite</option>
                  </select>
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                  <Label htmlFor="price" className="text-white">
                    Price
                  </Label>
                  <Input
                    id="price"
                    value={Form.price}
                    onChange={handleChange}
                    placeholder="499"
                    type="number"
                    className="bg-gray-800/70 text-white"
                  />
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                  <Label htmlFor="duration" className="text-white">
                    Duration (in months)
                  </Label>
                  <Input
                    id="duration"
                    value={Form.duration}
                    onChange={handleChange}
                    placeholder="3"
                    type="number"
                    className="bg-gray-800/70 text-white"
                  />
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                  <Label htmlFor="description" className="text-white">
                    Description
                  </Label>
                  <textarea
                    id="description"
                    value={Form.description}
                    onChange={handleChange}
                    placeholder="Perfect plan for beginners"
                    className="w-full rounded-md bg-gray-800/70 text-white p-3 outline-none"
                    rows={3}
                  />
                </LabelInputContainer>

                <LabelInputContainer className="mb-6">
                  <Label htmlFor="features" className="text-white">
                    Features (comma separated)
                  </Label>
                  <textarea
                    id="features"
                    value={featuresInput}
                    onChange={(e) => setFeaturesInput(e.target.value)}
                    placeholder="Personal Trainer, Free Diet Plan, 24/7 Access"
                    className="w-full rounded-md bg-gray-800/70 text-white p-3 outline-none"
                    rows={3}
                  />
                </LabelInputContainer>

                <button
                  type="submit"
                  className="w-full bg-[#F5C542] text-black font-semibold py-3 rounded-lg hover:opacity-90 transition"
                >
                  Create Plan
                </button>
              </form>
            </div>
          )}
        </SidebarDemo>
      </div>
    );
  }
};

export default MembershipPlan;
