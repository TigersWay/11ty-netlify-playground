---
title: "Welcome"
menu:
  title: Home
  icon: home
layout: simple.njk
---

## Hello World!

### tagSet

<ul class="list-disc ml-4">
{% for tag in collections.all | tagList | sort %}<li><h4>{{ tag }}</h4><ul class="list-disc ml-4">
{% for item in collections[ tag ] | xsort('data.title') %}<li><a href="{{ item.url }}">{{ item.data.title }}</a></li>{% endfor %}
</ul></li>{% endfor %}
</ul>

{% simpleCell 'Classic Lorem Ipsum' %}

Lorem ipsum dolor sit amet, consectetur **adipiscing elit**. In vel tellus ante. Nam vitae orci ultrices, dictum odio vel, volutpat nunc. Nulla vehicula, velit nec vehicula rutrum, sapien lorem lacinia ante, id dictum magna dolor sed dolor. _Quisque quam est_, vulputate ac hendrerit nec, pellentesque in dui. Curabitur vulputate mollis elit vel iaculis. Etiam dignissim felis odio, eu fermentum lorem vehicula aliquam.

> Mauris euismod maximus nunc, a venenatis orci ullamcorper pulvinar. Curabitur et lorem viverra

Nam sit amet mi egestas, sodales velit quis, placerat nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus.

{% endsimpleCell %}

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
