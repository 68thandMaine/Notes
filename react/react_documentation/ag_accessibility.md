# Accessibility In React

Accessibility support is necessary to allow assistive technology to interpret webpages. React fully supports building accessible websites, often by using standard HTMLt techniques.

## WAI-ARIA

Stands for:

**W**eb

**A**ccessibility

**I**nitiative

**-**

**A**ccessible

**R**ich

**I**nternet

**A**pplications

All `aria-*` HTML attributes are jully supported in JSX and should be hyphen cased in React components (as opposed to camel case.)

[Click here for a guide to WAI-ARIA attributes](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics)


## Semantic HTML

Arguably the foundation of accessibility in a web application, semantic HTML reinforces the meaning of information in applications through using specific terms for sections of a document rather than `<div />`'s.

[Click here for a guide to using Semantic Html](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics)

Use React's `Frangment` component to group together multiple elements which are usually rendered with surrounding `<div/>`'s. Fragments allow us to form an invisible wrapper around components like list elements or table elements so we can return two elements without a `<div>` wrapper.

This allows us to map a collection of items to an array of fragments, just remember to use the `key` prop when doing so. 

```JSX
<Fragment key={item.id}>
	// ...some code
</Fragment>
```

Another cool workaround is to use short syntax for fragments (if you don't need any props on it)

```JSX
<>
	//... some code
</>
```

## Accessible Forms

### Labeling

For each HTML form control element such as `<input>` and `<textarea>` should be labeled accessibly so that screen readers can use them. Note that when labeling from controls in React you need to use `htmlFor` rather than `for`.

```JSX
<label htmlFor="nameInput">Name</label>
<input id='nameInput' type='text' name='nameInput'>
```

## Error Notifications

It is a good idea to inform users of any errors - that means screen readers also need to be aware of error messages.

[Click this link for a tutorial on Accessible User Notifications](https://www.w3.org/WAI/tutorials/forms/notifications/)

## Focus Control

Web applications should be fully operable via keyboard only.

___

## References

- Accessibility. (n.d.). Retrieved from https://reactjs.org/docs/accessibility.html
- HTML elements reference. (n.d.). Retrieved from https://developer.mozilla.org/en-US/docs/Web/HTML/Element
- WAI-ARIA basics. (n.d.). Retrieved from https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics