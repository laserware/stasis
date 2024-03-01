import { defineConfig } from "tsup";

export default defineConfig(() => {
  const commonOptions = {
    clean: true,
    // This is forwarded to Redux, just in case:
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    entry: ["src/index.ts"],
    minify: false,
    sourcemap: true,
    tsconfig: "./tsconfig.build.json",
  };

  return [
    {
      ...commonOptions,
      dts: true,
      format: "esm",
      outExtension: () => ({ js: ".mjs" }),
    },
    {
      ...commonOptions,
      format: "cjs",
      outExtension: () => ({ js: ".cjs" }),
    },
  ];
});
