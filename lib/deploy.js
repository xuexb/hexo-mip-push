/**
 * @file 推送 MIP 站点
 * @author xuexb <fe.xiaowu@gmail.com>
 */

var Push = require('mip-push');
var path = require('path');
var glob = require('glob');

module.exports = function (args) {
    var hexo = this;
    var log = hexo.log;

    if (!hexo.config.url) {
        return log.error('You must configure url in _config.yml');
    }
    else if (!args.token) {
        return log.error('You must configure mip.token in _config.yml deploy');
    }
    else if (!args.site) {
        return log.error('You must configure mip.site in _config.yml deploy');
    }

    var files = glob.sync(args.pattern || '**/*.html', {
        cwd: hexo.config.public_dir
    }).map(function (uri) {
        return '/' + uri;
    });
    var baseUrl = hexo.config.url;
    if (baseUrl.substr(-1) === '/') {
        baseUrl = baseUrl.substr(0, baseUrl.length - 1);
    }

    if (args.ignore) {
        if (!Array.isArray(args.ignore)) {
            args.ignore = [args.ignore];
        }

        files = files.filter(function (uri) {
            return args.ignore.some(function (rule) {
                if ('string' === typeof rule && rule.substr(0, 1) === '/' && rule.substr(-1) === '/') {
                    return !new RegExp(rule.substr(1, rule.length - 1)).test(uri);
                }

                return uri !== rule;
            });
        });
    }

    if (args.defaultIndex) {
        files = files.map(function (uri) {
            var base = path.basename(uri);
            if (base === args.defaultIndex) {
                uri = uri.substr(0, uri.lastIndexOf(base));
            }

            return uri;
        });
    }

    if (!files.length) {
        return log.info('Did not find the file, did you run `hexo generate` build?');
    }

    return new Push({
        site: args.site,
        token: args.token
    }).push(files.map(function (uri) {
        return baseUrl + uri;
    })).then(function (data) {
        log.info(JSON.stringify(data, null, 4));
    }).catch(function (err) {
        log.error(JSON.stringify(err, null, 4));
    });
};
