import { run } from "pierre";

export default async () => {
  await run("pnpm build", {
    label: "Build project.",
  });
};
