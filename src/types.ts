/**
 * Metadata attached to the action creator.
 *
 * @template Type Value of the `type` field from the action.
 */
export interface ActionCreatorTypeMetadata<Type extends string> {
  getType?: () => Type;
  type: Type;
}

export type ActionCreator<T extends { type: string }> = ((
  ...args: any[]
) => T) &
  ActionCreatorTypeMetadata<T["type"]>;

/**
 * Returns the return type of the action creator.
 *
 * @template ActionCreatorOrMap Object or action creator to derive return value from.
 */
export type ActionType<ActionCreatorOrMap> =
  ActionCreatorOrMap extends ActionCreator<{ type: string }>
    ? ReturnType<ActionCreatorOrMap>
    : ActionCreatorOrMap extends Record<any, any>
      ? {
          [K in keyof ActionCreatorOrMap]: ActionType<ActionCreatorOrMap[K]>;
        }[keyof ActionCreatorOrMap]
      : // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ActionCreatorOrMap extends infer R
        ? never
        : never;
