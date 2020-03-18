---
title: "The Bean Belt"
menu:
  icon: coffee
---
### Leaves
<ul>
{% for item in collections.coffee | deepLeaves(page) %}<li><a href="{{ item.url }}">{{ item.data.title }}</a></li>{% endfor %}
</ul>

[Home](/)
