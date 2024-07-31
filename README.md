# Experiment

A category tree is something we see on almost every website, specially within e-commerce. Menus or Navs is a great examples of trees which consists of top-level items, followed by any quantity of nested sub-level items. In this case, the tree referred to is all the categories we have on acnestudios.com. At following link you can find a demo with, in this case, nested unordered lists: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul.

This task is essentially creation of a "category tree viewer". What you have within this folder is data from acnestudios.com which we shall parse, sort and display visually for us to be able to view and explore. The exercise focuses on two main topics, JS and CSS - where both is ofc dependant on some HTML and how to create and style elements.

Below you will find expectations and information of what to create. And always, feel free to reach out!

### Expectations

- Construct a nested object from a flat array. The categories defined in the data should be grouped and nested where they belong, and to their respective parent category.
- Make a visual representation of the nested object. No design guidelines are defined here, but if you desire some guidance then acnestudios.com will hold colors, sizes and gutters.
- Result should be delivered in a zip containing all related files.

### Rules

- End result should not require any library, pre-compilers are all good to use.
- Vanilla javascript is preferred.
- Don't overthink.

## Part 1: Create the object

1. Get the JSON by include, inline, fetch, query or however you desire. You should be able to use the JSON data somehow.
2. Study the JSON object so you know how it is constructed and what it contains. There is plenty of entries, therefore we need a way to sort, parse and display them.
3. With the data, and the categories value of `parent_category_id`, create a nested object tree.
   All from the top level categories to far distant sub-categories should be included and nested as expected. Result _could_ be similar to:
   ```
   {
       "shop-woman": {
           "id": "shop-woman",
           "parent_category_id": "root",
           ...
           "categories": {
               "man-accessories": {
                   "id": "man-accessories",
                   "parent_category_id": "shop-man",
                   ...
                   "categories": { ... }
               },
               ...
           }
       },
       "shop-man": {
           "id": "shop-man",
           "parent_category_id": "shop-man",
           ...
           "categories": {
               "man-accessories": {
                   "id": "man-accessories",
                   "parent_category_id": "shop-man",
                   ...
                   "categories": { ... }
               },
               ...
           }
       }
   }
   ```
   **Tips:**
   - Use relevant array methods and loops.
   - The `parent_category_id ` value `root` is top level which is easy enough to start looking for to gather the keys we need, and to determine what is nested within these categories.
   - It will be good to add a new key of `categories` with the value of an empty object or array for each of the categories - else we cannot append the related sub-categories and create the actual tree.
   - This needs to either be a nice recursive search or multiple reducers/loops. Have in mind that functions or methods will absolutely be handy too.
4. With the final result saved in a variable, log it in console.

## Part 2: Make it visual

However you desire, do a visual tree of the categories in an intuitive way. The `ID` is the only thing that is needed to be displayed, but the context on how the tree is displayed is the more interesting part. Be creative, there is no "wrongs" here.

**Tips:**

- CSS: Flex, Grid, scroll-snap, hoz / vert scrolling.
- JS: `for ... of` / `for ... in`, common array methods, `document.createElement`, and common element methods.

## Bonus:

- Create a list for only offline categories, log it in console by only displaying the category IDs.
- Sort each visual result by `last_modified`, latest should be first. Display the Year, month and day.
- Add a toggle to show and hide `online` and `offline` categories only.
- Git commit history

---

_Happy coding!_
