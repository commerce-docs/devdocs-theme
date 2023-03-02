# DevDocs theme

A [Jekyll theme](https://jekyllrb.com/docs/themes/) for Adobe Commerce documentation sites at the `*.magento.com` domain. It uses [npm](https://www.npmjs.com/) to build SCSS and JavaScript files. The theme also includes basic layouts and HTML components.

## How to apply the theme to your project

1. In your project `Gemfile`, add this:

   ```ruby
   gem 'devdocs', git: 'https://github.com/commerce-docs/devdocs-theme.git'
   ```

   - if you need to specify a branch:

     ```ruby
     gem 'devdocs', git: 'https://github.com/commerce-docs/devdocs-theme.git', branch: 'master'
     ```

   - if you need to specify a commit:
     
     ```ruby
     gem 'devdocs', git: 'https://github.com/commerce-docs/devdocs-theme.git', ref: 'dfsdfs'
     ```

1. Then, in your Jekyll `_config.yml` file, add this:

```yaml
theme: devdocs
```

1. Do a `bundle install` to fetch the theme and install all dependencies.

## Developing the theme

Install node packages and ruby gems:

```shell
yarn
bundle install
```

Build and watch the changes:

```shell
yarn start
```

### Prerequisites

#### Version managers

Use version managers that support `.nvmrc` and `.ruby-version` files such as [nvm](https://npm.github.io/installation-setup-docs/installing/using-a-node-version-manager.html) and [rvm][https://rvm.io/] to be consistent with other developers in the project.

#### Global packages

Install `browser-sync` globally in your system if you want to run the `serve` and `watch:all` npm tasks.

```
yarn global add browser-sync
```

We do not add it to devDependencies because the current version (2.27.10) contains a high severity vulnerability.


## Running the theme locally

1. To work with the theme locally and test how it works with the DevDocs or other project that uses the theme, specify this theme as a local gem:

```bash
bundle config local.devdocs /path/to/theme/git/repository
```

1. Now you can build your project locally, and it will look for the latest theme gem in your filesystem instead of GitHub. Just make sure that your project requires the same branch as your local theme branch:

```ruby
gem 'devdocs', git: 'https://github.com/commerce-docs/devdocs-theme.git', branch: "your_branch_name"
```

1. Run `rake update:theme` in your doc-site project to get the latest theme from local filesystem.

## How to contribute

Clone this repository and create a feature branch. Add and test your changes, and then open a pull request to the `master` branch.
