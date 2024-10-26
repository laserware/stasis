import { createAction, type PayloadActionCreator } from "@reduxjs/toolkit";

/**
 * Action creator for an async action.
 *
 * @template RequestPayload Type of the request action payload.
 * @template SuccessPayload Type of the success action payload.
 * @template FailurePayload Type of the failure action payload.
 * @template Type Value of the `type` field in the action.
 */
export interface AsyncActionCreator<
  RequestPayload,
  SuccessPayload,
  TFailurePayload,
  Type extends string = string,
> {
  request: PayloadActionCreator<RequestPayload, `${Type}Request`>;
  success: PayloadActionCreator<SuccessPayload, `${Type}Success`>;
  failure: PayloadActionCreator<TFailurePayload, `${Type}Failure`>;
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
 * @template RequestPayload Type of the request action payload.
 * @template SuccessPayload Type of the success action payload.
 * @template FailurePayload Type of the failure action payload.
 * @template Type Value of the `type` field in the action.
 */
export function createAsyncAction<
  RequestPayload,
  SuccessPayload,
  FailurePayload,
  Type extends string = string,
>(
  type: Type,
): AsyncActionCreator<RequestPayload, SuccessPayload, FailurePayload, Type> {
  return {
    request: createAction<RequestPayload, `${Type}Request`>(`${type}Request`),
    success: createAction<SuccessPayload, `${Type}Success`>(`${type}Success`),
    failure: createAction<FailurePayload, `${Type}Failure`>(`${type}Failure`),
  };
}
