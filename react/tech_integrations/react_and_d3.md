# Integrating D3 into React Projects

## Motivation

[D3](https://d3js.org/) is a powerful library that essentially lets a developer draw SVGs using data. It is a gold standard in the industry, and understanding how to use it will be invaluable to my career. Learning to utilize D3 exposes topics such as SVG manipulation, data visualization techniques, UX, and rendering animations.

The main issue of integrating D3 into React projects is that both React and D3 manipulate the DOM using different algorithms. This creates a unique challenge for developers as they must weigh the pros and cons of each approach used in the integrations.

React uses the [reconciliation algorithm](https://reactjs.org/docs/reconciliation.html) to understand which part of the DOM needs to be rerendered. This is accomplished through using `keys` specified on each component. IF the value of the `key` changes in the virtual DOM, then React knows that it must rerender content on the real DOM as well.

D3 uses a different approach to render content to the DOM. Rather than using a FAKE DOM, D3 creates elements inline, thus introducing a problem. How can the virtual DOM understand events that are happening on the real DOM without causing rendering issues?

- Possibly uses something called Data Joins
	- Elements that need to be created are inserted in the enter group.
	- Elements that need to be updated are inserted in the update group.
	- Elements that need to be removed are inserted in the exit group.

## Approaches to Integration

- Use a root React component to render an empty, customizable SVG.
- Wrap D3 methods in lifecycle methods. Pass D3 methods in as a method. The limitation here is that server side rendering is not possible with this approach.
- Use D3 for math and React for rendering. This is the approach Oliver will take.

### D3 in React (inline SVG)

This approach involves using a react component to render a `svg` element that will serve as the root of visualization. A boilerplate component might look something like this:

```jsx
class GraphRoot extends React.Component {

	componentDidUpdate() {
		// ...create chart with d3 helper methods
	}

	render() {
		<svg id='graphRoot'>
		</svg>
	}
}
```

__CON:__  The D3 code can become extensive and lead to a poor developer experience.

### Use `react-faux-dom` package

Developed by Oliver Caldwell, `react-faux-dom` was created to provide a good developer experience and separate D3 code from React code. Essentially a fake DOM is created, and if any shallow changes occur between the faux DOM and the virtual DOM, then the real DOM is updated.

With this approach the fake DOM is manipulated by D3 and rendered as a React component.

__CON:__ Less performant as it introduces a third DOM element to the application. Rely on third party library. 

__PRO:__ Allows for integration of most of the D3 API. Good for small to medium sized applications.


### Lifecycle Method Wrapping

In this method we make use of Lifecycle methods to create and modify the graph. Custom objects made up of functions can improve the readability of the code which leads to a better developer experience.

__CON__: Server side rendering is impossible.

__PRO__: DX is better, allows for the creation of a small D3 utility library.

### D3 for Math and React for the DOM

Create components that use d3 math to create svg elements such as lines and bars. The only real downside to this approach is that you loose the ability to interact with D3 transitions. 

A possible workaround to enable the use of D3 transitions would be to render empty SVG elements without attributes, then use D3 to add the attributes thus allowing D3 transitions to be able to be used in life cycles.

___

## Performance Tricks

D3 updates are more expensive than React rerenders because each time that D3 receives an update, it recomputes all of the helpers to check all data for possible updates. There are some ways to get around these performance hiccups though.

### Trick 1: Extract Tooltips

Tooltips are those cool little effects that happen when you hover over an element in a graph. Well hover or anything else you can do. If they have data, then the tooltips calculate much faster than rerendering the entire graph on a hover.

1. Add `mouseOver` and `mouseOut` event listeners to the SVG elements you want to interact with (lines, bars, etc).
2. Add a callback method that sets teh component state on the `mouseOver` event. This will trigger a rerender in React.
3. Use `setTimeout()` in the `mouseOut` callback function and `clearTimeout()` in the `mouseOver` callback function to make the animations seamless. When manipulating elements, you will change the margin ,padding, and other elements in the SVG. By delaying these we create smoother animations.

### Trick 2: Use CSS for Style Changes

Sure, D3 can influence styles, but it is less efficient. Instead, use CSS classes to style elements on the SVG.

### Trick 3: Use Pure Components

Pure components should be used with an immutable state and selectors. Pure components can increase the efficiency of a program by reducing the need of React to render all components in a tree. 

- Use `extend React.PureComponent` and the component will only update if the state and props in a shallow comparison change.

___

## References

- Iglesias, M. (2018, February 21). Bringing Together React, D3, And Their Ecosystem. Retrieved from https://www.smashingmagazine.com/2018/02/react-d3-ecosystem/
- Tiberghien, T. (2017, May 17). React D3.js: Balancing Performance & Developer Experience. Retrieved from https://medium.com/@tibotiber/react-d3-js-balancing-performance-developer-experience-4da35f912484