<template>
  <p
    class="log-btn"
    @click="$emit('click')"
  >
    <FaIcon
      icon="fa-regular fa-comments"
      class="log-icon"
    />
    会話ログ
    <span class="log-btn__bg" />
  </p>
</template>

<script setup>
defineEmits(["click"]);
defineProps({
  isVisible: Boolean,
});
</script>

<style scoped lang="scss">
.log-btn {
  position: fixed;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 0 1px rgba(59, 57, 66,0.5);
  font-size: 1.5rem;
  flex-direction: column;
  padding: 16px;
  border-radius: 20px;
  right: 32px;
  top: 20px;
  font-weight: $font-bold;
  cursor: pointer;
  z-index: 11;
  transition: all 0.2s;
  transform: scale(0);
  opacity:0;
  animation: 0.8s scaleIn 0.7s forwards ;
  @keyframes scaleIn {
    0% { 
      transform: scale(0);
     }
    100% {
      transform: scale(1);
      opacity:1;
    }
  }

  svg {
    margin-bottom:5px;
  }
  @media screen and (max-width:$breakpoint) { 
    svg {
      margin-bottom:4px;
    }
    padding: 12px;
    font-size: $font-size-s;
    border-radius: 16px;
    right: 24px;
    top:initial;
    bottom:calc(8% + 20px);
    z-index: 2;
  }
  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
    transition: all 0.2s;
  }
  &:hover .log-btn__bg{
    animation: scale1 .8s  1;
  }

  &__bg {
    position:absolute;
    background: rgba(59, 57, 66, 0.2);
    border-radius: 20px;
    height: 100%;
    opacity: 0;
    transform: scale(1, 1);
    width: 100%;
    max-width: 100%;
    z-index: -2;
    left:0;
    right:0;
    top:0;
    bottom:0;
    transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
  }
}
.log-icon {
  font-size: $font-size-xl;
  color: #333;
  margin-right: 8px;
  @media screen and (max-width:$breakpoint) { 
    font-size: $font-size-l;
    margin-right: 6px;
  }
}
@keyframes scale1 {
  0% { 
    opacity: 1;
    transform: scale(1, 1);
  }

  100% { 
    opacity: 0;
    transform: scale(1.35, 1.35);
  }
}

</style>
