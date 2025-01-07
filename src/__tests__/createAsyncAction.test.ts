import { describe, expect, it } from "bun:test";

import { createAsyncAction } from "../createAsyncAction.js";

describe("the createAsyncAction function", () => {
  it("returns an object with a request, success, and failure action creator", () => {
    const result = createAsyncAction<undefined, string, undefined>("@test/result");

    expect(result.request()).toEqual({ type: "@test/resultRequest", payload: undefined });
    expect(result.success("Test")).toEqual({ type: "@test/resultSuccess", payload: "Test" });
    expect(result.failure()).toEqual({ type: "@test/resultFailure", payload: undefined });
  });
});
