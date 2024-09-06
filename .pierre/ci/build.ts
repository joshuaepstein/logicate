import { run } from "pierre";

export default () => {
  run("pnpm build", {
    label: "Build project.",
  });
};
