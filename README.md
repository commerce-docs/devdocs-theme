# DevDocs theme

A Jekyll theme for Adobe Commerce documentation sites. Uses NPM to build SCSS and JS files. Includes basic layouts and html includes.

## How to apply the theme to your project

1. In your project `Gemfile`, add this:

```bash
gem 'devdocs', git: 'https://github.com/magento-devdocs/devdocs-theme.git'
```

1. Then, in your Jekyll `_config.yml` file, add this:

```bash
theme: devdocs
```

1. Do a `bundle install` to fetch the theme and install all dependencies.

## Developing the theme

Do a `npm install` and then `bundle install`.
Then run `npm run watch:all`.

## Using theme locally

1. To work with the theme locally and test how it works with DevDocs or any project that uses the theme, you'll want to specify this theme as local gem:

```bash
bundle config local.devdocs /path/to/theme/git/repository
```

1. Now you can build your project locally, and it will look for the latest theme gem in your filesystem instead of GitHub. Just make sure that your project requires the same branch as your local theme branch:

```bash
gem 'devdocs', git: 'https://github.com/magento-devdocs/devdocs-theme.git', :branch => "your_branch_name"
```

1. Do a `bundle install` in your project to get the latest theme from local filesystem.

## How to contribute

Clone this repository and create a feature branch. Do your work there, and then make a Pull request to a `master` branch.
