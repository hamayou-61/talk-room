<template>
  <Transition>
    <div
      class="entrance"
      :class="isOut ? 'is-out' : ''"
    >
      <div class="entrance-box">
        <h1
          ref="titleRef"
          class="title"
        >
          <span>は</span><span>な</span><span>し</span><span>べ</span><span>や</span>
        </h1>
        <p
          ref="subtitleRef"
          class="subtitle"
        >
          <span>T</span><span>A</span><span>L</span><span>K</span><span>R</span><span>O</span><span>O</span><span>M</span>
        </p>

        <div class="txt-wrap">
          <p class="txt">
            ロールが設定されたキャラと音声だけを用いて、<br class="only-pc">会話を楽しむことができます。<br>
            このサービスを利用するためには<br class="only-pc">OpenAIのAPIキーが必要となります。<br>
            ブラウザを閉じると、すべての会話内容はリセットされます。
          </p>
        </div>
        <div class="btn-wrap">
          <BaseButton
            class="btn"
            @click="ok()"
          >
            OK
          </BaseButton>
        </div>
      </div>  
      <ul class="role">
        <li class="role__1">
          <RoleImage01 />
        </li>
        <li class="role__2">
          <RoleImage02 />
        </li>
        <li class="role__3">
          <RoleImage03 />
        </li>
      </ul>
    </div>
  </Transition>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref,onMounted } from "vue";
import BaseButton from '@/components/ui/BaseButton.vue'
import RoleImage01 from "@/components/roles/RoleImage01.vue";
import RoleImage02 from "@/components/roles/RoleImage02.vue";
import RoleImage03 from "@/components/roles/RoleImage03.vue";

const titleRef = ref(null)
const subtitleRef = ref(null)
const isOut = ref(null)
const router = useRouter()

onMounted(() => {
  const DELAY = 80; 
  const titleItems = titleRef.value.querySelectorAll('span');
  const subTitleItems = subtitleRef.value.querySelectorAll('span');

  titleItems.forEach((titleItem, index) => {
    setTimeout(() => {
      titleItem.classList.add('is-visible');
    }, DELAY * index);
  });

  subTitleItems.forEach((subTitleItem, index) => {
    setTimeout(() => {
      subTitleItem.classList.add('is-visible');
    }, DELAY * index);
  });

});

const ok = () => {
  isOut.value = true;
  const DELAY = 1000; 

  setTimeout(() => {
    router.push({ path: '/regist' })
  }, DELAY);
};

</script>

<style scoped lang="scss">
.entrance {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  left:13%;
  top:0;
  bottom:0;
  position:fixed;
  z-index:1;
  margin-top:-75px;
}

.title,
.subtitle {
  font-family: 'Monomaniac One', Helvetica, Arial, sans-serif;
  overflow: hidden;
  transition: all 1s;
  display: flex;
  
  span {
    display: block;
    transform: translate(0, 105%);
    transition: transform cubic-bezier(0.215, 0.61, 0.355, 1) 0.5s;

    &.is-visible {
      transform: translate(0, 0);
    }
  }
}
.title {
  font-size: 10rem;
  letter-spacing:1rem;
  line-height:1;
  font-weight:bold;
  margin-bottom: 8px;

  span {
    transition: transform cubic-bezier(0.215, 0.61, 0.355, 1) 0.5s;
    &:nth-child(2) {
      transition-delay: 0.06s;
    }
    &:nth-child(3) {
      transition-delay: 0.12s;
    }
    &:nth-child(4) {
      transition-delay: 0.18s;
    }
    &:nth-child(5) {
      transition-delay: 0.24s;
    }
  }
}
.subtitle {
  font-size: 4rem;
  letter-spacing:2rem;
  font-weight:bold;
  margin-bottom: 56px;
  span {
    transition: transform cubic-bezier(0.215, 0.61, 0.355, 1) 0.5s;
    &:nth-child(1) {
      transition-delay: 0.46s;
    }
    &:nth-child(2) {
      transition-delay: 0.52s;
    }
    &:nth-child(3) {
      transition-delay: 0.58s;
    }
    &:nth-child(4) {
      transition-delay: 0.64s;
    }
    &:nth-child(5) {
      transition-delay: 0.7s;
    }
    &:nth-child(6) {
      transition-delay: 0.76s;
    }
    &:nth-child(7) {
      transition-delay: 0.78s;
    }
    &:nth-child(8) {
      transition-delay: 0.84s;
    }
  }
}

.txt,
.btn {
  opacity: 0;
  margin-top: 30px;
}
.txt {
  text-align:left;
  font-size:$font-size-m;
  font-weight: $font-bold;
  letter-spacing:0.1rem;
  line-height: 1.8em;
  animation: 0.3s fadeInUp 1.2s forwards;
}
.btn {
  animation: 0.8s fadeInUp 1.4s forwards;
  &-wrap {
    width: 100%;
    text-align:center;
    justify-content: flex-start;
    display: flex;
  }
}
.role {
  display: flex;
  justify-content: center;
  position:fixed;
  left:77%;
  bottom:0;
  gap:0px 3%;
  transition: all 1s;

  li {
    position:fixed;
    width: 250px;
    opacity:0;
  }
  &__1 {
    margin-left: -300px;
    top:46%;
    animation: 0.4s fadeInDown 0.8s forwards;
  }
  &__2 {
    margin-right: -300px;
    animation: 0.4s fadeInDown 1s forwards;
    z-index:-1;
    top:45%;
  }
  &__3 {
    width: 240px;
    top:52%;
    animation: 0.4s fadeInDown 1.2s forwards;
  }
}

@media screen and (max-width:$breakpoint) { 
  .entrance{
    margin: -40px 40px 0;
    width: calc(100% - 80px);
    left:0;
  }
  .title {
    font-size: 6rem;
  }
  .subtitle{
    font-size: 1.8rem;
  }
  .txt {
    font-size:1.4rem;
  }
  .role{
    left: 0;
    right: 0;
    li{
      width:180px;
      top:auto;
    }
    &__1 {
      margin-left: -200px;
      bottom:-200px;
      transform: rotate(-5deg);
      animation: 0.5s roleFadeIn_1 0.8s forwards;
    }
    &__2 {
      animation: 0.5s roleFadeIn_2 1s forwards;
      margin-right: -200px;
      bottom:-200px;
      transform: rotate(5deg);
    }
    &__3 {
      bottom:-200px;
      animation: 0.5s roleFadeIn_3 1.2s forwards;
    }
    @keyframes roleFadeIn_1 {
      to {
        opacity:1;
        transform: rotate(-5deg) translateY(-80px);
      }
    }
    @keyframes roleFadeIn_2 {
      to {
        opacity:1;
        transform: rotate(5deg) translateY(-80px);
      }
    }
    @keyframes roleFadeIn_3 {
      to {
        opacity:1;
        transform: translateY(-80px);
      }
    }
  }
}
.is-out {
  .title,
  .subtitle,
  .txt-wrap,
  .btn-wrap {
    transform: translateY(-100px);
    opacity:0;
  }
  .role {
    transform: translateY(100px);
    opacity:0;
  }
}
</style>



