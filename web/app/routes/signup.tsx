import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button, Input, Label, TextField } from "react-aria-components";

export const meta: MetaFunction = () => {
    return [
        { title: "Login Page" },
        { name: "description", content: "Login page using React Aria Components and TailwindCSS" },
    ];
};

export default function Signup() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg dark:bg-gray-800">
                <h1 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-6">Cadastre-se</h1>
                <form className="space-y-6">
                    <TextField className="w-full">
                        <Label className="text-lg text-gray-700 dark:text-gray-300">Nome</Label>
                        <Input
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Digite seu nome"
                        />
                    </TextField>
                    <TextField className="w-full">
                        <Label className="text-lg text-gray-700 dark:text-gray-300">E-mail</Label>
                        <Input
                            type="email"
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Digite seu e-mail"
                        />
                    </TextField>

                    <TextField className="w-full">
                        <Label className="text-lg text-gray-700 dark:text-gray-300">Senha</Label>
                        <Input
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            type="password"
                            placeholder="Digite sua senha"
                        />
                    </TextField>

                    <Button
                        className="w-full p-3 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-800 dark:hover:bg-blue-700"
                    >
                        Criar conta
                    </Button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    Já tem uma conta?{" "}
                    <Link to="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">Entrar</Link>
                </p>
            </div>
        </div>
    );
}