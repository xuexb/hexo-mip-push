# hexo-mip-push

自动抓取 `public_dir` 目录下的文件推送到百度站长平台

## 使用

安装

```
npm install --save hexo-mip-push
```

配置

``` yaml
# _config.yml
url: https://www.example.com
deploy:
  - type: 'mip'
    token: 'token'
    site: 'www.example.com'
    pattern: '**/*.html'
    defaultIndex: ''
    ignore:
        - '/ignore.html'
        - '/^/404/'
```

变量名 | 说明 | 默认值
--- | --- | ---
token | 百度站长平台 MIP 数据提交的 `token` | -
site | 百度站长平台 MIP 站点的 `site` | -
pattern | 搜索文件规则, [glob模式](https://github.com/isaacs/node-glob), 以 `public_dir` 为基础路径 | `**/*.html`
defaultIndex | 默认主页, 如果配置相同的目录主页将被删除 | -
ignore | 忽略不提交的文件, 如果以 `/` 开头和结束, 将使用正则判断 | -

#### ignore

``` yaml
- /ignore.html
- /^/404/
- /error/
```

将忽略:

1. 完全匹配的 `/ignore.html` 路径
2. 正则匹配 `^\/404` 成功的路径
3. 正则匹配 `error` 成功的路径

> 内部使用的 `new RegExp()` 生成的正则判定

#### defaultIndex: index.html

抓取到的文件如:

```json
[
    "/archives/index.html",
    "/index.html",
    "/post/about.html"
]
```

生成的提交链接如:

```json
[
    "https://www.example.com/archives/",
    "https://www.example.com/",
    "https://www.example.com/post/about.html"
]
```

> 注意, 如果 `ignore` 和 `defaultIndex` 同时配置, 将先使用 `ignore` 忽略, 再使用 `defaultIndex` 去默认首页


## License

[MIT](./LICENSE)
