<template>
  <div>
    <el-progress type="circle" :show-text="false" :percentage="progress"></el-progress>
    <p>{{et}} / {{totalTime}}</p>
    <div class="slider-container">
      <el-slider :max="600" :show-tooltip="false" :min="0" v-model="totalTime"></el-slider>
    </div>
    <el-button type="info" @click="reset">Rest Timer</el-button>
  </div>
</template>

<script>
export default {
  name: 'timer',
  computed: {
    progress: {
      get() {
        return Math.floor((this.et/this.totalTime) * 100);
      },
    },
  },
  data() {
    return {
      et: 0,
      totalTime: 100,
      counter: null,
    };
  },
  methods: {
    start() {
      this.counter = setInterval(() => {
        if(this.et < this.totalTime) {
          this.et += 1;
        }
      }, 1000);
    },
    clear() {
      clearInterval(this.counter);
    },
    reset() {
      this.et = 0;
    }
  },
  mounted() {
    console.log('start it');
    this.start();
  }
}
</script>

<style scoped>
  .slider-container {
    margin: 20px 25%;
  }
</style>