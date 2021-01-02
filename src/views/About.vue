<template>
  <div class="app-about">
    <h1>This is an about page</h1>
    <flicking
      :options="{ gap: 10, moveType: 'freeScroll' }"
      :tag="'div'"
      :viewportTag="'div'"
      :cameraTag="'div'"
      :plugins="plugins"
      @need-panel="
        (e) => {
          // ADD PANELS
        }
      "
      @move-end="
        (e) => {
          // HANDLE INDEX CHANGE
        }
      "
    >
      <div>CONTENTS OF PANEL 0</div>
      <div>CONTENTS OF PANEL 1</div>
      <div>CONTENTS OF PANEL 2</div>
    </flicking>
  </div>
</template>

<script>
import { Flicking } from "@egjs/vue-flicking";

export default {
  components: {
    Flicking: Flicking
  }
}
</script>