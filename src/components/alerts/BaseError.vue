<template>
  <div class="error">
    <span class="error__icon">😭</span>
    <p class="error__text">
      {{ errorText }}
    </p>

    <BaseButton
      @click="backHome()"
    >
      HOMEへ戻る
    </BaseButton>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'

const store = useStore()
const router = useRouter()

const errorText = computed(() => {
  return store.getters.getErrorText
});

const backHome =()=>{
  store.commit("setErrorText",null)
  router.push({ path: '/' })
}
</script>

<style scoped lang="scss">
.error {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: fixed;
  background:#aaa;
  top:0;
  left:0;
  right:0;
  bottom:0;
  z-index:9;
  background:rgba(233, 233, 233,0.7);
  backdrop-filter: blur(5px);

  &__text {
    font-size:$font-size-xl;
    font-weight:$font-bold;
    margin-bottom: 32px;
  }
  &__icon {
    font-size: 10vh;
  }
}
</style>
