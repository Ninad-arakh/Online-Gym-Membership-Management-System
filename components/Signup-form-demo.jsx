"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

export default function SignupFormDemo() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserForm((prev) => ({ ...prev, [id]: value }));
    setError("");
  };

  const validate = () => {
    const { name, email, password, confirmPassword } = userForm;

    if (!email || !password) {
      return "Email and password are required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email address";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (!name) {
        return "Name is required";
      }

      if (!confirmPassword) {
        return "Please confirm your password";
      }

      if (password !== confirmPassword) {
        return "Passwords do not match";
      }
    }

    return null;
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const url = isLogin ? "/api/auth/login" : "/api/auth/register";

      const payload = isLogin
        ? {
            email: userForm.email,
            password: userForm.password,
          }
        : {
            name: userForm.name,
            email: userForm.email,
            password: userForm.password,
          };

      const res = await axios.post(url, payload, {
        withCredentials: true,
      });
      if (res.status === 201) {
        toast.success("Success, Please Login.");
      }
      if (res.status === 200) {
        setOpen(true);
        router.replace("/");
      }
    } catch (err) {
      // ✅ Proper API error handling
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Authentication failed",
        );
        toast.error(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Authentication failed",
        );
      } else {
        setError("Something went wrong");
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="shadow-input backdrop-blur-xs mx-auto w-full max-w-xl bg-linear-to- from-blue-500/40 to-red-500/40 rounded-none bg-black/35 p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-3xl text-center font-bold text-white">
        {isLogin ? "Welcome Back" : "Create an Account"}
      </h2>

      <form className="my-12" onSubmit={handleSubmit}>
        {error && (
          <p className="mb-4 text-center text-sm text-red-500 bg-white/70 rounded-xl px-4 py-1">
            {error}
          </p>
        )}

        {!isLogin && (
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="name" className="text-white">
                Name
              </Label>
              <Input
                id="name"
                value={userForm.name}
                onChange={handleChange}
                placeholder="Tyler"
                type="text"
                className="bg-gray-800/70 text-white"
              />
            </LabelInputContainer>
          </div>
        )}

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="text-white">
            Email Address
          </Label>
          <Input
            id="email"
            value={userForm.email}
            onChange={handleChange}
            placeholder="projectmayhem@fc.com"
            type="email"
            className="bg-gray-800/70 text-white"
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password" className="text-white">
            Password
          </Label>

          <div className="relative">
            <Input
              id="password"
              value={userForm.password}
              onChange={handleChange}
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              className="bg-gray-800/70 text-white pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              tabIndex={-1}
            >
              {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
            </button>
          </div>
        </LabelInputContainer>

        {!isLogin && (
          <LabelInputContainer className="mb-4">
            <Label htmlFor="confirmPassword" className="text-white">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              value={userForm.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              type="password"
              className="bg-gray-800/70 text-white"
            />
          </LabelInputContainer>
        )}

        <button
          disabled={loading}
          className="group/btn relative block h-10 w-full rounded-md bg-linear-to-br from-black to-neutral-600 font-medium text-white disabled:opacity-60"
          type="submit"
        >
          {loading ? "Processing..." : isLogin ? "Log In →" : "Sign up →"}
          <BottomGradient />
        </button>

        <div className="my-8 h-px w-full bg-linear-to-r from-transparent via-neutral-300 to-transparent" />

        <h2
          onClick={() => setIsLogin(!isLogin)}
          className="text-white cursor-pointer"
        >
          {isLogin ? "Don't have an Account?" : "Already have an Account?"}{" "}
          <span className="text-blue-600 font-semibold hover:underline">
            {isLogin ? "Sign Up" : "Log In"}
          </span>
        </h2>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Success! Please Logi.
        </Alert>
      </Snackbar>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-linear-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition group-hover/btn:opacity-100" />
  </>
);

export const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);
