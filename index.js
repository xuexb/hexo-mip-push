/**
 * @file hexo-mip-css
 * @author xuexb <fe.xiaowu@gmail.com>
 */

/* global hexo */

var Push = require('mip-push');
var path = require('path');
var MIP_MAP_NAME = '.mip.json';

hexo.extend.generator.register('create-mip-map', function (data) {
    var urls = [];

    var addUrl = function (val) {
        urls.push(typeof val === 'string' ? val : val.permalink);
    };

    data.pages.forEach(function (page) {
        addUrl(page.permalink);
        (page.tags || []).forEach(addUrl);
    });

    data.posts.forEach(function (post) {
        addUrl(post.permalink);
        (post.tags || []).forEach(addUrl);
    });

    return {
        path: MIP_MAP_NAME,
        data: JSON.stringify(urls)
    };
});

hexo.extend.deployer.register('mip', function (args) {
    var log = this.log;

    if (!args.token) {
        return log.error('mip.token must be set!');
    }
    else if (!args.site) {
        return log.error('mip.site must be set!');
    }

    var urls;

    try {
        urls = require(path.resolve(this.public_dir, MIP_MAP_NAME));
    }
    catch (e) {
        return log.error('Read public/' + MIP_MAP_NAME + ' failed');
    }

    if (!urls || !urls.length) {
        return log.info('Did not find a link available');
    }

    new Push({
        site: args.site,
        token: args.token
    }).push(urls).then(function (data) {
        log.info(JSON.stringify(data, null, 4));
    }).catch(function (err) {
        log.error(JSON.stringify(err, null, 4));
    });
});
