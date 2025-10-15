#!/bin/sh

# exit on error, unset variables are errors
set -eu

if [ -z "$(git status --porcelain)" ]; then
    echo "working tree clean, bumping version..."
else
    echo "ERROR: working tree isn't clean, exiting" >&2
    exit 1
fi

if ! yarn build; then
    echo "ERROR: failed to build project, exiting" >&2
    exit 1
fi

yarn clean
yarn version patch
git add package.json

echo "awaiting commit message (default "bump"):"
read commit_msg
commit_msg=${commit_msg:-"bump"}
git commit --file - <<< "$commit_msg"
git push
yarn run publish

if [ -d "$HOME/velocity" ]; then
    echo "bumping version in core app repo..."
    cd "$HOME/fdp"
    yarn up @numeric-io/fdp-fe
    echo "successfully bumped version in core app repo"
else
    echo "WARNING: couldn't find core app repo, skipping bump"
fi

cd "$HOME/fdp-fe"