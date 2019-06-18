# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "devdocs"
  spec.version       = "2"
  spec.authors       = ["Eugene Bannykh"]
  spec.email         = ["ybannykh@adobe.com"]

  spec.summary       = "A theme for Magento documentation websites."
  spec.homepage      = "https://github.com/magento-devdocs/devdocs-theme"
  spec.license       = "MIT"

  spec.metadata["plugin_type"] = "theme"

  spec.files         = Dir["assets/**/*", "_includes/**/*", "_layouts/**/*", "manifest.json", "README.md"]

  spec.add_runtime_dependency "jekyll", ">= 3.3"
  spec.add_development_dependency "bundler", ">= 1.12"
end
