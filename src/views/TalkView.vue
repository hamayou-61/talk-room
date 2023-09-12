<template>
  <div>
    <RoleBox />
    <LogButton @click="openModal" />
    <RecordButton @updatetext="updateUserText" />
    <vue-element-loading
      :active="isLoading"
      spinner="bar-fade-scale"
      color="#000"
    />
    <LogModal
      :is-visible="modalVisible"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

import RecordButton from "@/components/talks/RecordButton.vue";
import RoleBox from "@/components/roles/RoleBox.vue";
import LogButton from "@/components/logs/LogButton.vue";
import LogModal from "@/components/logs/LogModal.vue";
import VueElementLoading from "vue-element-loading";

const store = useStore();

const isLoading = ref(false)
const modalVisible = ref(false)

const openModal = () => {
  modalVisible.value = true;
};
const closeModal = () => {
  modalVisible.value = false;
};

const sendMessageToAi = async () => {
  isLoading.value = true;
  try {
    await store.dispatch("sendMessage");
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false;
  }
};

const updateUserText = (data) => {
  store.commit("setLogs",{
    role: "user",
    content: data,
  });
  sendMessageToAi();
};

</script>

