```txt
       _ __        _             __          _                            __          
 _  __(_) /____   (_)_________  / /_ _____ _(_)__  ___________  ___ _____/ /_____ ____
| |/ / / __/ -_) / (_-<___/ _ \/ / // / _ `/ / _ \/___/ __/ _ \/ _ `/ __/  '_/ -_) __/
|___/_/\__/\__/_/ /___/  / .__/_/\_,_/\_, /_/_//_/    \__/ .__/\_,_/\__/_/\_\\__/_/   
             |___/      /_/          /___/              /_/                           
```

### 介绍

倘若你的浏览器应用是一个需要被嵌入到其它页面中的应用，
而且在嵌入过程中你遇到了样式的干扰性问题，
那么你可以使用本插件来帮助你解决这个问题。

本插件会尝试在您的所有样式外面额外添加一个
[属性选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_selectors)
来达到隔离的效果。

对于 [:scope](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:scope)
和 [:root](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:root)
元素，本插件会直接替换为对应的属性选择器，因此如果您的项目中使用了
[@scope](https://developer.mozilla.org/en-US/docs/Web/CSS/@scope)
方法，那么本插件可能并不适合您，本插件并未对 @scope 进行处理，这是出于 @scope 的兼容性考虑的。

### 如何使用

#### 1. 安装css预处理器

本插件的配置项要求您传入至少一个css处理器，
您可以从 [scss](https://sass-lang.com/documentation/js-api/functions/compilestring/)
或者 [less](https://lesscss.org/usage/#programmatic-usage) 中进行选择，
也可以同时传入，这取决于您在项目中使用了什么样式处理器，
本插件在重新编排样式时会根据文件类型自动选择合适的处理器。

#### 2. 安装本插件并导入

```shell
yarn add vitejs-plugin-cpacker -D
```

```typescript
// vite.config.ts

import * as sass from 'sass'
import less from 'less'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import cpacker from 'vitejs-plugin-cpacker'

export default defineConfig({
    plugins: [
        vue(),
        cpacker({
            sass,                   // 取决于您在项目中具体使用的样式类型
            less,
            scopeName: 'testname'   // 按照您的喜好自由设置，该名称将在下面用到
        })
    ],
})
```

到这里，您的样式应该已经被隔离了，您的页面现在应该丢失了大部分样式，
但别担心，继续按照下面的流程。

#### 3. 修改入口html文件

以下面的 html 代码为例，想好您想要限制的样式生效范围，
然后将您在上面声明的 `scopeName` 的值以 `属性` 名称的方式写到对应的元素上面：

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Vue + TS</title>
  </head>
  <body testname>
    <!-- 现在，所有样式都会被限制在 [testname] 的后代元素上 -->
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

到这里，您应该可以发现您的很多样式都回来了，但并不是全部，还有一些漏网之鱼。

#### 4. 调整样式文件

您声明的一些样式仍未正确应用的原因可能是因为您为您的目标限制容器（也就是上面的 `body[testname]`元素）
添加了样式。

比如说像下面这样：

```css
body {
    color: red;
}
```

被本插件转换后会变成：

```css
[testname] body {
    color: red;
}
```

这看起来很糟糕！不过没关系，您只需要修改您的css源码为下面这样，
本插件就会直接跳过这一块样式的内容了：

```css
[testname] {
    color: red;
}
```

❤ 在插件中，为了让您的一些全局样式生效，任何以 `[testname]`
开头的样式表都会被跳过转换原封不动的输出到您的最终文件中，
但是要注意不要对 :root or :scope 使用这种写法。

### 配置选项

```typescript
export type CPackerConfig = {
    enable      ?: boolean      // 是否启用插件
    scopeName   ?: string       // 限定名称，会被用做属性选择器
    sass        ?: any          // css预处理器，至少要传递一个css处理器，即使您的项目中只用了css
    less        ?: any          // css预处理器，至少要传递一个css处理器，即使您的项目中只用了css
}
```

### 测试本插件

您可以直接克隆本仓库并直接在本地运行。
