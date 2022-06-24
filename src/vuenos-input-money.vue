<template>
  <div class="input-money-style"
       :class="{'input-error': error}"
       :style="{border: focusIn && !error ? '1px solid #409eff !important' : '1px solid #dcdfe6', background: propsDisabled ? '#f5f7fa' : 'white'}">
    <input v-model="input"
           type="text"
           :class="{'input-disable': propsDisabled}"
           @keypress="keypressCommon($event, PATTERN.CHECK_MONEY)"
           @paste="pasteCommon($event, PATTERN.CHECK_MONEY)"
           @focusin="focusIn = true"
           @focusout="focusIn = false"
           @blur="blur"
           :placeholder="placeholder || ''"
           :disabled="propsDisabled"
           :maxlength="maxLength || null">
    <span id="suffix" v-if="suffix"> {{ suffix }} </span>
  </div>
  <div v-if="showConvertedText" class="currency-style">
    {{ convertToText(amountFormatted) }}
  </div>
</template>
<script lang="ts">
import {computed, defineComponent, ref, watch} from 'vue'
import {keypressCommon, pasteCommon, convertToText} from "./core/utils/common";
import {PATTERN} from "./core/utils/systemConstant";

export default /*#__PURE__*/defineComponent({
  props: ['placeholder', 'suffix', 'maxLength', 'showText', 'disabled', 'error'],
  emits: ['getValue', 'blur'],
  setup(props: any, {emit}: any) {
    const input = ref<any>('')
    const focusIn = ref(false)

    const propsDisabled = computed(() => {
      if (props.disabled) {
        if (typeof props.disabled !== 'boolean') {
          return false
        } else {
          return props.disabled
        }
      } else {
        return false
      }
    })

    const showConvertedText = computed(() => {
      if (props.showText) {
        if (typeof props.showText !== 'boolean') {
          return false
        } else {
          return props.showText
        }
      } else {
        return false
      }
    })

    const amountFormatted = computed(() => {
      return Number(input.value.replaceAll('.', ''))
    })

    const setInput = (val: any) => {
      input.value = Math.floor(Number(val)) //
    }

    const blur = () => {
      emit('blur', true)
    }

    watch(input,
        (val) => {
          if (val && val.length) {
            val.replaceAll('.', '');
          }
          let num = String(val).replaceAll('.', "").replace(/^0+/, '').replace(/-/gi, ''); // value to string and remove all comma
          let num2 = num.split(/(?=(?:\d{3})+$)/).join("."); // cứ 3 số thì thêm 1 dấu .
          input.value = num2;

          emit('getValue', amountFormatted.value)
        })

    return {
      input,
      amountFormatted,
      showConvertedText,
      propsDisabled,
      focusIn,
      PATTERN,
      setInput,
      blur,
      keypressCommon,
      pasteCommon,
      convertToText,
    }
  }
})
</script>
<style scoped lang="scss">
.currency-style {
  font-size: 12px;
  line-height: 18px;
  margin-top: 5px;

  text-transform: capitalize;
  font-style: italic
}

.input-money-style {
  display: grid;
  grid-template-columns: auto max-content;

  background-color: white;
  background-image: none;

  border-radius: 4px;
  border: 1px solid #dcdfe6;

  font-size: 14px;
  height: 40px;
  line-height: 40px;
  outline: 0;
  width: 100%;
  transition: all 0.15s linear;

  input {
    height: 100%;
    padding: 0 15px;
    background: none;
    border: none;
    outline: none;
    color: #606266;
    cursor: auto;
  }

  span {
    padding-right: 5px;
  }
}

.input-disable {
  cursor: not-allowed !important;
  color: #c0c4cc !important;

  &::placeholder {
    color: #c0c4cc;
  }
}

.input-error {
  border-color: #f56c6c !important;
}
</style>