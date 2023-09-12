<template>
  <input
    v-model="value"
    type="input"
    class="input"
    :class="error ? 'is-error' : ''"
    v-bind="$attrs"
  >
  <p
    v-if="error"
    class="error-txt"
  >
    {{ error }}
  </p>
</template>

<script setup>
import { computed } from "vue";

const emit = defineEmits(['update'])

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: null
  }
});

const value = computed({
  get() {
    return props.text
  },
  set(value) {
    emit('update', value)
  }
})
</script>

<style scoped lang="scss">
.input {
  width: 100%;
  font-weight:$font-medium;
  font-size:$font-size-m;
  &.is-error {
    box-shadow: 0 0 0 1px $color-red;
  }
}
.error-txt {
  color:$color-red;
  font-size:1.2rem;
  margin-top:12px;
}
</style>