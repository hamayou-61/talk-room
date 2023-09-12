<template>
  <ul class="intro-role">
    <li
      v-for="(item, index) in items"
      :key="index"
      class="intro-role__item"
      :class="role == item.value ? 'is-active' : ''"
    >
      <label>
        <component
          :is="components[item.componentName]"
          :speaking="hover"
          class="intro-role__img"
        />

        <input
          v-model="value"
          type="radio"
          :value="item.value"
        >
      </label>
      <span class="intro-role__bg" />
    </li>
  </ul>
</template>

<script setup>
import { ref, computed } from "vue";
import RoleImage01 from "@/components/roles/RoleImage01.vue";
import RoleImage02 from "@/components/roles/RoleImage02.vue";
import RoleImage03 from "@/components/roles/RoleImage03.vue";

const emit = defineEmits(['update'])

const components = {
  RoleImage01,
  RoleImage02,
  RoleImage03
}
const hover = ref(false)
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  role: {
    type: String,
    default: null
  },
});

const value = computed({
  get() {
    return props.role
  },
  set(value) {
    emit('update', value)
  }
})
</script>

<style scoped lang="scss">
.intro-role {
  display:flex;
  gap:20px;
  @media screen and (max-width:$breakpoint) { 
    gap:12px;
  }

  &__img {
    width: 60px;
  }

  &__item {
    box-shadow: 0 0 3px 1px rgba(59, 57, 66, 0.05);
    background:rgba(255,255,255,1);
    border-radius: 20px;
    padding: 12px 0;
    flex:1;
    position:relative;
    transition: all 0.3s;
    &.is-active {
      box-shadow: 0 0 0 1px rgba(59, 57, 66,0.5);
    }
    label {
      width: 100%;
      display:flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

    }
    input {
      display:none;
    }
    &:hover {
      transform: scale(1.1);
      transition: all 0.2s;
    }

    &:hover .intro-role__bg{

      animation: scale2  .8s  1;
    }
  }

  &__text {
    font-size:$font-size-s;
    font-weight: $font-bold;
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
    z-index: -1;
    left:0;
    right:0;
    top:0;
    bottom:0;
    transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
  }
}
</style>