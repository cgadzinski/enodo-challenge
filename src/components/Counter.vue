<template>
  <div>
    <h2>Counter</h2>
    <p>Build a component containing a label or read-only input and a button. The initial value of the label/input should be `0` and every button click should increase that value by `1`</p>
    <el-form :inline="true" ref="counter-form" :model="counter">
      <el-form-item label="Times Clicked">
        {{counter.number}}
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="increment">Increment</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'counter',
  data() {
    return {
      counter: {
        number: 0,
      },
    };
  },
  methods: {
    increment() {
      this.counter.number += 1;
    }
  }
}
</script>

<style>

</style>