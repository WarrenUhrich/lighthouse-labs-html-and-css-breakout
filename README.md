# Lighthouse Labs | HTML and CSS Breakout

[GitHub Repository Branch](https://github.com/WarrenUhrich/lighthouse-labs-html-and-css-breakout/tree/2023.03.22-web-flex-23january2023) | [Vimeo Video Recording](https://vimeo.com/810718353/66021c7aab)

* [X] Common Elements
* [X] External Stylesheets
* [X] External Scripts
* [X] Building a (Front-end Only) Web Page

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

![Image used in-class to demonstrate side-by-side flex goal.](data:image/png;base64,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gUgiEEkEIolAJBGIJAKRRCCSCEQSgUgiEEkEIolAJBGIJAKRRCCSCEQSgUgiEEkEIolAJBGIJAKRRCCSCEQSgUgiEEkEIolAJBGIJAKRRCCSCEQSgUgiEEkEIolAJBGIJAKRRCCSCEQSgUgiEEkEIolAJBGIJAKRRCCSCEQSgUgiEEkEIolAJBGIJAKRRCCSCEQSgUgiEEkEIolAJBGIJAKRRCCSCEQSgUgiEEkEIolAJBGIJAKRRCCSCEQSgUgiEEkEIolAJBGIJAKRRCCSCEQSgUgiEEkEIolAJBGIJAKRRCCSCEQSgUgiEEkEIolAJBGIJAKRRCCSCEQSgUgiEEkEIolAJBGIJAKRRCCSCEQSgUgiEEkEIolAJBGIJAKRRCCSCEQSgUgiEEkEIolAJBGIJAKRRCCSCEQSgUgiEEkEIolAJBGIJAKRRCCSCEQSgUgiEEkEIolAJBGIJAKRRCCSCEQSgUgiEEkEIolAJBGIJAKRRCCSCEQSgUgiEEkEIolAJBGIJAKRRCCSCEQSgUgiEEkEIolAJBGIJAKRRCCSCEQSgUgiEEkEIolAJBGIJAKRRCCSCEQSgUgiEEkEIolAJBGIJAKRRCCSCEQSgUgiEEkEIolAJBGIJAKRRCCSCEQSgUgiEEkEIolAJBGIJAKRRCCSCEQSgUgiEEkEIolAJBGIJAKRRCCSCEQSgUgiEEkEIolAJBGIChD9D7dtZYgcmXssAAAAAElFTkSuQmCC)

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

