export const ui = {
    en: {
        'headerlink.home': 'Home',
        'headerlink.blog': 'Blog',
        'headerlink.gallery': 'Gallery',
        'headerlink.about': 'About me',
        'bloglist.readmyblog': 'Read my blog',
        'bloglist.description': 'Come walk with me through clouds and code, anime and math symbols, where logic holds emotion gently, and creation becomes our way home.',
        'bloglist.allcategories': 'All Categories',
        'bloglist.readmythoughts': 'Read my thoughts'
    },
    zh: {
        'headerlink.home': '首页',
        'headerlink.blog': '文章',
        'headerlink.gallery': '相册',
        'headerlink.about': '关于我',
        'bloglist.readmyblog': ' 欢迎来到我的个人空间',
        'bloglist.description': '天上的云朵、地上的群峰、屏幕里的代码、纸上的数学符号，书中的角色与风景。在繁忙的理性思维运作的现实的另一面，这是一个纯粹让我自己的感性充分绽放的乌托邦。',
        'bloglist.allcategories': '所有文章',
        'bloglist.readmythoughts': '阅读全文'
    },
    ja: {
        'headerlink.home': 'ホーム',
        'headerlink.blog': 'ブログ',
        'headerlink.gallery': 'ギャラリー',
        'headerlink.about': 'About me',
        // 'bloglist.readmyblog': To be translated.
        // 'bloglist.description': To be translated.
        'bloglist.allcategories': 'すべてのカテゴリ',
        'bloglist.readmythoughts': '続きを読む'
    }
}

export type UIKeys = keyof typeof ui.en;