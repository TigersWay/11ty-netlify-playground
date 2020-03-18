---
title: "Lorem(s)"
menu:
  icon: quote-right
footnotes:
---
**{{ flag }}**

### Leaves
<ul>
{% for item in collections.all | leaves(page) | sort('data.title') %}<li><a href="{{ item.url }}">{{ item.data.title }}</a></li>{% endfor %}
</ul>

[Home](/)
