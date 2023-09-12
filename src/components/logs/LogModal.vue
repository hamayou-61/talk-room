<template>
  <teleport to="body">
    <div
      class="circle-bg"
      :class="{isShow: isVisible}"
    />
    <div
      :class="{isShow: isVisible}"
      class="modal__overlay"
      @click="close"
    />

    <div
      class="modal-wrap"
      :class="{isShow: isVisible}"
    >
      <ul
        class="log-modal"
      >
        <li
          v-for="log in logs"
          :key="log.index"
          class="log-modal__item"
          :class="log.role == 'user' ? 'log-modal__item--user' : 'log-modal__item--ai'"
        >
          <p
            class="log-modal__name"
          >
            {{ log.role == "user" ? store.getters.getUserName : roleName }}
          </p>
          <p class="log-modal__comment">
            {{ log.content }}
          </p>
        </li>
      </ul>
    </div>
  </teleport>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const logs = computed(() => store.getters.getLogs);

const emit = defineEmits(["close"]);
defineProps({
  isVisible: Boolean,
});

const close = () => {
  emit("close");
};

const roleName = computed(() => {
  return store.getters.getRole
});
</script>

<style scoped lang="scss">
.circle-bg{
  position: fixed;
  z-index:12;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background:rgba(245, 245, 245,0.8);
  backdrop-filter: blur(2px);
  transform: scale(0);
  right: 32px;
  top: 30px;
  transition: all .4s;
  &.isShow{
    transform: scale(20);

  }
  @media screen and (max-width:$breakpoint) { 
    right: 24px;
    top:initial;
    bottom:calc(8% + 20px);
  }
}

.modal {
  &__overlay {
    display:none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    z-index: 14;
    &.isShow {
      display:block;
    }
  }
  &-wrap {
    opacity:0;
    &.isShow{
      opacity:1;
    }
  }
}
.log-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  margin: auto;
  overflow-y: auto;
  max-height: 100vh;
  padding-top: 32px;
  z-index: 15;
  right:150px;
  @media screen and (max-width:$breakpoint) {
    right:24px;
    left:24px;
  }
  &__item{
    &--user{
      .log-modal__name {
        background:$color-theme;

        background:#e46a00;
      }
    } 
    &--ai {
      .log-modal__name {
        background:$color-theme;
      }
    }
  }

  li {
    border-radius: 20px;
    max-width: 600px;
    width: 100%;
    margin-left: auto;
    margin-bottom: 23px;
    background:rgba(255,255,255,0.4);
    box-shadow: 0 0 35px rgba(0, 0, 0, 0.04);
    border:0.5px solid #f2f2f2;
    &:first-of-type{
      display:none;
    }
    @media screen and (max-width:$breakpoint) {
      margin: 0 auto 24px;
    }
  }
  &__name {
    border-radius: 20px 20px 0 0;
    padding: 10px 24px 10px;
    font-weight: bold;
    color:#fff;
    border-bottom :1px solid #aaa;
  }
  &__comment {
    padding: 16px 24px;
  }
}
</style>
