# hexo-mip-push

为 Hexo MIP 主题自动推送到站长平台

## 使用

安装

```
npm install --save hexo-mip-push
```

配置

``` yaml
# _config.yml
deploy:
  - type: mip
    token: token
    site: www
```

变量名 | 说明
--- | ---
token | 百度站长平台 MIP 数据提交的 `token`
site | 百度站长平台 MIP 站点的 `site`

```bash
# 生成站点链接
hexo generate

# 推送
hexo deploy
```

## 链接

- [百度站长平台 MIP 后台](http://zhanzhang.baidu.com/mip/index)
- [huiwang/hexo-baidu-url-submit](http://hui-wang.info/2016/10/23/Hexo插件之百度主动提交链接/)

## License

[MIT](./LICENSE)
