import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button, Input, Label, TextField } from "react-aria-components";

export const meta: MetaFunction = () => {
  return [
    { title: "Login Page" },
    { name: "description", content: "Login page using React Aria Components and TailwindCSS" },
  ];
};

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg dark:bg-gray-800">
        <h1 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-6">Login</h1>
        <form className="space-y-6">
          <TextField className="w-full">
            <Label className="text-lg text-gray-700 dark:text-gray-300">Email</Label>
            <Input
              type="email"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your email"
            />
          </TextField>

          <TextField className="w-full">
            <Label className="text-lg text-gray-700 dark:text-gray-300">Password</Label>
            <Input
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              type="password"
              placeholder="Enter your password"
            />
          </TextField>

          <Button
            className="w-full p-3 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-800 dark:hover:bg-blue-700"
          >
            Login
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
