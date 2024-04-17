import type { TransformResult } from 'vite';
import type { CPackerConfig } from './types';
import { stylePacker } from './tools';

export default function (c: CPackerConfig) {
    if (c.enable !== undefined && !c.enable)
        return null
    if (!c.scopeName)
        c.scopeName = 'k-2024'

    const fileRegex = /.(scss|less|sass|css)$/
    return {
        name: 'css-re-package',
        transform(code: string, id: string): TransformResult | null {
            const match = id.match(fileRegex)
            if (match) {
                const styleType = match['1']
                return {
                    code: stylePacker(code, styleType, c),
                    map: null
                }
            }
            return { code, map: null }
        }
    }
}