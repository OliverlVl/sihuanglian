<template>
  <el-button :type="type" :disabled="disabled" @click="clockClick">
    {{btnText}}
  </el-button>
</template>

<script>
  // import {parseTime} from '@/utils';

  export default {
    name: 'ClockClickButton',
    props: {
      second: {
        type: Number,
        default: 60
      },
      text: {},
      afterText: {},
      type: {
        type: String,
        default: 'plain'
      },
      onClick: {
        type: Function,
        default: function () {
          return true;
        }
      }
    },
    data () {
      return {
        seconds: 60,
        disabled: false,
        clock: undefined
      }
    },
    destroyed () {
      window.clearInterval(this.clock);
    },
    computed: {
      btnText () {
        if (!this.disabled) return this.text;
        return this.afterText + '(' + this.seconds + ')'
      }
    },
    created () {
      this.seconds = this.second;
    },
    methods: {
      async clockClick () {
        let flag = await this.onClick();
        console.log('flag', flag);
        if (flag) {
          this.disabled = true;
          this.start();
        }
      },
      clear () {
        if (this.clock) { window.clearInterval(this.clock); }
        this.disabled = false;
        this.seconds = this.second;
      },
      start () {
        if (this.clock) { window.clearInterval(this.clock); }
        this.clock = window.setInterval(() => {
          if (this.seconds - 1 < 0) {
            this.clear();
          }
          this.seconds--;
        }, 1000)
      }
    }
  }
</script>

<style scoped>
  .clock {
    padding: 0 5px;
  }
</style>
