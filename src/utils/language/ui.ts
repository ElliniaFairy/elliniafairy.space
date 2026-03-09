export const ui = {
    en: {
        'headerlink.home': 'Home',
        'headerlink.blog': 'Blog',
        'headerlink.gallery': 'Gallery',
        'headerlink.about': 'About me'
    },
    zh: {
        'headerlink.home': '首页',
        'headerlink.blog': '文章',
        'headerlink.gallery': '相册',
        'headerlink.about': '关于我'
    },
    ja: {
        'headerlink.home': 'ホーム',
        'headerlink.blog': 'ブログ',
        'headerlink.gallery': 'ギャラリー',
        'headerlink.about': 'About me'
    }
}

export type UIKeys = keyof typeof ui.en;