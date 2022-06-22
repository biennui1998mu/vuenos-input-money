import VuenosInputMoney from "./components/vuenos-input-money.vue";

declare global {
    interface Window { Vue: any; }
}

const VuenosInputMoneySimple = {
    install(Vue: any, options: any) {
        // Let's register our component globally
        // https://vuejs.org/v2/guide/components-registration.html
        Vue.component("vuenos-input-money", VuenosInputMoney);
    }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuenosInputMoneySimple);
}

export default VuenosInputMoneySimple;