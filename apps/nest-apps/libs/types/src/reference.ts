export type Reference<Type, Key extends keyof Type> = {
  [k in Key]: Type[Key];
} & {
  __typename: string;
};
