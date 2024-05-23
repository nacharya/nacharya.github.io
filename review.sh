#!/bin/bash

# If a command fails then the deploy stops
set -e

echo "Review with a local run og Hugo...\n"

# Build the project and serve locally
hugo server -D # if using a theme, replace with `hugo -t <YOURTHEME>`

