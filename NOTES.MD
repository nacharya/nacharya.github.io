# NOTES

Notes around building this sitesource and publishing the content into [GitHub Pages](https://pages.github.com/).

## Installing Hugo on your OS Platform

[Hugo](https://gohugo.io/) is a nice framework for creating small WebSites using
[Markdown](https://daringfireball.net/projects/markdown/) format.

Installation instructions are [here](https://gohugo.io/getting-started/installing/)

## Creating a simple site

Once Hugo is installed, Let's create a small site and use it locally on the Laptop

```bash
% hugo new site sitesource
% cd sitesource; git init
```

Need to add the desired Hugo theme as a git submodule

```bash
% git submodule add http://github.com/hugo-sid/hugo-blog-awesome themes/hugo-blog-awesome
```

Now sync the submodule repos including the ones they have recursively

```bash
git submodule update --init --recursive
```

Let's edit the main site configuration `config.toml` for a simple case and add a simple markdown page

```bash
% vim hugo.toml
% hugo new posts/testpage.md
% vi content/posts/testpage.md
```

Let's review this simple content and ensure that hugo is working.

```bash
% hugo -D 
% hugo server -D
```

Point the Browser to [http://localhost:1313](http://localhost:1313) and review the site.

## Generating Keys for GitHub Actions

First let's generate the ssh publib and private keys

```bash
% ssh-keygen -t rsa -b 4096 -C "$(git config user.email)" -f gh-pages -N ""
% ls gh-pages*
```

Keys:

- gh-pages: Private Key
- gh-pages.pub : Public Key

Now let's change the baseurl in the configuration `config.toml`

```json
baseurl = "https://nacharya.github.io"
```

In the __content-repo__ Settings->Pages, select the branch as `master` and the root as `/`


Generate the public directory using Hugo 

```bash
% hugo
```

Now we want the public directory to be a submodule of the *build_repo* and point to  the __content-repo__ 

```bash
% cd public
% git init
% git remote add origin https://github.com/nacharya/nacharya.github.io.git
% git add .
% git commit -m "Intial commit"
% git push --set-upstream origin master
```

## Using GitHub Actions for Automated Deployments 

*build_repo* : [Sitesource](https://github.com/nacharya/sitesource)
__content-repo__ : [nacharya.github.io](https://github.com/nacharya/nacharya.github.io)

__content-repo__ Goto Settings->Deploy Keys. Choose "Add Deploy Key" and add 
the contents of gh-pages.pub. 

*build_repo* Goto Settings->Secrets. Choose "New repository secret" and add the contents of gh-pages and call it ACTIONS*_*DEPLOY*_*KEY

*build_repo* needs `.github/workflows/gh-pages.yml` with the following content 

```yml
name: hugo publish

on:
  push:
    branches: [ master ]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
      with:
          submodules: true
          fetch-depth: 1 

    - name: Setup Hugo
      uses: peaceiris/actions-hugo@v2
      with:
        hugo-version: 'latest'

    - name: Build
      run: hugo --minify

    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      env:
        ACTIONS_DEPLOY_KEY: ${{ secrets.ACTIONS_DEPLOY_KEY }}
        EXTERNAL_REPOSITORY: nacharya/nacharya.github.io
        PUBLISH_BRANCH: master
        PUBLISH_DIR: ./public
      with:
        emptyCommits: false
        commitMessage: ${{ github.event.head_commit.message }}
```
