import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

import { logout } from "~/session.server";

export const action = async ({ request }: ActionArgs) => logout(request);

export const loader = async () => json({ message: "Payment status" });
