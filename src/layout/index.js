import Layout from './Layout';
import { AppMain } from './components'

Layout.install = function (Vue) {
    Vue.component(Layout.name, Layout)
}

AppMain.install = function (Vue) {
    Vue.component(Layout.name, Layout)
}

export { Layout, AppMain };

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component('Layout', Layout)
    window.Vue.component('AppMain', AppMain)
}

