---
title: "Lorem(s)"
layout: "standard.njk"
menu:
  icon: quote-right
footnotes:
---
## All "lorem" documents / children of this page
`{% raw %}{% for item in collections.all | leaves(page) | sort('data.title') %}{% endraw %}`
<ol>{% for item in collections.all | leaves(page) | sort('data.title') %}
  <li><a href="{{ item.url }}">{{ item.data.title }}</a></li>
{% endfor %}
</ol>
