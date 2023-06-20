import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import HomeSideBar from "./../components/ui/sidebar/HomeSideBar"
import { X } from 'react-feather';

import { createUser, getUserByEmail } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 }
    );
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json(
      {
        errors: {
          email: "A user already exists with this email",
          password: null,
        },
      },
      { status: 400 }
    );
  }

  const user = await createUser(email, password);

  return createUserSession({
    redirectTo,
    remember: false,
    request,
    userId: user.id,
  });
};

export const meta: V2_MetaFunction = () => [{ title: "Sign Up" }];

export default function SignUpPage() {
    const [searchParams] = useSearchParams();
    const formErrors = useActionData();
    return (
    <>
    <HomeSideBar/>
        <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl text-gray-900">
                Create a new account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                Or{' '}
                <Link
                to="/signin"
                className="font-medium text-primary-600 hover:text-primary-500"
                >
                login to your existing account
                </Link>
            </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <Form className="space-y-6" method="post">
                <input
                    type="hidden"
                    name="redirectTo"
                    value={searchParams.get('redirectTo') ?? undefined}
                />
                <div>
                    <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                    >
                    Email address
                    </label>
                    <div className="mt-1">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                    {formErrors?.email && (
                        <div className="text-xs text-red-700">
                        {formErrors.email}
                        </div>
                    )}
                    </div>
                </div>

                <div>
                    <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                    >
                    First name
                    </label>
                    <div className="mt-1">
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                    </div>
                </div>

                <div>
                    <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                    >
                    Last name
                    </label>
                    <div className="mt-1">
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                    </div>
                </div>

                <div>
                    <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                    >
                    Password
                    </label>
                    <div className="mt-1">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                    {formErrors?.password && (
                        <div className="text-xs text-red-700">
                        {formErrors.password}
                        </div>
                    )}
                    </div>
                </div>
                <div>
                    <label
                    htmlFor="repeatPassword"
                    className="block text-sm font-medium text-gray-700"
                    >
                    Repeat Password
                    </label>
                    <div className="mt-1">
                    <input
                        id="repeatPassword"
                        name="repeatPassword"
                        type="password"
                        autoComplete="current-password"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                    {formErrors?.repeatPassword && (
                        <div className="text-xs text-red-700">
                        {formErrors.repeatPassword}
                        </div>
                    )}
                    </div>
                </div>
                {formErrors?.form && (
                    <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                        <X/>
                        </div>
                        <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                            We ran into a problem while creating your account!
                        </h3>
                        <p className="text-sm text-red-700 mt-2">
                            {formErrors.form}
                        </p>
                        </div>
                    </div>
                    </div>
                )}

                <div>
                    <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF5C28] hover:bg-[#ba3d14] hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                    Sign up
                    </button>
                </div>
                </Form>
            </div>
            </div>
        </div>
    </>
    );
}