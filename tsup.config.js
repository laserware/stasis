import { defineConfig } from "tsup";

export default defineConfig(() => {
  const commonOptions = {
    clean: true,
    sourcemap: true,
    splitting: true,
    minify: false,
    tsconfig: "./tsconfig.build.json",
  };

  return [
    {
      ...commonOptions,
      entry: ["src/index.ts"],
      // This is forwarded to Redux, just in case:
      define: {
        "process.env.NODE_ENV": JSON.stringify("production"),
      },
      format: "esm",
      dts: true,
      outExtension: () => ({ js: ".mjs" }),
    },
    {
      ...commonOptions,
      entry: ["src/index.ts"],
      format: "cjs",
      outExtension: () => ({ js: ".cjs" }),
    },
  ];
});
