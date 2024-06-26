# Sitesource & Content 

The *build-repo* and the __content-repo__ of [nacharya.github.io](https://nacharya.github.io)

- *build_repo* : [nacharya.github.io](http://github.com/nacharya/nacharya.github.io)
- __content-repo__ : [nacharya.github.io](http://github.com/nacharya/nacharya.github.io)
- *theme* used in this blog is [hugo-blog-awesome](https://github.com/hugo-sid/hugo-blog-awesome)

*Note: The *build-repo* and the __content-repo__ used to be separate in the past but now they are the same. This does make things easier to maintain and deploy.

The *theme* stays as a `submodule` and needs to be updated periodically. 

```bash
% git submodule init
% git submodule update
```

*build_repo* is all done using [Hugo](https://gohugo.io/), and the content is written using [Markdown](https://daringfireball.net/projects/markdown/)

__content-repo__ is all produced by the code generated by Hugo in the *build_repo*. Much of this execution is completed using `deploy.sh` script in the *build_repo*

## Adding Content to the Website 

Let's add a blog posting 

```bash
% hugo new posts/helloworld.md
% code posts/helloworld.md
```

Now that the Markdown file with the content has been edited and is redy to see be reviewed, Let's run locally 

```bash
% ./review.sh
Running in Fast Render Mode. For full rebuilds on change: hugo server --disableFastRender
Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
Press Ctrl+C to stop
```

Once the changes needed after the review has completed and we'd like to publish the 
contents, let's make sure it is added to *build_repo*, pushed and published into the __content-repo__

```bash
% git status
% git add . 
% git commit -m"Added the helloworld page"
```

Now we review it for the last time , and deply

```bash
% ./review.sh
^C
% ./deploy.sh 
```

Now browse to the [Main Site](http://nacharya.github.io) and make sure all changes look as desired. 

