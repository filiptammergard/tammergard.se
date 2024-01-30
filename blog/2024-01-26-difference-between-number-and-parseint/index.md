---
slug: difference-between-number-and-parseint
title: Difference between Number() and parseInt()
authors: [filip]
tags: [javascript]
---

While `Number()` and `parseInt()` are similar, there are important differences. Let's explore them!

<!-- truncate -->

```ts
Number(true) // 1
Number(false) // 0

Number(3) // 3
Number(03) // 3

Number("3") // 3

Number(+3) // 3
Number("+3") // 3

Number(-3) // -3
Number("-3") // -3

Number("03") // 3

Number(" 3") // 3
Number("3 ") // 3

Number(3_300) // 3300
Number("3_300") // NaN

Number("") // 0
Number(null) // 0
Number(undefined) // NaN
Number([]) // 0
Number([[]]) // 0
Number([{}]) // NaN
Number({}) // NaN
Number(NaN) // NaN

Number([3]) // 3
Number([[3]]) // 3
Number([[[3]]]) // 3

Number(3n) // 3
Number("3n") // NaN
```

`Number()` definitely has its quirks. Let's play around with `parseInt()`:

```ts
parseInt(true) // NaN
parseInt(false) // NaN

parseInt(3) // 3
parseInt(03) // 3

parseInt("3") // 3

parseInt(+3) // 3
parseInt("+3") // 3

parseInt(-3) // -3
parseInt("-3") // -3

parseInt("03") // 3

parseInt(" 3") // 3
parseInt("3 ") // 3

parseInt(3_300) // 3300
parseInt("3_300") // 3

parseInt("3 hello") // 3
parseInt("3rd")

parseInt("") // NaN
parseInt(null) // NaN
parseInt(undefined) // NaN
parseInt([]) // NaN
parseInt([[]]) // NaN
parseInt([{}]) // NaN
parseInt({}) // NaN
parseInt(NaN) // NaN

parseInt([3]) // 3
parseInt([[3]]) // 3
parseInt([[[3]]]) // 3

parseInt(3n) // 3
parseInt("3n") // 3

parseInt(3.5) // 3
parseInt("3.5") // 3
```

There are some obvious—and not very interesting—differences:

- `Number()` can return any number privmitive, while `parseInt()` returns integers.
- `parseInt()` can convert a string to an integer of a specified radix.

The more interesting differences include:

```ts
Number("3 hello") // NaN
parseInt("3 hello") // 3

Number([]) // 0
parseInt([]) // NaN

Number("3_300") // NaN
parseInt("3_300") // 3

Number(null) // 0
parseInt(null) // NaN
```

There's one fundamental difference between the two that is souce to many of these differences:

`Number()` takes a value of any type and tries to convert that value to a number primitive. `parseInt()`, on the other hand, only takes `string`. When passing a value of another type to `parseInt()`, it will first convert the value to a string and then it will try to convert it to an integer. If it cannot convert the value to a string, it will return `NaN`.

Let's make it concrete:

```ts
const emptyArray = []
const emptyArrayConverted = emptyArray.toString() // ""
parseInt(emptyArrayConverted) // NaN

const nonEmptyArray = [3]
const nonEmptyArrayConverted = nonEmptyArray.toString() // "3"
parseInt(nonEmptyArrayConverted) // 3
```

`[].toString` becomes an empty string, which means `parseInt([])` becomes `NaN`. On the other hand, `[3].toString()` becomes `"3"`, so that `parseInt([2])` becomes `3`.

Another important difference is that `parseInt()` parses from start to end. If it finds something parsable in the beginning of the string, it's happy with that. `Number()`, on the other hand, looks at the value as a whole and tries to convert it. If the value is not parsable as a whole, it won't be happy.

This knowledge explains these two differences:

```ts
Number("3 hello") // NaN
parseInt("3 hello") // 3

Number("3_300") // NaN
parseInt("3_300") // 3
```

Since `"3 hello"` and `"3_3000"` begin with something parsable `"3"`, `parseInt()` will use that, while `Number()` will return `NaN`.

## References

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/Number
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#number_coercion
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
- https://tammergard.se/blog/logical-or-operator-vs-nullish-coalescing-operator#truthy-and-falsy-values
