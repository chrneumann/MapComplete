import { createI18n } from 'vue-i18n'

import messages from '@/l10n/messages.json'


export default function initI18n() {
    return createI18n({
        locale: 'en',
        messages
    })    
}
