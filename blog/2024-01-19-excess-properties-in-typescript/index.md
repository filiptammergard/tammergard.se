---
slug: excess-properties-in-typescript
title: Excess properties in TypeScript
authors: [filip]
tags: [typescript]
---

Properties defined on an object that are not expressed by the type of the object are called excess properties.

Here's an example:

```ts
type Person = {
	firstName: string
}

const person: Person = {
	firstName: "Filip",
	lastName: "Tammergård", // ⛔️ Object literal may only specify known properties, and 'lastName' does not exist in type 'Person'.
}
```

In this case, TypeScript makes it clear that `lastName` is not defined in the `Person` type and is therefore not allowed.

<!-- truncate -->

However, in other cases, TypeScript does not check for excess properties:

```ts
type Person = {
	firstName: string
}

const personDetails = {
	lastName: "Tammergård",
}

const person: Person = {
	firstName: "Filip",
	...personDetails, // 👍 This is fine!
}
```

This is, to me, a pretty weird thing about TypeScript—but it is [well documented in the docs](https://www.typescriptlang.org/docs/handbook/interfaces.html).

Notice that is does not have to do with the spread syntax specifically, but rather that TypeScript does not run excess property checks on objects when they are defined separately.

Here's another example:

```ts
type Person = {
	firstName: string
}

function printPerson(p: Person) {
	console.log(p.firstName)
}

printPerson({
	firstName: "Filip",
	lastName: "Tammergård", // ⛔️ Object literal may only specify known properties, and 'lastName' does not exist in type 'Person'.
})
```

In this case, TypeScript errors on passing `lastName` where it's not expressed in the function parameter type.

Let's assign the object to a variable and pass that to `printPerson` instead:

```ts
type Person = {
	firstName: string
}

function printPerson(p: Person) {
	console.log(p.firstName)
}

const person = {
	firstName: "Filip",
	lastName: "Tammergård",
}

printPerson(person) // 👍 This is fine!
```

TypeScript being a structural type system means it checks _minimum_ requirements rather than _exact_ requirements—at least in some cases.

The reason TypeScript is doing excess property checks when passing an "inline" object is probably since it won't be used anywhere else and [TypeScript can assume the excess property is a mistake](https://twitter.com/AndaristRake/status/1748250533331136947).

## References

- https://www.typescriptlang.org/docs/handbook/interfaces.html
- https://github.com/microsoft/TypeScript/issues/12936#issuecomment-284590083
- https://twitter.com/AndaristRake/status/1748250533331136947
