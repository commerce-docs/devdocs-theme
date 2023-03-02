# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = 'devdocs'
  spec.version       = '20'
  spec.authors       = ['Eugene Bannykh']
  spec.email         = ['ybannykh@adobe.com']

  spec.summary       = 'A theme for Adobe Commerce documentation websites.'
  spec.homepage      = 'https://github.com/commerce-docs/devdocs-theme'
  spec.license       = 'MIT'

  spec.metadata['plugin_type'] = 'theme'

  spec.files = Dir['assets/**/*', '_includes/**/*', '_layouts/**/*', 'manifest.json', 'README.md']

  spec.add_runtime_dependency 'jekyll', '>= 4.0'
end
