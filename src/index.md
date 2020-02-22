---
title: "Welcome"
locale: en
layout: simple.njk
---
## Hello World!

### Every pages
<ul>
{% for item in collections.all %}<li><a href="{{ item.url }}">{{ item.data.title }}</a></li>{% endfor %}
</ul>

### Branches
<ul>
{% for item in collections.all | branches(page) %}<li><a href="{{ item.url }}">{{ item.data.title }}</a></li>{% endfor %}
</ul>

### Leaves
<ul>
{% for item in collections.all | leaves(page) %}<li><a href="{{ item.url }}">{{ item.data.title }}</a></li>{% endfor %}
</ul>


![Blue Eyes (crop)](/static/images/blue-eyes.jpg?nf_resize=smartcrop&w=300&h=300)

{% debug page %}
