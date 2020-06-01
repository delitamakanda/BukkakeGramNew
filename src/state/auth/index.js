import axios from 'axios';
import { loginUrl, signupUrl, profileUrl, userUrl } from '../../common';
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
        first_name: '',
        last_name: '',
        date_of_birth: '',
        photo: '',
        bio: ''
    },
    user: {},
    profile: {},
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
    setUser(state, user) {
        state.user = user
    },
    addInfo(state, profile) {
       state.profile = profile
    },
};

export const actions = {
    clearErrors({ commit }, data) {
        commit('clear', data)
    },
    fetchUser({ commit }, data) {
        try {
            axios.get(userUrl(data.userId))
            .then(response => {
                // console.log(response.data)
                const data = response.data;
                commit('setUser', data)
            })
            .catch(() => {
                // console.log(error)
            })
        } catch (e) {
            // console.warn(e)
        }
    },
    fetchUserProfile({ commit }, data) {
        try {
            axios.get(profileUrl(data.userId))
            .then(response => {
                // console.log(response.data)
                const data = response.data;
                commit('addInfo', data)
            })
            .catch(() => {
                // console.log(error)
            })
        } catch (e) {
            // console.warn(e)
        }
    },
    updateUser({ commit }, data) {
        try {
            axios.put(userUrl(data.userId), {
                'username': data.username,
                'email': data.email,
                'first_name': data.first_name,
                'last_name': data.last_name
            })
            .then(response => {
                const data = response.data;
                commit('setUser', data);
            })
            .catch(error => {
                const errors = error.response.data;
                commit('error', errors)
            });
        } catch (e) {
            // console.warn(e)
        }
    },
    updateUserProfile({ commit }, data) {
        try {
            const config = {
                headers: {
                    // 'Content-type':'multipart/form-data',
                    // 'Content-Disposition': 'attachment; filename=file',
                    // 'filename': 'file'
                }
            }
            axios.put(profileUrl(data.userId), {
                'date_of_birth': data.date_of_birth,
                'photo': data.photo,
                'bio': data.bio,
            }, config)
            .then(response => {
                // console.log(response.data)
                const data = response.data;
                commit('addInfo', data);
            })
            .catch(error => {
                const errors = error.response.data;
                commit('error', errors)
            });
        } catch (e) {
            // console.warn(e)
        }
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
                    commit('setUser', response.data);
                }
                router.push('/', () => {});
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
            .then(() => {                
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
    disconnect({ commit }) {
        const token = window.localStorage.getItem('token')
        if (token) {
            window.localStorage.removeItem('token');
            commit('setUser', {})
            commit('addInfo', {})
        }
    }
}

export const getters = {
    isAuthenticated: () => {
        return !!window.localStorage.getItem('token');
    },
    user: (state) => {
        return state.user
    },
    profile: (state) => {
        return state.profile
    }
};