<template>
  <div id="app"
  :class="[{'collapsed' : collapsed}]">
    <div class="app">
      <div>
        <router-view/>
      </div>
      <sidebar-menu 
      :menu="menu"
      :theme="'white-theme'"
      :collapsed="collapsed"
      @toggle-collapse="onToggleCollapse"
      @item-click="onItemClick">
      <span slot="toggle-icon">
        <font-awesome-icon icon="bars" size="lg"></font-awesome-icon>
      </span>
    </sidebar-menu>
    </div>
  </div>
</template>

<script>
import { SidebarMenu } from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

export default {
  data() {
    return {
      menu: [
        {
          href: '/',
          title: 'Home',
          icon: {
            element: 'font-awesome-icon',
            attributes: {
              icon: 'images',
              size: 'lg'
            },
            text: ''
          }
        },
        {
          href: '/about',
          title: 'About',
          icon: {
            element: 'font-awesome-icon',
            attributes: {
              icon: 'ellipsis-h',
              size: 'lg'
            },
            text: ''
          }
        },
        {
          href: '/chat',
          title: 'Chatbox',
          icon: {
            element: 'font-awesome-icon',
            attributes: {
              icon: 'comment-dots',
              size: 'lg'
            },
            text: ''
          }
        }
      ],
      collapsed: true,

    }
  },
  methods: {
    onToggleCollapse (collapsed) {
      this.collapsed = collapsed
    },
    onItemClick (/*event, item*/) {
      // console.log('onItemClick')
      // console.log(event)
      // console.log(item)
    }
  },
  components: {
    SidebarMenu
  }
}
</script>

<style lang="scss">
#app {
  padding-left: 350px;
}

#app.collapsed {
  padding-left: 50px;
}

.app {
  padding: 0;
  margin: 0;
  overflow: hidden;
}
</style>
