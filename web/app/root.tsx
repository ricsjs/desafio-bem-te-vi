import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
 
import styles from "./index.css?url"
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
 
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];
 
export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AuthProvider>
          <ToastContainer />
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </AuthProvider>
      </body>
    </html>
  );
}