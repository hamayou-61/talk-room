<template>
  <router-link
    v-if="link"
    :to="to"
    class="btn"
  >
    <span class="btn__bg" />
    <slot />
  </router-link>

  <button
    v-else
    class="btn"
    v-bind="$attrs"
    @click="$emit('onClick')"
  >
    <span class="btn__bg" />
    <span
      v-if="loading"
      class="is-loading"
    />
    <slot v-else />
  </button>
</template>

<script setup>
defineEmits(['onClick'])

defineProps({
  link: {
    type:Boolean,
    default: false
  },
  to: {
    type: [String, Object],
    default: '/',
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss">
.btn {
  background: $color-theme;
  color: #fff;
  width: 50%;
  max-width: 180px;
  font-weight: 600;
  padding: 16px 34px;
  border-radius: 20px;
  position:relative;
  transition: all 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;

  &__bg {
    position:absolute;
    background: rgba(59, 57, 66, 0.2);
    border-radius: 20px;
    height: 100%;
    opacity: 0;
    transform: scale(1, 1);
    width: 100%;
    max-width: 100%;
    z-index: -1;
    left:0;
    right:0;
    top:0;
    bottom:0;
  }

  &:hover{
    background: $color-dark-theme;
    transform: scale(1.1);
    transition: all 0.2s;
    color:#fff;
 }
  &:hover .btn__bg{
    animation: scale1  .8s  1;
  }
}

.is-loading {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 0.25rem solid $color-theme;
  border-top-color: rgb(255, 255, 255);
  animation: spin 1s infinite linear;
}
@keyframes scale1 {
  0% { 
    opacity: 1;
    transform: scale(1, 1);
  }

  100% { 
    opacity: 0;
    transform: scale(1.3, 1.5);
  }
}
@keyframes scale2 {
  0% { 
    opacity: 1;
    transform: scale(1, 1);
 }

  100% { 
    opacity: 0;
    transform: scale(1.2, 1.2);
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
