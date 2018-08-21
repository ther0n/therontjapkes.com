---
layout: post
title:  "First Post: How This Site Was Made"
---
For the first post on this site why not describe how I made it? It's surprisingly simple. This site is hosted on GitHub Pages, which using Jekyll. Essentially all that you need to do to create a site using GitHub Pages is create a repository and fill it with a few markdown files. However, the default themes don't offer much in the way of customization without major additions/modifications. I ended up searching for a more flexible theme when I found [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/). After trying to use the theme, I quickly found it was a bit more than what I was looking for. I also wasn't sure how I would fix the theme if it were to break in the future due to an update to Jekyll or GitHub Pages and the project was no longer mantained. I decided to look for the theme that looked nice, but was simple enough that I could easily modify it for my needs and fix it if it were to break due to future updates. I ended up using [Jekyll Now](http://www.jekyllnow.com/), a very basic Jekyll theme. I made a few modifications to the theme to fit my needs detailed below.

#### Landing Page
I wanted the landing page to show the most recent posts, with the most recent post at the top of the list. To accomplish this I modified index.html to look like this:
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

This will display the 10 most recent posts, with a small excerpt from the article and a link to read more of the article.

#### Top Navigation Links
I wanted to have 4 links at the top of the page, one to the most recent posts (homepage), one to a list of all my posts (archive), a link to a page about my projects, and a link to a page about me with some contact info. The navigation links are controlled by this section of html in the file `_layout/default.html`: 
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
  <a href="{{ site.baseurl }}/projects">Projects</a>
  <a href="{{ site.baseurl }}/about">About</a>
</nav>
{% endraw %}
{% endhighlight %}
To make the links actually go to the proper pages, I created a `.md` file for each of the links. Each file requires front matter which looks like this:
{% highlight yml %}
{% raw %}
---
layout: default
title: About
permalink: /about/
---
{% endraw %}
{% endhighlight %}
The above front matter is used for my About page. The `layout:` key is what determines which html file from `_layout` to use. For example this posts front matter contains `layout: post` which means it uses `_layout/post.html` to format the page. The `title:` key is pretty self explanitory. The last key in the example front matter above is the `permalink:` key. This key is how to set the address for accessing the page. For example if I set `permalink: /asdfghjkl/` then going to `therontjapkes.com/asdfghjkl` would take me to that page.

#### The Archive Page
Every other page is a simple markdown file so I won't go into detail about them. The archive page is a dynamic page which will display all posts to this site, sorted by year. I did this by creating `archive.html` containing:
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
I didn't really like the social links at the bottom of the page with the theme by default. I don't really use any social media, and it seemed reduntant to have contact information at the bottom of the page and in my about page. I found that `default.html` has the line {%raw%}`{% include footer.html %}`{%endraw%} towards the bottom of the file. This file is located in `_includes/footer.html` and it is what I edited to make the footer appear as I wanted. This is what `_includes/footer.html` looks like after my modifications:
{% highlight html %}
{% raw %}
<a href="{{ site.baseurl }}/contact">Contact</a> | <a href="{{ site.baseurl }}/feed.xml">RSS Feed</a>
<div class="page__footer-copyright">&copy; {{ site.time | date: '%Y' }} {{ site.name | default: site.title }}</div>
{% endraw %}
{% endhighlight %}
This will create a link to my contact page, and a link to an RSS feed for the site, as well as a copyright notice.

I'm happy with how the site turned out with these modifications. I also am also using my modified version of [Jekyll Now](http://www.jekyllnow.com/) over on [lastminute.games](https://lastminute.games).