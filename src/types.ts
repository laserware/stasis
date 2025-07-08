/**
 * Metadata attached to the action creator.
 *
 * @template Type Value of the `type` field from the action.
 *
 * @internal
 */
interface ActionCreatorTypeMetadata<Type extends string> {
  getType?: () => Type;
  type: Type;
}

/**
 * Function that returns a valid Flux Standard Action.
 *
 * @internal
 */
type ActionCreatorFunction<T extends { type: string }> = (...args: any[]) => T;

/**
 * Signature for an action creator.
 *
 * @internal
 */
type ActionCreator<T extends { type: string }> = ActionCreatorFunction<T> &
  ActionCreatorTypeMetadata<T["type"]>;

/**
 * Returns the return type of the action creator.
 *
 * @template AC Object or action creator to derive return value from.
 */
export type ActionType<AC> = AC extends ActionCreator<{ type: string }>
  ? ReturnType<AC>
  : AC extends Record<any, any>
    ? {
        [K in keyof AC]: ActionType<AC[K]>;
      }[keyof AC]
    : // biome-ignore lint/correctness/noUnusedVariables: Needed for inference.
      AC extends infer R
      ? never
      : never;
