<template>
  <div class="header">
    <div
      @click="toggle"
      class="header-menu"
    >
      <div>{{this.user.user ? this.user.user.username : this.user.username }}</div>
      <img
        v-if="user.photo"
        :src="user.photo"
        class="header-menu-photo"
        alt="avatar"
      />
      <img
        v-else
        src="@/assets/logo.png"
        class="header-menu-photo"
        alt="avatar"
      />
    </div>
    <transition name="slide-fade">
      <div class="menu" v-if="showDropDown">
        <div class="menu-list">
          <div v-for="(link, i) in links" :key="i" class="list" @click="logout(link)">
            <span class="menu-icon" v-html="link.icon"></span><router-link :to="link.url" class="menu-link">{{link.name}}</router-link>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Header",
  props: {
    user: Object
  },
  data () {
      return {
        showDropDown: false,
        links: [
            {
            name: "Profile",
            url: `/${this.user.user ? this.user.user.username: this.user.username}/profile`,
            icon: `
            <svg viewBox="0 0 496 512">
            <path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm128 421.6c-35.9 26.5-80.1 42.4-128 42.4s-92.1-15.9-128-42.4V416c0-35.3 28.7-64 64-64 11.1 0 27.5 11.4 64 11.4 36.6 0 52.8-11.4 64-11.4 35.3 0 64 28.7 64 64v13.6zm30.6-27.5c-6.8-46.4-46.3-82.1-94.6-82.1-20.5 0-30.4 11.4-64 11.4S204.6 320 184 320c-48.3 0-87.8 35.7-94.6 82.1C53.9 363.6 32 312.4 32 256c0-119.1 96.9-216 216-216s216 96.9 216 216c0 56.4-21.9 107.6-57.4 146.1zM248 120c-48.6 0-88 39.4-88 88s39.4 88 88 88 88-39.4 88-88-39.4-88-88-88zm0 144c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56z" />
            </svg>
            `
            },
            {
            name: "Logout",
            url: '#',
            icon: `
            <svg viewBox="0 0 512 512">
            <path fill="currentColor" d="M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 7.1 5.8 12 12 12 2.4 0 4.9-.7 7.1-2.4L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64zm32 352c0 17.6-14.4 32-32 32H293.3l-8.5 6.4L192 460v-76H64c-17.6 0-32-14.4-32-32V64c0-17.6 14.4-32 32-32h384c17.6 0 32 14.4 32 32v288zm-224-88c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zm-8.5-24h17c4.2 0 7.7-3.3 8-7.5l7-112c.3-4.6-3.4-8.5-8-8.5h-31c-4.6 0-8.3 3.9-8 8.5l7 112c.3 4.2 3.8 7.5 8 7.5z" />
            </svg>
            `
            }
        ]
    }
  },
  created() {
    const data = { userId: this.user.user ? this.user.user.id : this.user.id };
    this.fetchUserProfile(data);
  },
  methods: {
    ...mapActions("auth", ["disconnect", "fetchUserProfile"]),
    logout(link) {
      switch (link.name) {
          case 'Logout':
              this.disconnect();
              this.$router.push({ name: "Login" });
              break;

          default:
              break;
      }
    },
    toggle() {
        this.showDropDown = !this.showDropDown
    }
  }
};
</script>

<style lang='scss' scoped>
.header {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
    position: relative;
}

.header-menu {
    display: flex;
    align-items: center;
}

.header-menu-photo {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    margin-left: 1rem;
}

.menu {
    background: #ffffff;
    z-index: 101;
    position: absolute;
    top: 50px;
    right: 20px;
    border: 1px solid #cccccc;
    border-radius: 12px;

    .menu-list {
        .list {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 0.8rem 0.8rem;
        }
        .menu-icon {
            width: 1.5rem;
            height: 1.5rem;
            margin-right: 0.8rem;
        }
        .menu-link {
            text-decoration: none;
            margin-top: 0.2rem;
            margin-bottom: 0.2rem;
            color: #2c3e50;
        }
    }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.6s;
}
.slide-fade-enter,
.slide-fade-leave-active {
  opacity: 0;
}
.slide-fade-enter {
  transform: translateY(-31px);
}
.slide-fade-leave-active {
  transform: translateY(31px);
}
</style>
