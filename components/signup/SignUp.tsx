"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

interface UserInfo {
  email: string;
  password: string;
}

function SignUp() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    password: "",
  });
  const [toggleUser, setToggleUser] = useState<boolean>(true);
  const router = useRouter();
  const handleUserInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      email: userInfo.email,
      password: userInfo.password,
    };

    try {
      let response;

      if (toggleUser) {
        const confirmPassword = (
          document.getElementById("confirm-password") as HTMLInputElement
        )?.value;
        if (userInfo.password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }

        response = await axios.post(
          "http://localhost:8000/api/admin/signup",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        // Login
        response = await axios.post(
          "http://localhost:8000/api/admin/login",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.user.id);
          window.dispatchEvent(new Event("login"));
          setTimeout(() => {
            router.push("/sales");
          }, 100);
        }
      }

      console.log(response.data, "response");
      if (response?.data?.user?.email && response?.data?.user?.id) {
        localStorage.setItem("email", response?.data?.user?.email);
        localStorage.setItem("userId", response?.data?.user?.id);
        setToggleUser(false);
      }
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      alert("Something went wrong");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        <div className="hidden lg:block">
          <Image
            src="/images/a-icons.png"
            alt="Signup"
            width={100}
            height={100}
            className="w-full object-cover"
            priority
          />
        </div>

        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-full">
          <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                {toggleUser ? "Create your account" : "Sign In"}
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleUserInfo}
                    value={userInfo.email}
                    placeholder="name@company.com"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    onChange={handleUserInfo}
                    value={userInfo.password}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                {toggleUser && (
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirm-password"
                      id="confirm-password"
                      placeholder="••••••••"
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 rounded-lg text-sm px-5 py-2.5"
                >
                  {toggleUser ? "Sign up" : "Sign In"}
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  {toggleUser
                    ? "Already have an account?"
                    : "Don’t have an account?"}{" "}
                  <span
                    onClick={() => setToggleUser(!toggleUser)}
                    className="font-medium text-primary-600 hover:underline cursor-pointer"
                  >
                    {toggleUser ? "Sign in" : "Sign up"}
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
