import { type PayloadActionCreator, createAction } from "@reduxjs/toolkit";

/**
 * Object containing action creators for handling asynchronous actions.
 *
 * @template RP Type of the request action payload.
 * @template SP Type of the success action payload.
 * @template FP Type of the failure action payload.
 * @template Type Value of the `type` field in the action.
 */
export interface AsyncActionCreator<RP, SP, FP, Type extends string = string> {
  request: PayloadActionCreator<RP, `${Type}Request`>;
  success: PayloadActionCreator<SP, `${Type}Success`>;
  failure: PayloadActionCreator<FP, `${Type}Failure`>;
}

/**
 * Returns an object with an action creator representing the stages of an
 * async action:
 * 1. Initializing/requesting that the async action be performed
 * 2. Success if the async action succeeded
 * 3. Failure if the async action failed
 *
 * You only need to provide the base type name (i.e. app/somethingAsync) and
 * the following action types will be created:
 * - app/somethingAsyncRequest
 * - app/somethingAsyncSuccess
 * - app/somethingAsyncFailure
 *
 * @template RP Type of the request action payload.
 * @template SP Type of the success action payload.
 * @template FP Type of the failure action payload.
 * @template Type Value of the `type` field in the action.
 *
 * @param type Value to use for the `type` field of the action.
 *
 * @returns Object with a `.request`, `.success`, and `.failure` action creator.
 */
export function createAsyncAction<RP, SP, FP, Type extends string = string>(
  type: Type,
): AsyncActionCreator<RP, SP, FP, Type> {
  return {
    request: createAction<RP, `${Type}Request`>(`${type}Request`),
    success: createAction<SP, `${Type}Success`>(`${type}Success`),
    failure: createAction<FP, `${Type}Failure`>(`${type}Failure`),
  };
}
