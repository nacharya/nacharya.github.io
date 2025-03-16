+++
title = "uv: Package, Project, Dependency, Environment"
date = 2025-03-13T22:55:28-07:00
draft = false
+++

Finally we have a really good package, project, dependency and environment management tool for Python.

`uv` is a Python package, dependency and environment management tool. It is a good replacement for 
`pip`, `pip-tools`, `pipx`, `poetry`, `pyenv`, `twine`, `virtualenv` 

Coming from a `rust` ecosystem, `uv` is inspired by `cargo` and `rustup`. There are lots of 
similarities between `cargo` and `uv`. In the traditional Python ecosystem, there are too many 
tools to manage packages, dependencies and environments. `uv` tries to unify all these tools into
one.

Advantages:
- Speed: Resolves dependencies really fast
- Simplicity: Virtual Environment and package management is simplified 
- Compatibility: Works with `pip` and `pip-tools`
- Modern: Built using `rust` for performance and stability


## Installation

Simplest way to install `uv` on a mac is to use `brew`:
```bash
% brew install uv
% uv --version
```

Let's create a sample virtual environment and install some packages. 
```bash
% uv venv ./myenv --python 3.13
% source ./myenv/bin/activate
% uv pip install -r requirements.txt 
```

To list of all available python that uv can find, run the following command:
```bash
% uv list python
```

## Dependency management

Due to the fact that there are so many packages in the Python ecosystem, it is very hard to manage
dependencies in a project. In fact, this is true with any programming language. In `rust` ecosystem,
`cargo` is the tool that manages dependencies.

One mechanishm `uv` uses is to let you generate a lock file that can be used in any machine, 
any environment to install packages with the exact same dependencies, unless there are OS specific 
dependencies that needs to be reflected.

Let's start with a simple project management case and create a new project

```bash
% uv init foobar
% cd foobar
% ls -a
pyproject.toml README.md main.py
.git/   .python-version/  .venv/
```
__Note: these are the bare minimum project files__

Now let's add some packages to the project and lock the dependencies 

```bash
% uv add requests ruff
% uv run ruff check
% uv lock
```

Now if you look at the file `uv.lock`, you will see all the dependencies and their versions.
```bash
% cat uv.lock | more
```


Now let's run files, add some files and run the project

```bash
% uv run main.py
% echo 'import requests; print(requests.get("http://google.com"))' > example.py
% uv run example.py
```

To resolve and audit the dependencies, run the following command:
```bash
% uv sync
```

Now let's go back to the Project and add some more dependencies 

```bash
% uv add numpy pandas openai
% uv lock
```

