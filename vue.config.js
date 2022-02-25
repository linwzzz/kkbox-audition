module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/kkbox-audition/' // kkbox-audition 為 repo 名稱
      : '/'
  }