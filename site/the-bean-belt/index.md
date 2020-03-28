---
title: "The Bean Belt"
layout: "standard.njk"
menu:
  icon: coffee
---
## All documents / children / deep children of this page
`{% raw %}{% for item in collections.all | leaves(page) | sort('data.title') %}{% endraw %}`
<ol>{% for item in collections.all | leaves(page) | sort('data.title') %}
  <li><a href="{{ item.url }}">{{ item.data.title }}</a></li>
{% endfor %}
</ol>
