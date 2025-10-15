window.onload = () => {
    render()
    new LanguageSelector(document.querySelector('#LanguageSelector'))
    new ThemeSelector(document.querySelector('#ThemeSelector'))
}

function trans(key, parameters) {
    const lang = document.documentElement.lang || 'en'
    let text = window.translations[lang][key] || key
    for (const [p, v] of Object.entries(parameters)) {
        text = text.replace(`{${p}}`, v)
    }

    return text
}

function render() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const params = {}
        for (const [name, value] of Object.entries(el.dataset)) {
            if (name.startsWith('i18Param')) {
                const paramName = name.replace('i18nParam', '').toLowerCase()
                params[paramName] = value
            }
        }
        const translated = trans(el.dataset.i18n, params)
        el.innerHTML = translated
    })
}

class LanguageSelector {
    constructor(container) {
        this.element = container
        this.list = container.querySelector('ul')
        this.languages = this.list.querySelectorAll('li')
        this.currentLanguageCode = document.documentElement.lang
        
        this.languages.forEach(languageItem => {
            if (languageItem.id === this.currentLanguageCode) {
                languageItem.classList.add('selected')
                this.currentLanguageItem = languageItem
            }

            languageItem.addEventListener('click', event => this.onChangeLanguage(event, languageItem))
        })
    }

    onChangeLanguage(event, languageItem) {
        if (languageItem.id === this.currentLanguageCode) {
            return
        }

        this.currentLanguageItem.classList.remove('selected')
        this.currentLanguageItem = languageItem 
        this.currentLanguageCode = languageItem.id 
        languageItem.classList.add('selected')
        document.documentElement.lang = languageItem.id
        render()
    }
}

class ThemeSelector {
    constructor(container) {
        this.element = container 
        this.darkElement = container.querySelector('#dark')
        this.lightElement = container.querySelector('#light')
        this.selectedThem = this.darkElement 
        this.selectedThem.classList.add('selected')
        
        this.darkElement.addEventListener('click', event => this.onChangeTheme(event, this.darkElement))
        this.lightElement.addEventListener('click', event => this.onChangeTheme(event, this.lightElement))
    }

    onChangeTheme(event, themeItem) {
        console.log('on change theme', themeItem)
        if (themeItem.id === this.selectedThem.id) {
            return
        }

        this.selectedThem.classList.remove('selected')
        this.selectedThem = themeItem
        this.selectedThem.classList.add('selected')
        document.documentElement.setAttribute('data-theme', this.selectedThem.id)
    }
}


