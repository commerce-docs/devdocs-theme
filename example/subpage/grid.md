---
title: Grid
menu_title: Grid
menu_order: 4
sections:
 - title: Products
   content: Learn how to create products from simple to complex with multiple options ...
   url: /catalog/product-types.html
 - title: Shared Catalogs
   content: Learn how to set up "shared," gated catalogs with curated selections of ...
   url: /catalog/catalog-shared.html
---

## Example

{% include grid.html sections=page.sections %}

## How to use

Use grid.html include file to render the cards that link to other pages:

```markdown
---
title: Catalog
sections:
 - title: Products
   content: Learn how to create products from simple to complex with multiple options ...
   url: /catalog/product-types.html
 - title: Shared Catalogs
   content: Learn how to set up "shared," gated catalogs with curated selections of ...
   url: /catalog/catalog-shared.html
---

{% raw %}{% include grid.html sections=page.sections %}{% endraw %}
```
