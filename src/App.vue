<template>
  <BaseError v-if="error" />
  <router-view />
  <span 
    class="room-line" 
    :class="{
      'is-regist': isViewName == 'RegistView',
      'is-talk': isViewName == 'TalkView'
    }"
  />

  <Particles
    id="particles"
    :particles-init="particlesInit"
    :options="originalOptions"
  />
</template>

<script setup>

import { useStore } from "vuex";
import { ref,computed, watch } from "vue";
import { useRoute } from "vue-router";

import { loadSlim } from "tsparticles-slim";
import BaseError from "@/components/alerts/BaseError.vue"
import originalOptions from "@/plugins/particles";

const route = useRoute()

const store = useStore();
const error = computed(() => store.getters.getErrorText);
const isViewName = ref(null);

watch(
  () => route.name,
  () => {
    isViewName.value = route.name
  },
  { immediate: true }
)

const particlesInit = async engine => {
  await loadSlim(engine);
};
</script>

<style scoped lang="scss">
#particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(to top, #fdf9f3,#fffcf9 );
}

.room-line {
  display: block;
  width: 1px;
  height: 60%;
  position:fixed;
  left: 75%;
  top:0;
  background:#aaa;
  z-index:0;
  transition: all 0.5s;
  &::before,
  &::after {
    display: block;
    width: 1px;
    position: absolute;
    transform-origin: 0 0;
    content: "";
    left: 0;
    background: linear-gradient(#aaa, 90%, rgba(255,255,255,0));
  }
  &::before {
    height: 150%;
    bottom: -150%;
    transform: rotate(-70deg);
  }
  &::after {
    height: 170%;
    bottom: -170%;
    transform: rotate(70deg);
  }
  &.is-regist {
    left: 85%;
    height: 80%;
    &::before {
      height: 150%;
      bottom: -150%;
      transform: rotate(-70deg);
    }
    &::after {
      height: 170%;
      bottom: -170%;
      transform: rotate(70deg);
    }
  }
  &.is-talk {
    left: 50%;
    height: 40%;
    &::before {
      height: 150%;
      bottom: -150%;
      transform: rotate(-70deg);
    }
    &::after {
      height: 170%;
      bottom: -170%;
      transform: rotate(70deg);
    }
  }
}

@media screen and (max-width:$breakpoint) { 
  .room-line {
    height: 68%;
    &.is-regist {
      height: 85%;
    }
  }
}
</style>
