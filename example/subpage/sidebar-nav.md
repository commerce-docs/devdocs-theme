---
title: Sidebar (Guide) Navigation
menu_title: Sidebar Nav
menu_order: 1
---

This component generates the navigation tree for specified folder. It is used to show sidebar navigation for the guides. The example can be seen on the left. It supports unlimited number of nesting levels, but it is recommended to use only two levels of nesting, like shown on the left.

## Include Files

This component consists of three files to improve the customisation and make code easier.

### `sidebar-nav.html`

This file is responsible for getting the root path for a guide:

{% raw %}
```liquid
{% assign page_path = page.path | remove: '.md' | remove: '.html' | split: '/' %}
{% assign guide_root = '/' | append: page_path[0] %}

{% include layout/sidebar-nav-root-item.html context=guide_root %}
```
{% endraw %}

First it gets the page path, strips `.md` and `.html` extension and builds an array out of it.

Then it builds the root path to a string. Depending on where your guide root folder is, you may want to add more path parts to it. For example, if your guide is in folder `/en/guide` instead of just `/guide`, you may want to do the following:

{% raw %}
```liquid
{% assign guide_root = '/' | append: page_path[0] | append: '/' | append: page_path[1] %}
```
{% endraw %}

Finally, we include the `sideabar-nav-root-item.html` sending guide root folder as a parameter.

### `sidebar-nav-root-item.html`

This is the guide root item. It shows the title of a guide and gets the guide children.

{% raw %}
```liquid
{% assign pages = site.pages | where_exp: 'article', 'article.dir contains include.context' | sort: 'menu_order' %}

{% assign context = include.context | append: '/' %}
{% assign guide = pages | where_exp: 'article', 'article.dir == context' | first %}

<h4 class="guide-title">{{ guide.title }}</h4>

<ul>
  <li {% if guide.url == page.url %}class="active"{% endif %}>
    <a href="{{ site.baseurl }}{{ guide.url }}">{% if guide.menu_title %}{{ guide.menu_title }}{% else %}{{ guide.title }}{% endif %}</a>
  </li>
  {% for node in pages %}
    {% assign path_parts = node.dir | remove_first: include.context | split: '/' %}
    {% assign path_depth = path_parts | size %}

    {% if path_depth == 2 %}
      {% include layout/sidebar-nav-tree-item.html page=node pages=pages %}
    {% endif %}

  {% endfor %}
</ul>
```
{% endraw %}


### `sidebar-nav-tree-item.html`

This renders the links to each page in the guide and recursively gets the children pages, if any.

{% raw %}
```liquid
{% assign children = include.pages | where_exp: 'page', 'page.dir contains include.page.dir' | sort: 'menu_order' %}
{% assign children = children | where_exp: 'page', 'page.dir != include.page.dir' | sort: 'menu_order' %}
{% assign children_size = children | size %}

<li {% if include.page.url == page.url %}class="active"{% endif %}>
  <a href="{{ site.baseurl }}{{ include.page.url }}">{% if include.page.menu_title %}{{ include.page.menu_title }}{% else %}{{ include.page.title }}{% endif %}</a>
  {% if children_size > 0 %}
    <ul>
    {% for child in children %}
      {% include layout/sidebar-nav-tree-item.html page=child pages=children %}
    {% endfor %}
    </ul>
  {% endif %}
</li>
```
{% endraw %}
