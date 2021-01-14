<template>
  <div>
    <h2>Tempature Converter</h2>
    <p>
      Enter a temperature into either of the boxes below to see the conversion.
    </p>
    <el-form :inline="true" :model="temps" :rules="rules">
      <el-form-item label="Degrees Celsius" prop="celsius">
        <el-input v-model="temps.celsius" @change="convertToFahrenheit" placeholder="Celsius"></el-input>
      </el-form-item>
      <el-form-item label="Degrees Fahrenheit" prop="fahrenheit">
        <el-input v-model="temps.fahrenheit" @change="convertToCelsius" placeholder="Fahrenheit"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const regex = RegExp('^-?\\d*\\.?\\d+$');
const validateTemp = (rule, value, callback) => {
  if(!regex.test(value)) {
    callback(new Error('Please enter a valid temperature'));
    return false;
  } else {
    callback();
  }
};
export default {
  name: 'tempature-converter',
  data() {
    return {
      temps: {
        celsius: null,
        fahrenheit: null,
      },
      rules: {
        celsius: [
          { validator: validateTemp, trigger: 'change' }
        ],
        fahrenheit: [
          { validator: validateTemp, trigger: 'change' }
        ]
      },
    };
  },
  methods: {
    convertToCelsius() {
      (this.temps.fahrenheit && regex.test(this.temps.fahrenheit)) ? this.temps.celsius = (this.temps.fahrenheit - 32) * (5/9) : null;
    },
    convertToFahrenheit() {
      (this.temps.celsius && regex.test(this.temps.celsius)) ? this.temps.fahrenheit = (this.temps.celsius * (9/5)) + 32 : null;
    },
  }
}
</script>

<style>

</style>