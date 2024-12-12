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
 * @template ACM Object or action creator to derive return value from.
 */
export type ActionType<ACM> =
  ACM extends ActionCreator<{ type: string }>
    ? ReturnType<ACM>
    : ACM extends Record<any, any>
      ? {
          [K in keyof ACM]: ActionType<ACM[K]>;
        }[keyof ACM]
      : // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ACM extends infer R
        ? never
        : never;
