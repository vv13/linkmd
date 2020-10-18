Convert URLs to Markdown links. When put link to Markdown, it's unnecessary to figure out what title should be in link, so I write a simple tool to find the link title.

## Usgae
Recommend use it directly by npx:
```
➜ npx linkmd https://google.com
(Google)[https://google.com]
```

If you use it often, install it globally:
```
➜ npm i -g linkmd
➜ linkmd https://google.com
```

You can also use it in your project:
```
import linkmd from 'linkmd'

const result1 = linkmd('https://www.google.com')
const result2 = linkmd(['https://facebook.com', 'https://youtube.com'])
//...
```
