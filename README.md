# Fractal Sass Seed

This is a seed project, using [Fractal](https://github.com/frctl/fractal) alongside Sass and Gulp to provide editable component-based CSS

## Problem

Fractal is a great tool for documenting and managing component libraries, but without the ability to easily reference global variables alongside component styling, managing "live" sass is cumbersome.

## Solution

Using Gulp we can watch for changes to our global variables and component styles to auto-compile and update our pattern SASS. We can then use this auto compiled output css to power our Fractal preview , and use one single set of files to both manage and display components

## Use

### tl;dr

- clone this repository
- cd into the "example" folder
- `npm install` to install dependencies
- `fractal start --sync` to start the Fractal instance with Browsersync
- `gulp styles` to compile your css file, and then
- `gulp watch` to watch your sass files for changes and re-compile

### Longer

We need to use Gulp and some helpers that allow us to properly structure our sass to be interpreted. The assumption is that we'll want a set of global variables, like colors and type, as well as per-component styles, which will live in the component's folders.

There is a folder in the root of the Fractal project called globals/, which includes an import.scss file as well as some example sass partials, "_colors.scss" and "_normalize.scss". This is where you'd put any files containing mixins and other  variables you want to be able to reference from components.

In our Gulpfile, we'll watch this import file as well as our component folder for changes. Now, since we want to import our component-only styles AFTER these global variables are imported, we need to reference those files here. If we try to include them any other way, they will be concatenated out of order and variables will be unavailable to components.

In our import file, with the help of gulp-sass-glob, we can add any scss file inside any component folder, and append it to our import.scss file. That's the `@import "../components/**/*.scss` line at the bottom of import.scss

In our Gulpfile, we have a task `gulp styles` that will compile all the sass files referenced in import.scss

We'll export this to public/stylesheets/site.css. Now that we have a live-updating compiled css file, we can reference it in our global preview file in our component directory. As you can see, our single variable in colors.scss has been referenced correctly by our example.scss file (our local component style).


Now, this is what we are looking for but we probably want it to update on any change to any scss file. Since Fractal already uses browsersync, we'll just wrap a Gulp task. So, after starting your Fractal app with `fractal start --sync`, you can run `gulp watch`, and live-update sass!


Note - also added a helper to fractal.js to name the assets tab SCSS or CSS based on the availability of the file type. You can remove this if desired to revert to the "Assets" label.

## Contributing

I made this because using component based sass within wasn't anything baked in. Please let me know how to improve this seed, and feel free to contribute!

# Fractal

Fractal is a tool to help you **build** and **document** web component libraries and then **integrate** them into your projects.

[![Build Status](https://img.shields.io/travis/frctl/fractal/master.svg?style=flat-square)](https://travis-ci.org/frctl/fractal)
[![Greenkeeper badge](https://img.shields.io/badge/greenkeeper-enabled-brightgreen.svg?style=flat-square)](https://greenkeeper.io/)
[![NPM Version](https://img.shields.io/npm/v/@frctl/fractal.svg?style=flat-square)](https://www.npmjs.com/package/@frctl/fractal)
[![Slack Status](http://slack.fractal.build/badge.svg)](http://slack.fractal.build)

**Read the Fractal documentation at http://fractal.build/guide.**
