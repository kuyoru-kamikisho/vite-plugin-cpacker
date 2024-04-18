import {CPackerConfig} from "../types";

export function stylePacker(code: string, type: string, config: CPackerConfig): string {
    const scopeName = config.scopeName
    const sass = config.sass
    const less = config.less

    const exld = config.exclude ?? `(?:\\[${scopeName}\\])\\s*{[^{}]*}`

    const regex1 = /:root|:scope/g
    const regex2 = /(?::root|:scope)\s*{[^{}]*}/g
    const regex3 = new RegExp(exld, 'gs')

    function tCss(s: string) {
        if (sass || less) {
            if (sass) {
                return tSass(s)
            } else {
                return tLess(s)
            }
        } else {
            throw new Error('未检测到任何可用的css处理器，您至少需要安装sass或less，并通过参数传递给插件')
        }
    }

    function tSass(s: string) {
        if (sass) {
            return sass.compileString(s).css
        } else {
            throw new Error('您需要安装Sass')
        }
    }

    function tLess(s: string) {
        let css = ''
        if (less) {
            less.render(s, {}, function (err, output) {
                if (err) {
                    throw err
                }
                css = output.css
            })
            return css
        } else {
            throw new Error('您需要安装Less')
        }
    }

    function cssRootScoper() {
        let rootStr = ''
        let excludeStr = ''
        code = code.replace(regex2, match => {
            rootStr += match
            return ''
        });
        code = code.replace(regex3, match => {
            excludeStr += match
            return ''
        })
        rootStr = rootStr.replace(regex1, `[${scopeName}]`)
        return rootStr + excludeStr
    }

    function wrap() {
        return `${cssRootScoper()} \n [${scopeName}] { \n ${code} \n }`
    }

    switch (type) {
        case 'css':
            return tCss(wrap())
        case 'less':
            return tLess(wrap())
        case 'scss':
            return tSass(wrap())
        case 'sass':
            return tSass(wrap())
        default:
            return code
    }
}
