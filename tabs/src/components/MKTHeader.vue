<template>
  <div
    class="MKTHeader"
  >
    <dl class="MKTHeader__container">
      <dt>
        廣告企劃
      </dt>
      <dd>
        <span>→ 以下是</span>
        <span>{{ company }}</span>
        <span>提供的內容</span>
      </dd>
    </dl>
  </div>
</template>
  
<script setup>
defineProps({
  company: {
    type: String,
    required: true
  }
})
  
</script>
  
<style lang="scss">
  $height: 40px;

  .MKTHeader {
    position: relative;
    background-color: #fff;

    &__container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;
      padding: .2em 15px;
      max-width: $container-max-width + 15px * 2;
      min-height: $height;
    }

    dt {
      font-size: 17px;
      font-weight: bold;
      white-space: nowrap;
      color: #000000;
    }

    dd {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      font-size: 14px;
      text-align: right;
      white-space: pre-wrap;

      span {
        padding: 0 3px;
      }
    }
  }
  // xxl | xl | lg | md | sm
  // @include screen (xl) {}
</style>