import { NextRequest } from "next/server";

export const parse = (req: NextRequest) => {
  let domain = req.headers.get("host") as string;

  // remove www. from domain and convert to lowercase
  domain = domain.replace("www.", "").toLowerCase();

  let path = req.nextUrl.pathname;

  const searchParams = req.nextUrl.searchParams.toString();
  const searchParamsString = searchParams.length > 0 ? `?${searchParams}` : "";
  const fullPath = `${path}${searchParamsString}`;

  const key = decodeURIComponent(path.split("/")[1]);
  const fullKey = decodeURIComponent(path.slice(1));

  return {
    domain,
    path,
    fullPath,
    key,
    fullKey,
    searchParamsString,
  };
};
