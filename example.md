---
title: Guide Home Page
menu_title: Overview
menu_order: 0
---

The purpose of [this section](https://www.google.com) is to provide a **manual intended** to give assistance to people using Magento Admin. These guides contain both a written guide and the associated images. Their content include.

Introductory text that gives an overview of the topic you will be writing about.

The purpose of this page is to provide you with a pre-formatted template and useful {% glossarytooltip a5ef9041-976f-4eb3-826e-bf836027d8c3 %}markdown{% endglossarytooltip %} references to help you get started writing docs.

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote. 

You can start off by editing the local version of this file using markdown language (and {% glossarytooltip a2aff425-07dd-4bd6-9671-29b7edefa871 %}HTML{% endglossarytooltip %} where needed). Then, create a Pull Request to have your contribution reviewed by the DevDocs team.

<div class="bs-callout bs-callout-info">
  <p>This is a note callout. You can use these to provide important information on a topic.</p>
  <p>You must follow a <a href="http://www.php-fig.org/psr/psr-4/">PSR-4 compliant</a> structure when building a module.</p>
</div>

<div class="bs-callout bs-callout-warning">
    <p>This is a warning callout. This is can be used to convey important information to the reader.</p>
</div>

<div class="bs-callout bs-callout-tip">
  <p>This is a tip callout. These can be used to provide useful tips or interesting fact on a topic.</p>
</div>


{% collapsible This is the collapsible title %}
  Markdown content goes in this area.
{% endcollapsible %}

{% collapsibleh2 This is the collapsible H2 title %}
  Markdown content goes in this area.
{% endcollapsibleh2 %}

{% highlight html %}
<div class="container">
  <h4 class="title">Title</h4>
  <div class="content">
    <p>Paragraph content.</p>
  </div>
</div>
{% endhighlight %}


## Table

| Section | Description | Link |
|------- -|-------------|------|
| Dashboard | Visual display of the most important information consolidated on a single screen so it can be monitored at a glance: quick search, last activity and summaries. | [See Dashboard user guides](subpage/) |
| Sales | Operations that users can initiate from the admin panel and Live Reports. | [See Sales user guides](subpage/)  |
| Products | The Catalogue and Inventory management let users to  and track items and stock movements. | [See Catalogue user guide](subpage/) |
| Customer Service | Section where all customer service agents and supervisors will be working. | [See Customer Service user guides](subpage/) |


## Lists

### Ordered

This is the example of an ordered list in our documentation.

1. Ordered list item. This can be really long line of text that spans multiple lines. List item will look like it's separated from other items.
2. Another list item
3. Yet another list item

### Unordered

* Unordered list example item
* Another unordered list item
* Yet another list item

### With Icons

* {:.new} This list item is a new feature
* {:.fix} This is a bugfix
* {:.bug} This is a known bug

## Images

![Alt text](http://via.placeholder.com/1000x500)

_This is image caption_
