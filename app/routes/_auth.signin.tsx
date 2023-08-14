import type { V2_MetaFunction, LoaderArgs, ActionArgs } from "@remix-run/node";
import HomeSideBar from "./../components/ui/sidebar/HomeSideBar"
import { json, redirect } from "@remix-run/node";
import { Link, useSearchParams } from "@remix-run/react";
import { safeRedirect } from "~/utils";
import { verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import {
  ValidatedForm,
  validationError,
} from "remix-validated-form";
import { FormTextInput } from "~/components/ui/form/inputWithError";

import { SignInValidator } from "~/validators/signInValidator";


export const meta: V2_MetaFunction = () => [{ title: "Local Market ~ Login" }];

export const loader = async ({ request }: LoaderArgs) => {
    const userId = await getUserId(request);
    if (userId) return redirect("/");
    return json({});
};

export const action = async ({ request }: ActionArgs) => {
  const data = await SignInValidator.validate(
    await request.formData()
  ); /* Validate the form data against the validator */	

  if (data.error) return validationError(data.error); /* Run this before axios request, no point in wasting a request if the form is invalid */

    /* else destruct data */
  const { email, password, redirectTo } = data.data;
  
  const user = await verifyLogin(email, password);
  
  const redirectPlace = safeRedirect(redirectTo, "/company/dashboard");


  if (!user) {
      return json(
        { errors: { email: "Invalid email or password", password: null } },
        { status: 400 }
      );
  }
  
  return createUserSession({
      redirectPlace,
      remember: false,
      request,
      userId: user.id,
    });
  };
  

export default function LoginPage() {
    const [searchParams] = useSearchParams();

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
                      <ValidatedForm validator={SignInValidator} method="post">
                        <input
                          type="hidden"
                          name="redirectTo"
                          value={searchParams.get('redirectTo') ?? undefined}
                        />

                        <FormTextInput
                          type="email"
                          label="Email"
                          name="email"
                          placeholder="yourname@email.com"
                        />

                      <FormTextInput
                          type="password"
                          label="Password"
                          name="password"
                          placeholder="********"
                        />

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
                        </ValidatedForm>
                      </div>
                    </div>
                  </div>
                </div>
            </main>
        </>
    );
}
