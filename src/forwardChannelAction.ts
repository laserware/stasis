import type { UnknownAction } from "@reduxjs/toolkit";
import type { SagaIterator } from "redux-saga";
import { put } from "redux-saga/effects";

/**
 * Forwards the action emitted from an event channel and pushes it to global
 * state.
 *
 * @param action Any action emitted from an EventChannel that should be dispatched.
 */
export function* forwardChannelAction(action: UnknownAction): SagaIterator {
  yield put(action);
}
