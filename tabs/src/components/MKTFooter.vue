<template>
  <div class="MKTFooter">
    <div class="MKTFooter__container">
      <p>
        上述內容由 {{ company }} 提供，104整合招募服務處代為維護管理<br>
        以上所提及之各公司與產品均分屬各相關公司與個別擁有者之商標<br>
      </p>
      <p>
        意見反應：02-29126104#{{ extNumber }}
        <a
          v-if="contactEmail"
          class="contact"
          :href="`mailto:${contactEmail}`"
        >
          <svg
            viewBox="0 0 20 14"
            width="18"
            height="12"
            preserveAspectRatio="none"
            stroke="currentColor"
            stroke-width="1"
            transform="translate(0 -2)"
          >
            <rect
              x="1"
              y="1"
              width="18"
              height="12"
              rx="2.5"
              fill="#fff"
            ></rect>
            <polyline
              points="1,11 10,5 19,11"
              fill="#fff"
            ></polyline>
            <polyline
              points="1,4 10,10 19,4"
              fill="#fff"
            ></polyline>
          </svg>
        </a>
      </p>
      <p>
        本網站內容享有著作權，禁止侵害，違者必究。© 2001-{{ new Date().getFullYear() }} 104 Corporation All Rights Reserved
      </p>
    </div>
  </div>
</template>
  
<script setup>
defineProps({
  company: {
    type: String,
    required: true
  },
  extNumber: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    default: ''
  } 
})
</script>
  
<style lang="scss">
  .MKTFooter {
    margin-top: auto;
    padding: 12px;
    font-size: 12px;
    text-align: center;
    background-color: #fff;

    &__container {
      margin: 0 auto;
      max-width: $container-max-width + 15px * 2;
    }

    .contact {
      display: inline-block;
      vertical-align: middle;
    }
  }
  // xxl | xl | lg | md | sm
  // @include screen (xl) {}
</style>