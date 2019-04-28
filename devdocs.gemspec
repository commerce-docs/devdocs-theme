# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "devdocs"
  spec.version       = "0.0.1"
  spec.authors       = ["Eugene Bannykh"]
  spec.email         = ["ybannykh@adobe.com"]

  spec.summary       = %q{A theme for Magento documentation websites.}
  spec.homepage      = "https://github.com/magento-devdocs/devdocs-theme"
  spec.license       = "MIT"

  spec.metadata["plugin_type"] = "theme"

  spec.files         = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^(assets|_(includes|layouts)/|(LICENSE|README)((\.(txt|md|markdown)|$)))}i)
  end

  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }

  spec.add_runtime_dependency "jekyll", ">= 3.3"
  spec.add_development_dependency "bundler", ">= 1.12"
end
