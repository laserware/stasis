import type { TypeConstant } from "./types";

export interface ActionCreatorTypeMetadata<TType extends TypeConstant> {
  getType?: () => TType;
}

export type ActionCreator<T extends { type: TypeConstant }> = ((
  ...args: any[]
) => T) &
  ActionCreatorTypeMetadata<T["type"]>;

export type ActionType<TActionCreatorOrMap> =
  TActionCreatorOrMap extends ActionCreator<{ type: TypeConstant }>
    ? ReturnType<TActionCreatorOrMap>
    : TActionCreatorOrMap extends Record<any, any>
    ? {
        [K in keyof TActionCreatorOrMap]: ActionType<TActionCreatorOrMap[K]>;
      }[keyof TActionCreatorOrMap]
    : // eslint-disable-next-line @typescript-eslint/no-unused-vars
    TActionCreatorOrMap extends infer R
    ? never
    : never;

/**
 * Returns true if the specified action is an action created by the specified
 * action creator.
 * @param actionCreatorOrCreators Action creator(s) to check against.
 * @param action Action to check.
 */
export function isActionOf<
  TActionCreator extends ActionCreator<{ type: TypeConstant }>,
>(
  actionCreatorOrCreators: TActionCreator | TActionCreator[],
  action: { type: TypeConstant },
): action is ReturnType<TActionCreator> {
  const actionCreators = Array.isArray(actionCreatorOrCreators)
    ? actionCreatorOrCreators
    : [actionCreatorOrCreators];

  return actionCreators.some(
    (actionCreator) => action.type === actionCreator.toString(),
  );
}
