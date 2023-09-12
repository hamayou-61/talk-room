<template>
  <div class="intro-wrap">
    <div class="intro">
      <dl class="intro-box">
        <dt>OpenAIのAPI</dt>
        <dd>
          <InputText
            placeholder="APIキーを入力してください。"
            :error="apiKeyError"
            :text="apiKey"
            @update="apiKey = $event"
          />
          <p class="intro__note">
            APIキーは<a
              href="https://platform.openai.com/account/api-keys"
              target="_blank"
            >OpenAIのサイト</a>から取得してください。
          </p>
        </dd>
      </dl>
      <dl class="intro-box">
        <dt>キャラクター</dt>
        <dd>
          <SelectRole
            :error="apiKeyError"
            :items="roleItems"
            :role="role"
            @update="role = $event"
          />
        </dd>
      </dl>
      <dl class="intro-box">
        <dt>あなたの名前</dt>
        <dd>
          <InputText
            placeholder="なまえ"
            :error="nameError"
            :text="name"
            @update="name = $event"
          />
        </dd>
      </dl>
      <div class="btn-wrap">
        <BaseButton
          :loading="isLoading"
          @on-click="registerUser()"
        >
          OK
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router'
import promt from "@/data/prompt";
import InputText from '@/components/forms/InputText.vue'
import SelectRole from '@/components/forms/SelectRole.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const store = useStore();
const router = useRouter()
const apiKey = ref('')
const name = ref("やまだ");
const role = ref("30代男性");
const isLoading = ref(false);
const apiKeyError = ref(null)
const nameError = ref(null)

const roleItems = [
  { text: "30代男性", value: "30代男性", componentName:'RoleImage01', i:0 },
  { text: "30代女性", value: "30代女性", componentName:'RoleImage02', i:1  },
  { text: "3歳女児", value: "3歳女児", componentName:'RoleImage03', i:2  },
];

const validate = ()=>{
  apiKeyError.value = null
  nameError.value = null

  if(!apiKey.value) {
    apiKeyError.value = 'APIキーを入力してください。'
  }
  if(!name.value) {
    nameError.value = '名前を入力してください。'
  }

  if(apiKeyError.value || nameError.value) {
    isLoading.value = false
    return false
  }
  return true
}

const setInitMessage = () => {
  const initialPrompt = promt.find(p => p.role === role.value)?.value || promt[0].value;
  store.commit("clearLogs")
  store.commit("setLogs", {
    role: "user",
    content: initialPrompt
  });
};

const sendMessageToAI = async () => {
  try {
    await store.dispatch("sendMessage");
    store.commit("setAuthentication", true)
    router.push({ path: '/talk' })
  } catch (error) {
    if(error.response && error.response.status == '401') {
      apiKeyError.value = "APIキーが正しくありません。"
    }
  } finally {
    isLoading.value = false;
  }
};

const registerUser = async () => {
  isLoading.value = true;

  if(!validate()){
    return false
  }

  await store.dispatch('register', { 
    apiKey: apiKey.value, 
    name: name.value, 
    role: role.value,
  });
  await setInitMessage();
  sendMessageToAI();
};

</script>

<style scoped lang="scss">
.intro {
  width: 90%;
  max-width:600px;
  margin: 0 auto;
  border-radius: 20px;
  padding: 46px 56px;
  position: relative;
  z-index: 1;
  box-shadow: 0 0 50px 1px rgba(0, 0, 0, 0.02);
  background:rgba(255,255,255,0.9);
  backdrop-filter: blur(1px);
  &-wrap {
    position:relative;
    transition: all 0.2s;
    opacity:0;
    z-index:1;
    animation: 0.8s fadeInUp 0.5s forwards ;
  }
  @media screen and (max-width:$breakpoint) { 
    padding: 32px 24px;

    &-wrap{
      display:flex;
      min-height: 100vh;
      padding: 60px 0;
      align-items: center;
      justify-content: center;
      z-index: 1;
      overflow-y: auto;
    }
  }
  &-box{
    margin: auto auto 32px;
    dt {
      text-align: left;
      font-weight: 600;
      margin-bottom: 14px;
    }
    dd {
      margin-left: 0;
      flex: 1;
      text-align: left;
    }
  }
  &__note {
    opacity:0.8;
    margin-top: 12px;
    font-size: $font-size-s;
  }
}
.btn-wrap {
  display:flex;
  justify-content: center;
}
.v-enter-from {
  opacity: 0;
  transform:translateY(40px);
}
.v-leave-to {
  opacity: 0;
  transform:translateY(-40px);
}
.v-enter-to, .v-leave-from {
  opacity: 1;
  transform:translateY(0);
}
.v-enter-active, .v-leave-active {
  transition: all 0.8s;
}
</style>



