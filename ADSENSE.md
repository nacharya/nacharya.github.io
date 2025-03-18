# Google Adsense 

Although this sie had no intentions or need of making money, we're using 
Google Adsense to get some understanding of usage, and see if we can add a 
method of folks to add comments to Blog posts and Article pages

Here is the procedure followed:

1. Create a Google Adsense account at [Google Adsense](https://www.google.com/adsense/start/)
2. We're using the theme `hugi-blog-awesome` for this site. Goto `layouts/partials/` and create a 
   directory `google` and create a file `adsense.html` in it. 
  
```bash
% mkdir -p layouts/partials/google
% touch layouts/partials/google/adsense.html
```
2. Go through it, It will give you code Add the code to the file `adsense.html`
3. Now, go to `layouts/partials/footer.html` and add the following line at the end of the file:

```html
{{ partial "google/adsense.html" . }}
```


