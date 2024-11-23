import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useContext, useState } from "react";
import { Button, Input, Label, TextField } from "react-aria-components";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export const meta: MetaFunction = () => {
  return [
    { title: "Login Page" },
    { name: "description", content: "Login page using React Aria Components and TailwindCSS" },
  ];
};

export default function Login() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      signIn({ email, password });
    } catch (err) {
      console.log(err)
      toast.error("E-mail ou senha inválidos.")
      setError("E-mail ou senha inválidos.");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg dark:bg-gray-800">
        <h1 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-6">Entrar</h1>
        {error && (
          <p className="mb-4 text-center text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        <form className="space-y-6" onSubmit={login}>
          <TextField className="w-full">
            <Label className="text-lg text-gray-700 dark:text-gray-300">E-mail</Label>
            <Input
              type="email"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Digite seu e-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </TextField>

          <TextField className="w-full">
            <Label className="text-lg text-gray-700 dark:text-gray-300">Senha</Label>
            <Input
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              type="password"
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}
            />
          </TextField>

          <Button
            type="submit"
            className="w-full p-3 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-800 dark:hover:bg-blue-700"
          >
            Entrar
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Ainda não tem uma conta?{" "}
          <Link to="/signup" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}
