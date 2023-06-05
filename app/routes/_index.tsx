import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export const meta: V2_MetaFunction = () => [{ title: "Pgm - test" }];

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-gray-50 sm:flex sm:items-center sm:justify-center">
                {user ? (
                  <Link
                    to="/"
                    className="flex items-center justify-center rounded-md border border-transparent bg-blue-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-500 sm:px-8"
                  >
                    Welcome { user.email }
                  </Link>
                ) : (
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/join"
                      className="flex items-center justify-center rounded-md border border-transparent bg-blue-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-500 sm:px-8"
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center justify-center rounded-md bg-blue-500 px-4 py-3 font-medium text-white hover:bg-blue-600"
                    >
                      Log In
                    </Link>
                  </div>
                )}

    </main>
  );
}
