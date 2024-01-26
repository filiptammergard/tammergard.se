---
slug: difference-between-usestate-and-usememo
title: Difference between useState and useMemo
authors: [filip]
tags: [react]
---

The title of this post might seem ridiculous. Of course `useState` and `useMemo` are different.

But in one sense, they are quite similar.

Consider this example:

```ts
const [state] = useState(() => {
	return calculateSomething(input)
})

const memo = useMemo(() => {
	return calculateSomething(input)
}, [input])
```

<!-- truncate -->

In this case, `useState` is used without a `set` function, which means `state` cannot be changed programmatically—kind of like `useMemo`.

The difference is the dependency array of `useMemo`. When `input` changes, `memo` will be updated accordingly. In contrast, `state` will stay the same. The reason is that the initializer function will only run when initializing the component, but it won't "react" to updates to `input`.

In [the `useState` docs](https://react.dev/reference/react/useState), this is said about the initializer function:

> It should be pure, should take no arguments, and should return a value of any type.

The reason it should take to arguments is probably for this exact reason. Letting the function take arguments is weird since React won't care about those arguments being updated.

## References

- https://react.dev/reference/react/useState
- https://react.dev/reference/react/useMemo
- https://react.dev/learn/keeping-components-pure
