import { createAction, type PayloadActionCreator } from "@reduxjs/toolkit";

export interface AsyncActionCreator<
  TRequestPayload,
  TSuccessPayload,
  TFailurePayload,
  TType extends string = string,
> {
  request: PayloadActionCreator<TRequestPayload, `${TType}Request`>;
  success: PayloadActionCreator<TSuccessPayload, `${TType}Success`>;
  failure: PayloadActionCreator<TFailurePayload, `${TType}Failure`>;
}

/**
 * Returns an object with an action creator representing the stages of an
 * async action:
 * 1. Initializing/requesting that the async action be performed
 * 2. Success if the async action succeeded
 * 3. Failure if the async action failed
 *
 * You only need to provide the base type name (i.e. @app/somethingAsync) and
 * the following action types will be created:
 * - @app/somethingAsyncRequest
 * - @app/somethingAsyncSuccess
 * - @app/somethingAsyncFailure
 */
export function createAsyncAction<
  TRequestPayload,
  TSuccessPayload,
  TFailurePayload,
  TType extends string = string,
>(
  type: TType,
): AsyncActionCreator<
  TRequestPayload,
  TSuccessPayload,
  TFailurePayload,
  TType
> {
  return {
    request: createAction<TRequestPayload, `${TType}Request`>(`${type}Request`),
    success: createAction<TSuccessPayload, `${TType}Success`>(`${type}Success`),
    failure: createAction<TFailurePayload, `${TType}Failure`>(`${type}Failure`),
  };
}
