import type { V2_MetaFunction, LoaderArgs } from "@remix-run/node";
import HomeSideBar from "./../components/ui/sidebar/HomeSideBar"
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { safeRedirect, validateEmail } from "~/utils";
import { verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { X } from 'react-feather';


export const meta: V2_MetaFunction = () => [{ title: "Local Market ~ Login" }];

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
    const remember = formData.get("remember");
  
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
  
    const user = await verifyLogin(email, password);
  
    if (!user) {
      return json(
        { errors: { email: "Invalid email or password", password: null } },
        { status: 400 }
      );
    }
  
    return createUserSession({
      redirectTo,
      remember: false,
      request,
      userId: user.id,
    });
  };
  

export default function LoginPage() {
    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") || "/";
    const actionData = useActionData<typeof action>();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
  
    useEffect(() => {
      if (actionData?.errors?.email) {
        emailRef.current?.focus();
      } else if (actionData?.errors?.password) {
        passwordRef.current?.focus();
      }
    }, [actionData]);

    return (
        <>
            <HomeSideBar/>
            <main className="flex-1 items-center justify-center px-4">
              <div className="mx-auto mt-12 w-full max-w-md">
                <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                  <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl text-gray-900">
                      Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                      Or{' '}
                      <Link
                        to="/signup"
                        className="font-medium text-primary-600 hover:text-primary-500"
                      >
                        register a new account
                      </Link>
                    </p>
                  </div>

                  <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                      <Form method="post">
                        <input
                          type="hidden"
                          name="redirectTo"
                          value={searchParams.get('redirectTo') ?? undefined}
                        />
                        <div>

                          {actionData?.errors.email && (
                              <div className="flex">
                                <div className="flex-shrink-0">
                                  <X className="h-5 w-5 text-red-400" aria-hidden="true" />
                                </div>
                                <div className="ml-3">
                                  <h3 className="text-sm font-medium text-red-800">
                                    {actionData.errors.email}
                                  </h3>
                                </div>
                              </div>
                          )}
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
                              required
                              placeholder="Email address"
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:text-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
                            />
                          </div>
                        </div>

                        <div className="mt-4">
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
                              required
                              placeholder="Password"
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:text-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
                            />
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              id="rememberMe"
                              name="rememberMe"
                              type="checkbox"
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                              defaultChecked
                            />
                            <label
                              htmlFor="rememberMe"
                              className="ml-2 block text-sm text-gray-900"
                            >
                              Remember me
                            </label>
                          </div>

                          <div className="text-sm">
                            
                            <a
                              href="#"
                              className="font-medium text-primary-600 hover:text-primary-500"
                            >
                              Forgot your password?
                            </a>
                          </div>
                        </div>
                        <div>
                          <button type="submit" className="w-full flex justify-center mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF5C28] hover:bg-[#ba3d14] hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                            Login
                          </button>
                        </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
            </main>
        </>
    );
}
