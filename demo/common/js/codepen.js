/* eslint-disable */
function removeMargin(text) {
  var result = /\S/g.exec(text);
  
  if (!result) {
    return text;
  }
  var index = result.index;

  return text.replace(new RegExp("^" + text.substring(0, index), "mg"), "");
}
var href = location.href.split("/");
href.pop();
href = href.join("/");

function resolvePath(path, relativePath) {
  var path2 = path.split("/");
  var relativePath2 = (relativePath || "").split("/");

  if (relativePath2[0] === "." || relativePath2[0] === "") {
    relativePath2.shift();
  } else if(relativePath2[0].indexOf("http") > -1) {
    return relativePath;
  } else {
    var length = relativePath2.length;
    var i;
    for (i = 0; i < length; ++i) {
      if(relativePath2[i] !== "..") {
        break;
      }
    }
    path2 = path2.slice(0, path2.length - i);
    relativePath2 = relativePath2.slice(i, relativePath2.length);
  }
  
  return path2.concat(relativePath2).join("/");
  
}
$.ajax({
  url: location.href,
  dataType: "text"
}).done(function (text) {
  var html = document.createElement("html");
  html.innerHTML = text;

  var $html = $(html);
  var $body = $html.find("body");
  
  var $cssFiles = $html.find("link[href]");

  var $scripts = $html.find("script");
  var $scriptFiles = $scripts.filter(function(_, element) {
    var src = element.getAttribute("src");

    return src && src.indexOf("codepen") < 0;
  });
  var $script = $scripts.filter(function(_, element) {
    return !element.getAttribute("src");
  });
  var $style = $html.find("style");

  $script.remove();




  $html.find("a[href]").toArray().forEach(function (el) {
    el.setAttribute("href", resolvePath(href, el.getAttribute("href")));
  });
  $html.find("img[src], source[src], video[src]").toArray().forEach(function (el) {
    el.setAttribute("src", resolvePath(href, el.getAttribute("src")));
  });

  var htmlText = removeMargin($body.html().replace("\n", ""));
  var cssText = removeMargin(($style.html() || "").replace("\n", ""));
  var jsText = removeMargin($script.html().replace("\n", ""));

  // image src in javascript code
  jsText = jsText.replace(/"(\.+\/[^"]+)"/g,  function (all, source) {
    return '"' + resolvePath(href, source) + '"';
  });

  var jsPaths = $scriptFiles.toArray().map(function (el) {
    return resolvePath(href, el.getAttribute("src"));
  });
  var cssPaths = $cssFiles.toArray().map(function (el) {
    return resolvePath(href, el.getAttribute("href"));
  });

  var data = {
    title: $html.find("title").text(),
    description: $html.find("title").text(),
    private: false,
    head: "<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=medium-dpi'>",
    html: htmlText,
    html_pre_processor: "none",
    css: cssText,
    css_pre_processor: "none",
    css_starter: "neither",
    css_prefix_free: false,
    js: jsText,
    js_pre_processor: "babel",
    html_classes: "loading",
    css_external: cssPaths.join(";"),
    js_external: jsPaths.join(";") // "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js;" + window.LIBLINK.join(";")
  };
  $(document).ready(function () {
    (document.querySelector(".source") || document.body).insertAdjacentHTML("afterbegin", '<form class="codepenform" action="https://codepen.io/pen/define" method="POST" target="_blank">' +
    '<input type="hidden" name="data" value=\'' + JSON.stringify(data).replace(/"/g, "&quot;").replace(/'/g, "&apos;") + '\'>' +
    '<input type="image" src="../../../common/img/cp-arrow-right' + "-black" + '.svg" width="40" height="40" value="Create New Pen with Prefilled Data" class="codepen-mover-button" style="position:absolute;z-index:5;right: 10px; top: 5px;">' +
    '</form>');
  });
});