import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// Vuex
import store from "./store";

// File Views
import LoginUser from './views/user/LoginUser.vue';
import RegisterUser from './views/user/RegisterUser.vue';
import LogoutUser from './views/user/LogoutUser.vue';
import Home from './views/service/main.vue';
import BuffShare from './views/service/buff-share.vue';
import BuffComment from './views/service/buff-comment.vue';
import BuffShareOrCommentConfirm from './views/service/buff-confirm.vue';
import Payment from './views/service/payment.vue';
import PaymentOrder from './views/service/payment-order.vue';
import PaymentOrderConfirm from './views/service/payment-order-confirm.vue';
import Contact from './views/service/contact.vue';
import SettingUser from './views/service/settings-user.vue';
import ManageUser from './views/service/manage-user.vue';
import SettingFacebook from './views/service/settings-facebook.vue';
import SettingNotification from './views/service/settings-notification.vue';
import SettingPayment from './views/service/settings-payment.vue';

const routes = [
    // Service & Home
    { path: '/', name: 'home', component: Home, meta: { title: 'Supportlive.Az' }},
    { path: '/buff-share', name: 'buff-share', component: BuffShare, meta: { requiresAuth: true, title: 'Supportlive.Az | Buff Share Facebook' }},
    { path: '/buff-comment', name: 'buff-comment', component: BuffComment, meta: { requiresAuth: true, title: 'Supportlive.Az | Buff Comment Facebook' }},
    { path: '/payment', name: 'payment', component: Payment, meta: { requiresAuth: true, title: 'Supportlive.Az | Payment' }},
    { path: '/payment/:order_code', name: 'payment-order', component: PaymentOrder, meta: { requiresAuth: true, title: 'Supportlive.Az | Payment Confirm' }},
    { path: '/user/:username/profile', name: 'setting-user', component: SettingUser, meta: { requiresAuth: true, title: 'Supportlive.Az | Profile' }},
    { path: '/contact', name: 'contact', component: Contact, meta: { title: 'Supportlive.Az | Contact' }},

    // Admin
    { path: '/buff/:id/confirm', name: 'buff-share-or-comment-confirm', component: BuffShareOrCommentConfirm, meta: { requiresAdmin: true, title: 'Supportlive.Az | Facebook Confirm Buff' }},
    { path: '/payment/:order_code/confirm', name: 'payment-order-confirm', component: PaymentOrderConfirm, meta: { requiresAdmin: true, title: 'Supportlive.Az | Payment Confirm' }},
    
    { path: '/manage-user', name: 'manage-user', component: ManageUser, meta: { requiresAdmin: true, title: 'Supportlive.Az | Manage User' }},

    { path: '/settings-facebook', name: 'settings-facebook', component: SettingFacebook, meta: { requiresAdmin: true, title: 'Supportlive.Az | Facebook Settings' }},
    { path: '/settings-notification', name: 'settings-notification', component: SettingNotification, meta: { requiresAdmin: true, title: 'Supportlive.Az | Notifications Settings' }},
    { path: '/settings-payment', name: 'settings-payment', component: SettingPayment, meta: { requiresAdmin: true, title: 'Supportlive.Az | Payment Settings' }},

    // User
    { path: '/login', name: 'login', component: LoginUser, meta: { requiresVisitor: true, title: 'Supportlive.Az | Login' }},
    { path: '/register', name: 'register', component: RegisterUser, meta: { requiresVisitor: true, title: 'Supportlive.Az | Register' }},
    { path: '/logout', name: 'logout', component: LogoutUser},

    { path: '/:pathMatch(.*)*', redirect: { name: 'home' }}
    //requiresAuth : Nếu chưa Login thì không được truy cập
    //requiresVisitor : Nếu đã Login thì không được truy cập
];

const router = new VueRouter({
    mode:'history',
    routes
});

// READ TITLE
router.beforeEach((to, from, next) => {
    let title = to.meta.title || 'Supportlive.Az';
    document.title = title;
    next();

    if (to.meta.requiresAuth) {
        if (!store.getters.loggedIn) {
            next({
                name: 'login',
            })
        } else {
            next()
        }
    } else if (to.meta.requiresAdmin) {
        if (!store.getters.loggedIn) {
            next({
                name: 'login',
            })
        } else {
            if (store.getters.getUser.roles != '1') {
                next({
                    name: 'home',
                })
            } else {
                next()
            }
        }
    } else if (to.meta.requiresVisitor) {
        if (store.getters.loggedIn) {
            next({
                name: 'home',
            })
        } else {
            next()
        }
    } else {
        next()
    }
});

export default router;