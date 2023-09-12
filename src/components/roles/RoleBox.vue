<template>
  <div
    class="role"
    :class="{ 'is-speaking': isSpeaking }"
  >
    <span class="role__bg" />
    <component
      :is="roleImage"
      ref="roleRef"
      :speaking="isSpeaking"
      class="role__img"
    />
  </div>
</template>

<script setup>
import { ref,computed } from "vue";
import { useStore } from "vuex";
import RoleImage01 from "@/components/roles/RoleImage01.vue";
import RoleImage02 from "@/components/roles/RoleImage02.vue";
import RoleImage03 from "@/components/roles/RoleImage03.vue";

const store = useStore();
const roleRef = ref(null);

const roleImage = computed(() => {
  const name = store.getters.getRole;
  let imageSrc =""
  if(name == "30代男性"){
    imageSrc = RoleImage01
  } else if(name == "30代女性"){
    imageSrc = RoleImage02
  } else if(name == "3歳女児") {
    imageSrc =  RoleImage03
  }
  return imageSrc
});

const isSpeaking = computed(() => {
  return store.getters.getIsSpeaking;
});
</script>

<style scoped lang="scss">

.role {
  position: fixed;
  left: 0;
  right: 0;
  top: 10%;
  margin: auto;
  width: 55vh;
  height: 55vh;
  z-index: 2;

  &__bg {
    width: 50vh;
    height: 50vh;
    display:block;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.05);
    border-radius:50%;
    position:absolute;
    left:0;
    right: 0;
    top:0;
    bottom:0;
    transform: scale(0);
    animation: 0.8s bg 0.7s forwards ;
  }
  &__img {
    width: 100%;
    height: 100%;
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin: auto;
    opacity:0;
    transform: translateY(-40px);
    animation: 1s img  1.2s forwards ;
  }
  @media screen and (max-width:$breakpoint) { 
    width: 40vh;
    height: 40vh;
    top: 12%;

    &__bg {
      width: 40vh;
      height: 40vh;
    }
  }

  @keyframes bg {
    0% { 
      transform: scale(0);
     }
    100% {
      transform: scale(1);
    }
  }
  @keyframes img {
    0% { 
      opacity:0;
      transform: translateY(-20px);
     }
    100% {
      opacity:1;
      transform: translateY(0);
    }
  }
}

</style>
