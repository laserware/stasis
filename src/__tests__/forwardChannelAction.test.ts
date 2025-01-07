import { describe, expect, it, mock } from "bun:test";

import { runSaga } from "redux-saga";

import { forwardChannelAction } from "../forwardChannelAction.js";

describe("the forwardChannelAction function", () => {
  it("dispatches the specified action via yield put", async () => {
    const dispatch = mock();

    const ACTION_FAKE = { type: "fakeAction" };

    runSaga({ dispatch }, forwardChannelAction, ACTION_FAKE);

    expect(dispatch).toHaveBeenCalledWith(ACTION_FAKE);
  });
});
