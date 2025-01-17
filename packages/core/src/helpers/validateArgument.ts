export type Assertions<S extends Record<string, unknown>> = { [K in keyof S]: string }

export function validateArguments<S extends Record<string, unknown>>(args: S, assertions: Assertions<S>): void {
  for (const key of Object.keys(args) as (keyof S & string)[]) {
    if (typeof args[key] !== assertions[key]) {
      throw new Error(`Expected "${key}" to be of type "${assertions[key]}", got "${args[key]}" instead.`)
    }
  }
}
