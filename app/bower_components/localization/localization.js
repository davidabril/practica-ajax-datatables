/*!
 * rails asset localization v0.0.1
 *
 * Copyright (c) 2014 Lukas Matt <lukas@zauberstuhl.de>
 * Released under the MIT license
 *
 * Please have a look at LICENSE file for more details
 *
 * @author Lukas Matt <lukas@zauberstuhl.de>
 * @license MIT
 */

(function ( $ ) {
  var tag = "[localization] ";
  $.localization = function( path, debug ) {
    var manifestUrl = "<%= asset_path('/assets/manifest.json') %>";
    if (manifestUrl.indexOf('%') > 0) {
      console.error(tag + 'The localization plugin works in a Rails environment only!');
    }
    // strip assets folder if passed
    var strippedPath = path.replace(/^\/{0,1}assets\//g, '');
    if (typeof $.localization.manifest === 'undefined') {
      if (debug) {
        console.debug(tag + "Fetching manifest.json");
      }
      var manifest = $.parseJSON(
        $.ajax({
          url: manifestUrl,
          async: false
        }).responseText
      );
      $.localization.manifest = manifest;
    } else {
      if (debug) {
        console.debug(tag + "Found local manifest! Skipping ajax call.");
      }
    }
    var asset_path = $.localization.manifest.assets[strippedPath];
    if (typeof asset_path === 'undefined') {
      if (debug) {
        console.debug(tag + 'Asset path not found! Returning original path.');
      }
      return path;
    }
    return '/assets/' + asset_path;
  };
}( jQuery ));
