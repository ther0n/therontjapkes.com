---
layout: post
title:  "This Site"
---
For my first project/post here, why not describe how I made this site itself? Using GitHub Pages and Jekyll, it's surprisingly simple to build a website. Essentially all that you need to do to create a site using GitHub Pages is create a repository and fill it with a few markdown files. However, the default themes don't offer much in the way of customization without major additions/modifications to those themes. I decided to search for a more flexible theme to fit my needs when I found [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/). I set up [a site locally](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/) with the theme, I quickly found it was a bit more than what I was looking for. I also wasn't sure how I would fix the theme if it were to break in the future due to an update to Jekyll or GitHub Pages and the project was no longer mantained for whatever reason. I decided to look for a theme that looked nice, but was simple enough that I could easily modify it for my needs and fix it if it were to break due to future updates. I found [Jekyll Now](http://www.jekyllnow.com/), a very basic Jekyll theme that looked good and was quite simple. I made a few modifications to the theme to fit my needs:

#### Landing Page
I wanted the landing page to show the most recent projects, with the most recent project at the top of the list. To accomplish this I modified index.html to look like this:
{% highlight html %}
{% raw %} 
---
layout: default
---

<div class="posts">
  {% for post in site.posts %}
    {% if forloop.index <= 10 %}
      <article class="post">

        <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>

        <div class="entry">
          {{ post.excerpt }}
        </div>

        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a>
      </article>
    {% endif %}
  {% endfor %}
</div>
{% endraw %}
{% endhighlight %}

This will display the 10 most recent posts, with a small excerpt from the article and a link to read more of the article. You probably notice the tags {%raw%}{% and %}{%endraw%}, these are [Liquid template](https://github.com/Shopify/liquid) tags which are used by Jekyll to create more dynamic pages.

#### Top Navigation Links
I wanted to have 3 links at the top of the page, one back to the landing/homepage, one to a list of all my projects/posts, and one to a page about me with some contact info. The navigation links are controlled by this section of html in the file `_layout/default.html`: 
{% highlight html %}
{% raw %}
<nav>
  <a href="{{ site.baseurl }}/">Blog</a>
  <a href="{{ site.baseurl }}/about">About</a>
</nav>
{% endraw %}
{% endhighlight %}
which I modified to:
{% highlight html %}
{% raw %}
<nav>
  <a href="{{ site.baseurl }}/archive">Archive</a>
  <a href="{{ site.baseurl }}/about">About</a>
</nav>
{% endraw %}
{% endhighlight %}
To make the links actually go to the proper pages, I created a `.md` file for each of the links. If you prefer markdown doesn't fit your needs or you prefer html, you can create html files as well. Each `.md`/`.html` file representing a page requires front matter which looks like this:
{% highlight yml %}
{% raw %}
---
layout: default
title: About
permalink: /about/
---
{% endraw %}
{% endhighlight %}
The above front matter is used for my About page. The `layout:` key is what determines which html file from the folder `_layout` to use to display the content. For example the front matter for this post contains `layout: post` which means it uses `_layout/post.html` to format the page. The `title:` key is pretty self explanitory, it controls what you see at the top of the page. The last key in the example front matter above is the `permalink:` key. This key sets the address for accessing the page. For example if I set `permalink: /asdfghjkl/` then going to `therontjapkes.com/asdfghjkl` would take me to the page containing the equivalent `permalink` value.

#### The Archive Page
Every other page aside from the landing page (see `index.html` above) and the posts page is a simple markdown file so I won't go into detail about them. The posts page is dynamic in that it will display all project posts to this site, sorted by year. To achieve this, I created the file `archive.html` containing:
{% highlight html %}
{% raw %}
---
layout: default
title: Archive
permalink: /archive/
---

<div class="well">
{%for post in site.posts %}
    {% unless post.next %}
        <h1>{{ post.date | date: '%Y' }}</h1>
        <ul>
    {% else %}
        {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
        {% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
        {% if year != nyear %}
            </ul>
            <h1>{{ post.date | date: '%Y' }}</h1>
            <ul>
        {% endif %}
    {% endunless %}
    <li><a href="{{ site.baseurl}}{{ post.url }}">{{ post.date | date: "%b %-d" }} - {{ post.title }}</a></li>
{% endfor %}
</ul>
</div>
{% endraw %}
{% endhighlight %}

#### Footer
I didn't want the social links and icons at the bottom of the site. I don't really use any social media, and I thought it was reduntant to have contact information both at the bottom of the page and in my about page. The footer is controlled by the file `_includes/footer.html` I modified the file to the following html:
{% highlight html %}
{% raw %}
<a href="{{ site.baseurl }}/contact">Contact</a> | <a href="{{ site.baseurl }}/feed.xml">RSS Feed</a>
<div class="page__footer-copyright">&copy; {{ site.time | date: '%Y' }} {{ site.name | default: site.title }}</div>
{% endraw %}
{% endhighlight %}
This will have the footer include a link to my contact page, and to an RSS feed. It will also generate a copyright notice using the sites title.

If you wish to host your own site using GitHub Pages and Jekyll, follow the instructions [here](https://pages.github.com/).