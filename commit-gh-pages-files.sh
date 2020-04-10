#!/bin/sh

hugo --gc
cd public && git add --all && git commit -m "Publishing to gh-pages" && cd ..

