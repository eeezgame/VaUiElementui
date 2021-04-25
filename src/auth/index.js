import Login from './Login';
import LoginForm from './LoginForm';
// import Logout from './Logout';

Login.install = function (Vue) {
    Vue.component(Login.name, Login)
}

LoginForm.install = function (Vue) {
    Vue.component(LoginForm.name, LoginForm)
}
// export { Login, LoginForm, Logout };
export { Login, LoginForm };

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component('login-form', LoginForm)
    window.Vue.component('login', Login)
}
  
