import type { AnyAction } from "@reduxjs/toolkit";
import type { SagaIterator } from "redux-saga";
import { put } from "redux-saga/effects";

/**
 * Forwards the action emitted from an event channel and pushes it to global
 * state.
 */
export function* forwardChannelAction(action: AnyAction): SagaIterator {
  yield put(action);
}
