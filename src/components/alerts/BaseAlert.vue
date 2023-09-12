<template>
  <div class="alert">
    <span class="alert__icon">😥</span>
    <p class="alert__text">
      {{ alertText }}
    </p>

    <BaseButton
      @click="closeAlert()"
    >
      閉じる
    </BaseButton>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import BaseButton from '@/components/ui/BaseButton.vue'

const store = useStore()

const alertText = computed(() => {
  return store.getters.getAlertText
});

const closeAlert =()=>{
  store.commit("setAlertText",null)
}
</script>

<style scoped lang="scss">
.alert {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position:fixed;
  left:0;
  right:0;
  top:50%;
  transform: translateY(-50%);
  margin:  auto ;
  box-shadow: 0 0 50px 1px rgba(0, 0, 0, 0.02);
  background:rgba(255,255,255,0.9);
  backdrop-filter: blur(1px);
  border-radius: 20px;
  z-index:9;
  max-width: 500px;
  padding: 32px;
  @media screen and (max-width:$breakpoint) { 
    width:90%;
  }

  &__text {
    font-size:$font-size-m;
    font-weight:$font-bold;
    margin-bottom: 32px;
  }
  &__icon {
    font-size: 40px;
  }
}
</style>
