/**
 * @file 推送 MIP 站点
 * @author xuexb <fe.xiaowu@gmail.com>
 */

/* global hexo */

hexo.extend.deployer.register('mip', require('./lib/deploy.js'));
