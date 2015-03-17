Rails assets localization
=========================

RAL will give you the ability to search for asset paths in plain javascript.

Installation
------------

Add [rails-assets.org](https://rails-assets.org/) source to your `Gemfile`:

    source 'http://rails-assets.org'

And then behave like normal:

    gem 'rails-assets-localization'

Usage
-----

    $.localization('/assets/<YOUR_APP>/locales/en/translation.json');
    // or
    $.localization('<YOUR_APP>/locales/en/translation.json');

You can enable debugging by passing a boolean parameter:

    $.localization('<YOUR_APP>/locales/en/translation.json', true);
