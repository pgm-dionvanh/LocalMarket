import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useActionData, useSearchParams } from "@remix-run/react";
import HomeSideBar from "./../components/ui/sidebar/HomeSideBar"
import { createUser, getUserByEmail } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect } from "~/utils";
import {
  ValidatedForm,
  validationError,
} from "remix-validated-form";
import { SignUpValidator } from "~/validators/signUpValidator";
import { FormTextInput } from "~/components/ui/form/inputWithError";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};



export const action = async ({ request }: ActionArgs) => {
  const data = await SignUpValidator.validate(
    await request.formData()
  ); /* Validate the form data against the validator */	

  if (data.error) return validationError(data.error); /* Run this before axios request, no point in wasting a request if the form is invalid */

  /* else destruct data */
  const { firstName, lastName, email, vat, password, redirectTo } = data.data;

  
  const redirectPlace = safeRedirect(redirectTo, "/company/dashboard");
  



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

  const user = await createUser(email, password, vat, firstName, lastName);

  return createUserSession({
    redirectPlace,
    remember: false,
    request,
    userId: user.id,
  });
};

export const meta: V2_MetaFunction = () => [{ title: "Sign Up" }];

export default function SignUpPage() {
    const [searchParams] = useSearchParams();
    const data = useActionData();

    console.log(data)

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
            <p className="mt-2 text-center text-sm text-red-600">
              Only company's can create an account
            </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <ValidatedForm validator={SignUpValidator} className="space-y-6" method="post">
                <input
                    type="hidden"
                    name="redirectTo"
                    value={searchParams.get('redirectTo') ?? "/company/dashboard"}
                />
                <FormTextInput
                  type="email"
                  label="Email"
                  name="email"
                  placeholder="yourname@email.com"
                />

                <FormTextInput
                  type="text"
                  label="First name"
                  name="firstName"
                  placeholder="John"
                />

                <FormTextInput
                  type="text"
                  label="Last name"
                  name="lastName"
                  placeholder="Doe"
                />
                
                <FormTextInput
                  type="password"
                  label="Password"
                  name="password"
                  placeholder="********"
                />

                <FormTextInput
                  type="password"
                  label="Repeat Password"
                  name="repeatPassword"
                  placeholder="********"
                />
                
                <FormTextInput
                  type="text"
                  label="Vat Number"
                  name="vat"
                  placeholder="BE123456789"
                />
                <div>
                    <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF5C28] hover:bg-[#ba3d14] hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                    Sign up
                    </button>
                </div>
              </ValidatedForm>
            </div>
            </div>
        </div>
    </>
    );
}