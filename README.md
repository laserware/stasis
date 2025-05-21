# Stasis

State management using Redux libraries.

This library forwards exports from [Redux Toolkit](https://redux-toolkit.js.org) and [ReduxSaga](https://redux-saga.js.org).

> [!NOTE]
> I use both of these libraries heavily in several of my projects and it makes it easier to update 
> a single dependency, rather than keep two up-to-date.

This library also provides the following additional APIs:

- `createAsyncAction`: Custom async action creator based on the [`createAsyncAction` export from `typesafe-actions`](https://github.com/piotrwitek/typesafe-actions?tab=readme-ov-file#createasyncaction)
- `ActionType`: Utility type that allows you to get the action `type` and `payload` types from the action
- `forwardChannelAction`: Simple utility function for dispatching actions emitted from an [`EventChannel`](https://redux-saga.js.org/docs/api#eventchannelsubscribe-buffer)

## Usage

Consult the Redux Toolkit and Redux Saga documentation for usage of forwarded exports.

> [!IMPORTANT]
> The exports from `redux-saga/effects` are forwarded directly, as well as via an `effects` object.
> If your build tool supports tree-shaking, any unused exports will be excluded from the resulting build.

The example below exhibits how to use the additional exports.

```ts
import {
  createAsyncAction,
  all, // Import individual effects
  effects as E, // Or all of them 
  eventChannel,
  forwardChannelAction,
  type ActionType,
  type EventChannel,
  type SagaIterator,
} from "@laserware/stasis";

type Request = { value: string };

export const doSomething = createAsyncAction<
  Request, // Payload for the `.request` action. 
  string,  // Payload for the `.success` action.
  string   // Payload for the `.failure` action.
>("@app/doSomething");

export function* someSaga(): SagaIterator {
  yield all([
    E.takeEvery(doSomething.request, handleRequestSaga),
    E.takeEvery(doSomething.success, handleSuccessSaga),
    E.takeEvery(doSomething.failure, handleFailureSaga),
  ]);
}

function* handleRequestSaga(
  action: ActionType<typeof doSomething.request>,
): SagaIterator {
  // TypeScript knows this is a `Request` because of the `ActionType`
  // annotation above:
  const value = action.payload.value;
  
  const resizeChannel = yield E.call(createResizeChannel);
  
  // This will dispatch the action whenever the window is resized:
  yield E.takeEvery(resizeChannel, forwardChannelAction);
  // ...
}

function* handleSuccessSaga(
  action: ActionType<typeof doSomething.success>,
): SagaIterator {
  // TypeScript knows this is a string because of the `ActionType`
  // annotation above:
  const value = action.payload;
  
  // ...
}

function* handleFailureSaga(
  action: ActionType<typeof doSomething.failure>,
): SagaIterator {
  // TypeScript knows this is a string because of the `ActionType`
  // annotation above:
  const value = action.payload;
  
  // ...
}

function createResizeChannel(): EventChannel<
  ActionType<typeof doSomething.success>
> {
  return eventChannel((emit) => {
    const handleWindowResize = () => {
      emit(doSomething.success());
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
}
```

## Development

You'll need to install Bun prior to doing any development. Once installed, run `bun install` to install dependencies.

