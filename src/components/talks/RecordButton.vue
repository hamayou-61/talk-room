<template>
  <BaseAlert v-if="alert" />
  <button
    class="rec-btn"
    :class="{isRecording :isRecording}"
    @click="toggleRecording()"
  >
    <span class="wave" />
    <span class="rec-btn__bg" />
    <span class="rec-btn__icon">🎤</span>
    {{ isRecording ? "録音中" : "話す" }}
  </button>
</template>

<script setup>
import { ref,computed } from "vue";
import { useStore } from "vuex";
import BaseAlert from '@/components/alerts/BaseAlert.vue'

const emit = defineEmits(["updatetext"]);
const store = useStore();

const isRecording = ref(false);
const recText = ref("");
const alert = computed(() => store.getters.getAlertText);

const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const recognition = new SpeechRecognition();

if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
  store.commit("setErrorText","音声変換機能が利用できません。別のブラウザをお試しください。")
}

recognition.lang = "ja";
recognition.continuous = true;
isRecording.value = false;

recognition.onerror = (e) => {
  if(e.error=="not-allowed"){
    store.commit("setAlertText","ブラウザの設定でマイクのアクセスを許可してください。")
  } else if(e.error=="network") {
    store.commit("setAlertText","ネットワークの問題でマイクのエラーが発生しました。ブラウザの変更するか時間を置いて再アクセスしてください。")
  }
};

recognition.onsoundend = ()=> {
  stop();
};

recognition.onresult = (event) => {
  recText.value = event.results[0][0].transcript;
  emit("updatetext", recText.value);
  stop();
};

const start = () => {
  recognition.start();
  isRecording.value = true;
};

const stop = () => {
  recognition.stop();
  isRecording.value = false;
};

const toggleRecording = () => {
  if (isRecording.value) {
    stop();
  } else {
    start();
  }
};
</script>

<style scoped lang="scss">
.rec-btn {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 10%;
  margin: auto;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  font-size: $font-size-l;
  font-weight: $font-bold;
  z-index: 2;
  background: $color-theme;
  color: $color-white;
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

  &__bg {
    position:absolute;
    background: rgba(59, 57, 66, 0.2);
    border-radius: 50%;
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

  &__icon{
    display:block;
    margin-top:-10px;
  }

  @media screen and (max-width:$breakpoint) { 
    width: 100px;
    height: 100px;
    bottom: 8%;
    transform: translateX(-5%);
    font-size: $font-size-m;
  }

  &.isRecording {
    .wave {
      display: block;
    }
  }
  &::before {
    content: "";
    border-radius: 50%;
    position: absolute;
    top: -6px;
    bottom: -6px;
    left: -6px;
    right: -6px;
    border: solid 2px $color-theme;
    z-index: -1;
    transition: .3s;
  }
  &:hover{
    transform: scale(1.1);
    transition: all 0.2s;
  }
  &:hover .rec-btn__bg{
    animation: scale1  .8s  1;
  }

}
@keyframes scale1 {
  0% { 
    opacity: 1;
    transform: scale(1, 1);
  }

  100% { 
    opacity: 0;
    transform: scale(1.5, 1.5);
  }
}

.wave {
  display:none;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
  opacity: 1;
  &::before,
  &::after  {
    content:'';
    border: 1px $color-white solid;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    position: absolute;
    left:0px;
  }
  &::before {
    transform: scale(1,1);
    opacity: 1;
    animation: waveBefore 0.8s infinite linear;
  }
  &::after {
    transform: scale(0,0);
    opacity: 0;
    animation: waveAfter 0.8s infinite linear;
  }
}
@keyframes waveAfter {
  from {
    transform: scale(0.6,0.6);
    opacity: 0;
  }
  to {
    transform: scale(1,1);
    opacity: 1;
  }
}
@keyframes waveBefore {
  from {
    -webkit-transform: scale(1,1);
    opacity: 1;
  }
  to {
    -webkit-transform: scale(1.5,1.5);
    opacity: 0;
  }
}
</style>
