# Responsive Design

| Section | Title |
|---|---|
| I. | [Thinking Responsively](#thinking-responsively) |
| II. | [Mobile First Layouts](#mobile-first-layouts) |
| III. | [Responsive Typography](#responsive-typography) |

## Steps to Building Responsive Content

1. Determine the elements required for the component / layout being designed and write the HTML (including CSS class names). Use semantic HTML.
2. [Define the Typography. This includes the following for headings, texts, call to actions, and subheadings](#responsive-typography):
	- Color
	- Font family
	- Font weight
	- Font size
3. Create a mobile layout with appropriate CSS

___

## Thinking Responsively

Before getting into the nitty gritty of it all - it is important to understand the types of units that can be worked with, and how to use them.

### - Absolute Units

Absolute units are values which are fixed and are usually set with `px` values. Usually we would want to specify absolute units so that the element will have a consistent size regardless of the screen size.

### - Percentages

Used to define the size of an element relative to it's parent. Set with `%`

### - Relative Units

There are two types of relative units: `em` and `rem`.

- `em` - sets size relative to the size of the parent element.
- `rem` - sets size relative to the size of the root element.

#### The Case for `em` Sizing

`em` sizing is not a good idea for fonts because of inheritance. Since `em` sizing is relative to the parent element font size, you might end up calculating different sized fonts than you want in nested elements. Instead, use `em` sizing to set margins and padding so that the margins and paddings correspond to their parent containers.

### Rule of Tumb for Sizing Elements

| Property | CSS Unit |
|---|---|
| Font Size | `rem` |
| Padding / Margin | `em` |
| Widths | `em` or `%` |

___

## Mobile First Layouts

There are a number of reasons to build digital content with a mobile first approach. One argument that can be made is that mobile layouts are simpler, thus require less planning and can be built faster - another is that content will load faster on mobile devices if you use media queries correctly.

A strategy for developing responsive layouts is to use either `flexbox` or `grid` and specify whether certain elements should be set to `column` or `row` based on screen size. To further build on this concept, you can add the `order` property to nested elements to change their location within the parent element.

Develop CSS classes as if the content were only for mobile - that means that we will use media queries for setting content on tablets and desktops rather than the other way around.

___

## Responsive Typography

### - Size Body Text Appropriately

By using a scale for different screen sizes, most everything will flow from there. Set the base font (root) to 100% and each browser will make that font a size most users can read on a device.

Scale your Typography with regard to reading such that font sizes increase from mobile to desktop (in a mobile first approach).

### - Watch the Measure

The width of block of text - also referred to as a measure - affects how comfortable the text is to read. Try to stick to **45 to 75** characters per line when on a desktop.

**For a mobile first approach use a shorter measure to avoid text getting too small.**

You can set a `max-width` declaration, or progressively increase padding to avoid excssive measures on large screens.

Below is one strategy for adjusting the root element font size and measure.

```CSS
@media screen and (min-width:1200px) {
    body { font-size:110%; } /* Increase the font size */
}
@media screen and (min-width:1400px) {
    html { padding:0 15%; } /* Reduce the container width */
}
@media screen and (min-width:1600px) {
    body { font-size:125%; } /* Increase the font size */
}
@media screen and (min-width:1800px) {
    html { padding:0 20%; } /* Reduce the container width */
}
```

### - Use Visual Variation Over Size

Using larger headers on a desktop might work, but when applied to a mobile screen, the larger headers end up pushing body text down leading to a poor UX. 

On small screens, format subheads using style variations such as uppercase, small caps, italic, or bold at the same font size.

### - Choose Fonts Wisely

Choose fonts sparingly, do not load too much, and use multiple weights, small caps, and condensed variants for appearance, page weight, and render speed.
___

## References

- Banks, A. (2018, January 4). 9 responsive typography tips. Retrieved from https://www.creativebloq.com/rwd/expert-responsive-typography-tips-101517572

- Powell, K. (2019, September 3). How to think responsively: a responsive web design tutorial. Retrieved from https://www.freecodecamp.org/news/how-to-start-thinking-responsively/