import axios from 'axios';
import { loginUrl, signupUrl } from '../../common';
import router from '@/router';

export const namespaced = true;

export const state = {
    error: null,
    errors: {
        username: '',
        password: '',
        non_field_errors: '',
        email: '',
        password2: '',
    },
    dummy: []
};

export const mutations = {
    error (state, errors) {
        for(var e in errors) {
            if (e) {
                if (e === 'non_field_errors') {
                    state.errors.non_field_errors = errors[e][0]
                }
                state.errors[e] = errors[e][0]
            }
        }
    },
    clear(state, field) {
        state.errors[field] = '';
        state.errors.non_field_errors = '';
    },
    setDummy(state, dummy) {
        state.dummy = dummy
    }

};

export const actions = {
    clearErrors({ commit }, data) {
        commit('clear', data)
    },
    login({ commit }, data) {
        try {
            axios.post(loginUrl, {
                'username': data.username,
                'password': data.password
            })
            .then(response => {
                // console.log(response)
                if (response.status === 200 || response.ok) {
                    window.localStorage.setItem('token', response.data.token);
                }
                router.push('/home', () => {});
            })
            .catch(error => {
                const errors = error.response.data;
                commit('error', errors)
            })
        } catch (e) {
            // console.warn(e)
        }
    },
    signup({ commit }, data) {
        try {
            axios.post(signupUrl, {
                'username': data.username,
                'email': data.email,
                'password': data.password,
                'password2': data.password2,
            })
            .then(response => {
                // console.log(response)
                const data = response.data
                commit('setDummy', data)
                router.push({ name: 'Login'})
            })
            .catch(error => {
                const errors = error.response.data;
                commit('error', errors)
            })
        } catch (e) {
            // console.warn(e)
        }
    },
    disconnect() {
        const token = window.localStorage.getItem('token')
        if (token) {
            window.localStorage.removeItem('token');
        }
    }
}

export const getters = {
    isAuthenticated: () => {
        return !!window.localStorage.getItem('token');
    }
};