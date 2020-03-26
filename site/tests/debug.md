---
title: "Debug in HTML (tests)"
layout: "standalone.njk"
eleventyExcludeFromCollections: true
---
### Like `util.inspect` but for your browser page:
`debug(your-variable, depth=2, minimal=true, blackList=['templateContent', '_templateContent'])`

#### Simple => `{% raw %}{% debug page %}{% endraw %}`
{% debug page %}

#### or => `{% raw %}{% debug collections.all[0], 1 %}{% endraw %}`
{% debug collections.all[0], 1 %}

#### More information => `{% raw %}{% debug collections.all[0] %}{% endraw %}`
{% debug collections.all[0] %}

#### And even deeper => `{% raw %}{% debug collections.all[0], 2, false, [] %}{% endraw %}`
{% debug collections.all[0], 2, false, [] %}
