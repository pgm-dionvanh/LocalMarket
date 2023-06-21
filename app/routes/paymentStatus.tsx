import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import axios from "axios";

export const loader = async ({params}) => {

    return json({ message: params.id })
};
