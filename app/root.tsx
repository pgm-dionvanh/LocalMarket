import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import showNotification from "~/utils/notification/showNotification";
import { getUser } from "~/session.server";
import stylesheet from "~/tailwind.css";
import { CartProvider } from "react-use-cart";
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderArgs) => {
  return json({ user: await getUser(request) });
};

export default function App() {

  useEffect(() => {
 

    showNotification({ text: "Initialized", type: "success"});

  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen">
        <CartProvider>
        <Outlet />
        <Toaster />
        <ScrollRestoration />
        <Scripts />
        
        <LiveReload />
        </CartProvider>
        
      </body>
    </html>
  );
}
