import Translation from "../../UI/i18n/Translation"
import set from "lodash/set";

/**
 * Converts our old custom translations format
 * to a flat babelEdit json.
 * 
 * see UI/i18n/Translations + https://kazupon.github.io/vue-i18n/guide/tooling.html#babeledit
 */
export default function old2vueI18n(old: object, root: object = {}, path = '') {
    for (const entry of Object.entries(old)) {
        const key = entry[0]
        const val = entry[1]

        if (val instanceof Translation) {
            for (const entry of Object.entries(val.translations)) {
                const language = entry[0]
                const translation = entry[1]

                if (typeof language !== 'string' || typeof translation !== 'string') {
                    throw new Error(`Bad translation type at ${path}.${language}`);
                }

                let translationPath = language
                if (path !== '') {
                    translationPath += `.${path}`
                }
                translationPath += `.${key}`
                set(root, translationPath, translation)
            }
        } else {
            let subPath = ''
            if (path !== '') {
                subPath += `${path}.`
            }
            subPath += `${key}`
            old2vueI18n(val, root, subPath)
        }
    }
    return root
}