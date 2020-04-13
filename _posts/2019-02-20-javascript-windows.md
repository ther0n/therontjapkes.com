---
layout: post
title: "Windows ME (Mistake Edition): Classic Windows Imitation in Javascript"
last-modified: 2020-04-12
---

In my [computer graphics](https://cs.calvin.edu/courses/cs/352/index.html) class I was assigned [a project](https://cs.calvin.edu/courses/cs/352/projects/proj2.pdf) to create a "self portrait" using HTML canvas and JavaScript. The assignment required the use of shapes, text, colors, and gradients. Classic windows has all these requirements covered. It draw's plenty of text and shapes and the window title bars have a color gradient. I had some extra time as it was early in the semester so I decided to create an imitation of old versions of Windows. How is it a self portrait? Well I added an option to open tpt3.png, my project 1 submission which was created through raytracing with povray and constructive solid geometry.

Looking ahead I saw that the next project was to create a paint program. Originally I wanted to have paint program run within a window on this project, and possibly all future projects for the class. Now that I've finished this project I've decided it probably won't be worth the amount of time needed to get that working. Still the end result is quite entertaining. It even has the best classic windows feature (try turning "Enable Redraws" off)!

My project made it into the [showcase](https://cs.calvin.edu/courses/cs/352/showcase/selfportrait.html), where the coolest submissions from each semester are kept as examples/inspiration for future students.

Click the button below to "Boot Windows":

<button id="loadProject2">Boot Windows</button>
<iframe id="project2" src="about:blank" scrolling="no" style="width: 640pt; height: 400pt;"></iframe>

## Update:

My submission for project 4 also made it's respective [showcase](https://cs.calvin.edu/courses/cs/352/showcase/widget.html)!

Check it out here:

<button id="loadProject4">Load Project 4</button>
<iframe id="project4" src="about:blank" scrolling="no" style="width: 700pt; height: 450pt"></iframe>

<script>
    $(window).on("load", function() {
        $('#project2').hide();
        $('#project4').hide();
        $('#loadProject2').bind('click', function(){
            $('#project2').show();
            $("#project2").attr("src", "https://therontjapkes.com/projects/CS352/proj2/proj2.html#mainWindow");
        });
        $('#loadProject4').bind('click', function(){
            $('#project4').show();
            $("#project4").attr("src", "https://therontjapkes.com/projects/CS352/proj4/proj4.html#mainWindow");
        });
    });
</script>