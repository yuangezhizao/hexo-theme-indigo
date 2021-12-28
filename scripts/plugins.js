const { version, name } = require('../package.json')

hexo.extend.helper.register('theme_version', () => version)

const source = (path, cache, ext) => {
    if (cache) {
        const minFile = `${path}${ext === '.js' ? '.min' : ''}${ext}`
        return hexo.theme.config.cdn ? `//unpkg.com/${name}@latest${minFile}` : `${minFile}?v=${version}`
    } else {
        return path + ext
    }
}
hexo.extend.helper.register('theme_js', (path, cache) => source(path, cache, '.js'))
hexo.extend.helper.register('theme_css', (path, cache) => source(path, cache, '.css'))

function renderImage(src, alt = '', title = '') {
    return `<figure class="image-bubble">
                <div class="img-lightbox">
                    <div class="overlay"></div>
                    <img src="${src}" alt="${alt}" title="${title}">
                </div>
                <div class="image-caption">${title || alt}</div>
            </figure>`
}

hexo.extend.tag.register('image', ([src, alt = '', title = '']) => {
    return hexo.theme.config.lightbox ? renderImage(src, alt, title) : `<img src="${src}" alt="${alt}" title="${title}">`
})

hexo.extend.filter.register('before_post_render', data => {
    if (hexo.theme.config.lightbox) {
        // 包含图片的代码块 <escape>[\s\S]*\!\[(.*)\]\((.+)\)[\s\S]*<\/escape>
        // 行内图片 [^`]\s*\!\[(.*)\]\((.+)\)([^`]|$)
        data.content = data.content.replace(/<escape>.*\!\[(.*)\]\((.+)\).*<\/escape>|([^`]\s*|^)\!\[(.*)\]\((.+)\)([^`]|$)/gm, match => {

            // 忽略代码块中的图片
            if (/<escape>[\s\S]*<\/escape>|.?\s{3,}/.test(match)) {
                return match
            }

            return match.replace(/\!\[(.*)\]\((.+)\)/, (img, alt, src) => {
                const attrs = src.split(' ')
                const title = (attrs[1] && attrs[1].replace(/\"|\'/g, '')) || ''
                return `{% image ${attrs[0]} '${alt}' '${title}' %}`
            })
        })
    }
    return data
})

// https://github.com/fengkx/hexo-native-lazy-load
// const jsSrc = `https://cdn.jsdelivr.net/npm/lazysizes@5.1.1/lazysizes.min.js`;
// const srp = document.createElement('script');
// srp.src = '${jsSrc}';
// document.body.append(srp);
const addScript = (html)  => {
  if (!/<\/body>/gi.test(html) || !/<img/.test(html)) {
    return html;
  }
  if (html.indexOf("lazysizes") === -1) {
    const lastIndex = html.lastIndexOf("</body>");
    const script = `<script>
    if(!('loading' in HTMLImageElement.prototype)) {
        const imgs = document.querySelectorAll('img');
        imgs.forEach(el => {
            el.setAttribute('data-src', el.getAttribute('src'));
            el.removeAttribute('src');
            el.classList.add('lazyload');
    })
}
</script>`;
    return `${html.substring(0, lastIndex)}${script}${html.substring(
      lastIndex,
      html.length
    )}`;
  }
  return html;
};

const regex = /<img[^>]+src=\"(.+?)\"[^>]*>/gm;
const path = require("path");
const fs = require("fs");
const sizeOf = require("image-size");

const replace = (html, base) => {
  return html.replace(regex, (s, fname) => {
    if (s.indexOf('loading="lazy"') !== -1) {
      return s;
    }
    const p = path.join(base, fname);
    if (base !== "" && fs.existsSync(p)) {
      const dimensions = sizeOf(p);
      return (
        s.substring(0, 4) +
        ' loading="lazy"' +
        ` width="${dimensions.width}"` +
        ` height="${dimensions.height}"` +
        s.substring(4, s.length)
      );
    } else {
      return s.substring(0, 4) + ' loading="lazy"' + s.substring(4, s.length);
    }
  });
};

const log = hexo.log;

if (!hexo.config.lazy_load || !hexo.config.lazy_load.enable) {
  return;
}
if (hexo.config.lazy_load.all) {
  // default only posts
  log.info("Add lazy load attribute to all image");
  hexo.extend.filter.register(
    "after_render:html",
    function(html) {
      html = replace(html);
      return html;
    },
    15
  );
} else {
  log.info("Add lazy load attribute to all post");
  hexo.extend.filter.register(
    "after_post_render",
    function(data) {
      if (
        hexo.config.post_asset_folder === true &&
        hexo.config.lazy_load.width_height !== false
      ) {
        data.content = replace(
          data.content,
          path.join(
            hexo.source_dir,
            data.source.substring(0, data.source.length - 3)
          )
        );
      }
      data.content = replace(data.content, "");
      return data;
    },
    15
  );
}
if (hexo.config.lazy_load.fallback !== false) {
  // default enable
  log.info("Add fallback lazy load using lazysizes");
  hexo.extend.filter.register("after_render:html", addScript, 25);
}
