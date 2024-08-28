import { NextRequest } from "next/server";
import { LogicateError } from "./error";

export const parseRequestBody = async (req: NextRequest) => {
  try {
    return req.json();
  } catch (error) {
    throw new LogicateError({
      code: "bad_request",
      message:
        "Invalid JSON format in request body. Please ensure the request body is a valid JSON object.",
    });
  }
};
