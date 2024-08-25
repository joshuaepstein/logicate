import { loadEnvConfig } from "@next/env";
import { devices, PlaywrightTestConfig } from "@playwright/test";

const ci = process.env.CI === "true";

loadEnvConfig(process.cwd());

const port = process.env.PORT || 3002;
// Set webServer.url and url.baseURL with the location of the WebServer respecting the correct set port
const baseURL = `http://localhost:${port}`;

const config: PlaywrightTestConfig = {
  outputDir: "test-results/",
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  use: {
    viewport: { width: 1280, height: 720 },
    baseURL,
    permissions: ["clipboard-read"],
    trace: "retain-on-failure",
  },
  testDir: "./tests",
  webServer: ci
    ? {
        command: `NODE_ENV=test next start --port ${port}`,
        url: baseURL,
        reuseExistingServer: false,
      }
    : {
        command: `NODE_ENV=test next dev --port ${port}`,
        url: `http://localhost:${port}`,
        reuseExistingServer: true,
      },
  reporter: [
    [ci ? "github" : "list"],
    ["html", { open: !ci ? "on-failure" : "never" }],
  ],
  workers: 1,
};

export default config;
