export interface ActionCreatorTypeMetadata<TType extends string> {
  getType?: () => TType;
  type: TType;
}

export type ActionCreator<T extends { type: string }> = ((
  ...args: any[]
) => T) &
  ActionCreatorTypeMetadata<T["type"]>;

export type ActionType<TActionCreatorOrMap> =
  TActionCreatorOrMap extends ActionCreator<{ type: string }>
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
  TActionCreator extends ActionCreator<{ type: string }>,
>(
  actionCreatorOrCreators: TActionCreator | TActionCreator[],
  action: { type: string },
): action is ReturnType<TActionCreator> {
  const actionCreators = Array.isArray(actionCreatorOrCreators)
    ? actionCreatorOrCreators
    : [actionCreatorOrCreators];

  // Exit as soon as the action is found:
  for (const actionCreator of actionCreators) {
    if (action.type === actionCreator.toString()) {
      return true;
    }
  }

  return false;
}
