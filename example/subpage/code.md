---
title: Code Examples
menu_title: Code
menu_order: 9
---

## Inline `code` example

This is `inline code example`. The inline code can be inserted in any html element. Here's the example of the code inside the link: [Link with the `code inside`](/).

### H3 with the `code line` in it

#### H4 with the `code line` in it.

```
this block is not for copy (add a {:.no-copy} class after the code block)
```
{:.no-copy}


## Blocks of `code` examples

### Backslash syntax 

```html
<div class="dropdown">
  <button id="dropdown" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown Label
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdown">
    <li><a class="dropdown-item" href="">Item one</a></li>
    <li><a class="dropdown-item" href="">Item two</a></li>
    <li><a class="dropdown-item" href="">Item three</a></li>
  </ul>
</div>
```

Bash:

```bash
cd ~/sites/
ls
```

### Liquid `highlight` syntax:

{% highlight html %}
<div class="container">
  <h4 class="title">Title</h4>
  <div class="content">
    <p>Paragraph content.</p>
  </div>
</div>
{% endhighlight %}

### Liquid With line numbers:

{% highlight html linenos %}
<div class="dropdown">
  <button id="dropdown" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown Label
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdown">
    <li><a class="dropdown-item" href="">Item one</a></li>
    <li><a class="dropdown-item" href="">Item two</a></li>
    <li><a class="dropdown-item" href="">Item three</a></li>
  </ul>
</div>
{% endhighlight %}
