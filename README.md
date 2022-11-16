# Lighthouse Labs | HTML and CSS Breakout

[GitHub Repository Branch](https://github.com/WarrenUhrich/lighthouse-labs-html-and-css-breakout/tree/2022.11.16-web-flex-19sept2022)

* [ ] Common Elements
* [ ] External Stylesheets
* [ ] External Scripts
* [ ] Building a (Front-end Only) Web Page

## Common Elements

The most common HTML (HyperText Markup Language) elements that most any modern page include:

* `<!DOCTYPE html>` a document type declaration. Determines the syntax and elements allowed in the page; to make use of older syntaxes and elements consider adding additional attributes.
* `<html></html>` the HTML element; there may only be one. This element contains all of the web page, both rendered and non-rendered.
    * `<head></head>` the HEAD element; there may only be one. This element contains non-rendered elements, primarily configuration and meta information for the web page.
    * `<body></body>` the BODY element; there may only be one. This element contains all rendered elements and content for the web page.

## External Stylesheets

To include an external CSS file in your web page, add a `<link>` element to your page's `<head>` element. Do not forget to add the `rel` attribute with a value of `stylesheet`, or the browser will not:

```HTML
<!-- Relative paths start with a folder or file name, or begin with a "." -->
<link rel="stylesheet" href="RELATIVE/PATH/TO/YOUR/FILE.css">
<link rel="stylesheet" href="./RELATIVE/PATH/TO/YOUR/FILE.css">

<!-- Absolute paths start with a "/" or a domain -->
<link rel="stylesheet" href="/ABSOLUTE/PATH/TO/YOUR/FILE.css">
<link rel="stylesheet" href="http://localhost:3000/ABSOLUTE/PATH/TO/YOUR/FILE.css">
```

Make sure your file is loading in properly. A popular confirmation is turning the background red, as this is very obvious. Once you've confirmed that your file is working in the web page, remove the testing line:

```CSS
html { background-color: red; } /* See if your CSS is working. */
```

To include an external JavaScript file in your web page, add a `<script></script>` element with a populated `src` attribute to your page:

```HTML
<!-- Relative paths start with a folder or file name, or begin with a "." -->
<script src="RELATIVE/PATH/TO/YOUR/FILE.js"></script>
<script src="./RELATIVE/PATH/TO/YOUR/FILE.js"></script>

<!-- Absolute paths start with a "/" or a domain -->
<script src="/ABSOLUTE/PATH/TO/YOUR/FILE.js"></script>
<script src="http://localhost:3000/ABSOLUTE/PATH/TO/YOUR/FILE.js"></script>
```

## External JavaScript

Make sure your file is loading in properly. A popular confirmation is displaying an alert box, as this is very obvious. Once you've confirmed that your file is working in the web page, remove the testing line:

```JavaScript
alert('Your JavaScript file is running.');
```

**Does your JavaScript file require access to elements in the web page (the DOM)?** If yes, you will want to take some additional considerations. Consider the following:

```JavaScript
// Target element.
const changeMeP = document.getElementById('change-me');
console.log('changeMeP:', changeMeP); // Check if you got it!
```

```HTML
<!DOCTYPE html>
<html>
    <head>
        <title>JavaScript DOM Experiment</title>
        <script src="./js/script.js"></script>
    </head>
    <body>
        <h1>JavaScript DOM Experiment</h1>
        <p id="change-me">Change this text with JavaScript.</p>
    </body>
</html>
```

In the above example, the console log would result in `undefined`. But why!? **Our `<script></script>` element's JS code runs *before* the `<p id="change-me"></p>` element is loaded in the browser.** It can only see the above elements: `<!DOCTYPE html>`, `<html>`, `<head>`, and `<title>`...

### Defer

How can we get it to see the elements we really want to target in the `<body></body>`? There are a few different approaches. The easiest fix for the code we have above, would be via use of the `defer` attribute:

`<script src="./js/script.js" defer></script>`

The `defer` attribute lets the browser know to wait until the page has loaded before running your script's code.

## Onload

Another common option, would be to make a change to your JS code itself. You could run your logic in the window's `onload` event, like so:

```JavaScript
// Run function once the window / page is fully loaded.
window.onload = function() {
    // Target element.
    const changeMeP = document.getElementById('change-me');
    console.log('changeMeP:', changeMeP); // Check if you got it!
};
```

### Bottom of the Body

Some developers instead opt to place their `<script></script>` element right before the closing `</body>` tag, which would have the same effect (but takes some of your "invisible configuration" elements out of your `<head></head>` element, which might hurt the orgnization of your code.)

Out of these three approaches, **choose only one** and be consistent so you know where to find your scripts:

* `defer` attribute on your `<script></script>` element
* `onload` event in your code
* placing `<script></script>` at the end of `<body></body>`

### Changing the text in an Element

With that in-mind, you may still be wondering how we'd change that text? Let's finish that code, assuming we followed the `defer` solution to our DOM problem:

```JavaScript
// Target element.
const changeMeP = document.getElementById('change-me');
console.log('changeMeP:', changeMeP); // Check if you got it!

// Change the text.
changeMeP.textContent = 'Hello, World!';
```

Amazing; we did it!

## Semantics when there is no Visual Space

In an attempt to make our pages more organized and accessible, we may aim to include headings (H1-H6) throughout every discernable piece of our website... this however, may not fit the look we have in mind—there may even be parts that are intuitive without headings in visual context, that might not from the perspective of a screen reader. How do we deal with this sort of situation?

One instinct might be to jump to "invisible" headings. You might consider:

* `font-size: 0;`
* `color: transparent;`

This would effectively hide your text! However... **search engines and some savvy accessibility tools will ignore your content altogether if you use styles like these!**

It is much better to use tried and true approaches, [like what WordPress cooked up](https://make.wordpress.org/accessibility/handbook/markup/the-css-class-screen-reader-text/):

```CSS
/* Text meant only for screen readers. */
.screen-reader-text {
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  word-wrap: normal !important;
}
```

## Building a (Front-end Only) Web Page

1. Goals
    * What is this website meant to communicate or do?
    * What sort of pages or content will you need?
2. Brainstorming
3. Wireframing
4. Design
5. Boxes (think about the semantic elements req'd to represent the content)
6. HTML (write HTML to represent the content and design)
7. CSS (you may have to add some `<div>` or `<span>` elements to achieve the desired look)

It is a good idea to use a stylesheet designed to combat browser defaults and give you a nice clean-slate to begin development; these are usually referred to as reset stylesheets. Consider:

* [Normalize](https://necolas.github.io/normalize.css/) *Recommended!
* [10+ [...] Reset Stylesheets](https://cssauthor.com/css-reset-stylesheets/)
* [HTML5 Reset Stylesheet (HTML5 Doctor)](http://html5doctor.com/html-5-reset-stylesheet/)
* [Reset CSS (Meyer Web)](https://meyerweb.com/eric/tools/css/reset/)

## HTML Essentials

What do I need to know to be effective in writing HTML code?

* [HTML Basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics)
* [Accessible HTML Elements](https://amberwilson.co.uk/blog/accessible-html-elements/)
* [Why, How, and When to use Semantic HTML](https://css-tricks.com/why-how-and-when-to-use-semantic-html-and-aria/)
* [Case Study: Improving the Accessibility of "24 Ways"](https://css-tricks.com/improving-accessibility-24-ways/)

## CSS Essentials

What do I need to know to be effective in writing CSS code?

* [CSS Basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics)
* [Box Model](https://css-tricks.com/the-css-box-model/)
* [`box-sizing: border-box;`](https://css-tricks.com/box-sizing/)
* [CSS Selectors](https://css-tricks.com/how-css-selectors-work/)
    * Have a confusing selector? [Paste it Here and have it Explained!](https://kittygiraudel.github.io/selectors-explained/)
    * [Pseudo Class Selectors](https://css-tricks.com/pseudo-class-selectors/)
    * [Child and Sibling Selectors](https://css-tricks.com/child-and-sibling-selectors/)
    * [Useful :nth-child Recipes](https://css-tricks.com/useful-nth-child-recipies/)
* [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [A Complete Guide to CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
