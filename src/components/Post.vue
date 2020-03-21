<template>
  <div class='vuegram-post'>
    <div class='header level'>
      <div class='level-left'>
        <figure class='image is-32x32'>
          <img :src='post.userImage' />
        </figure>
        <span class='username'>{{post.username}}</span>
      </div>
    </div>
    <div class='image-container'
      :class='post.filter'
      :style="{ backgroundImage: 'url(' + post.postImage + ')' }"
      @dblclick='like'>
    </div>
    <div class='content'>
      <div class='heart'>
        <font-awesome-icon 
          icon="heart" size="lg"
          :class="{'fas': this.post.hasBeenLiked}"
          @click='like'>
        </font-awesome-icon>
      </div>
      <p class='likes'>{{post.likes}} likes</p>
      <p class='caption'><span>{{post.username}}</span> {{post.caption}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: {
    post: Object,
  },
  methods: {
    like() {
      this.post.likes = this.post.hasBeenLiked ? this.post.likes - 1 : this.post.likes + 1;
      this.post.hasBeenLiked = !this.post.hasBeenLiked;
    },
  },
};
</script>

<style lang='scss'>
.vuegram-post {
  padding-top: 50px;
}

.vuegram-post ~ .vuegram-post {
  padding-top: 0;
}

.vuegram-post {
  padding: 5px 0;

  .header {
    height: 30px;
    border-bottom: 1px solid #fff;
    margin: 7.5px 10px;

    .image {
      display: inline-block;
      
      &.is-32x32 {

        img {
          height: 32px;
          width: 32px;
        }

      }
    }

    img {
      border-radius: 100%;
    }

    .username {
      position: relative;
      top: 3px;
      padding-left: 5px;
      font-size: 0.9rem;
      font-weight: bold;
    }
  }

  .level {
    display: flex;
    margin-bottom: 0.5rem !important;

    .level-left {
      display: flex;
      align-items: center;
    }
  }

  .image-container {
    height: 330px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  .content {
    margin: 7.5px 10px;
    display: flex;
    align-items: center;
  }

  .far.fa-heart,
  .fas.fa-heart {
    cursor: pointer;
  }

  .fas.fa-heart {
    color: #f06595;
  }

  .likes {
    margin: 5px 10px 0 0;
    margin-bottom: 5px !important;
    font-size: 0.85rem;
    font-weight: bold;
  }

  .caption {
    font-size: 0.85rem;

    span {
      font-weight: bold;
    }
  }
}

.vuegram-post:last-child {
  margin-bottom: 80px;
}
</style>
