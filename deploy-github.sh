#!/bin/bash

# Exit immediately if a command fails
set -e

# Ensure we are on the main branch
git checkout main

echo "- building the project (this may take a while)..."

# Build the project
npm run build:app 

# Switch to the gh-pages branch
git checkout gh-pages

echo "- Removing unused files"
# Remove old files
git rm -rf . 

echo "- Removing node_modules, app, and .turbo"
rm -rf node_modules
rm -rf app
rm -rf .turbo

# Rename edit.html to index.html
mv dist/edit.html dist/index.html

# Move build contents to root
mv dist/* .

# Remove empty dist folder
rm -rf dist

# Commit and push changes
git add .
git commit -m "Deploy latest build to GitHub Pages"
git push origin gh-pages --force

# Switch back to main branch
git checkout main

echo "Deployment to GitHub Pages complete! 🚀"