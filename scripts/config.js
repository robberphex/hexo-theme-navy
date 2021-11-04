/* global hexo */

'use strict';

function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}

function merge(target, source) {
    for (const key in source) {
        if (isObject(target[key]) && isObject(source[key])) {
            merge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
}

hexo.on('generateBefore', () => {
    let data = hexo.locals.get('data');

    // Custom languages support. Introduced in NexT v6.3.0.
    if (data.languages) {
        let { language } = hexo.config;
        let { i18n } = hexo.theme;

        const mergeLang = lang => {
            i18n.set(lang, merge(i18n.get([lang]), data.languages[lang]));
        };

        if (Array.isArray(language)) {
            for (let lang of language) {
                mergeLang(lang);
            }
        } else {
            mergeLang(language);
        }
    }
});
