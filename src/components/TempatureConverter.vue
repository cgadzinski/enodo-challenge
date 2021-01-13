<template>
  <div>
    <h2>Tempature Converter</h2>
    <el-alert type="info">
      Celsius to Fahrenheit (And back again) <strong>C = (F - 32) * (5/9)</strong> // <strong>F = C * (9/5) + 32</strong>
    </el-alert>
    <p>
      The formula for converting a temperature from celsius to fahrenheit is <strong>C = (F - 32) * (5/9)</strong> and the reverse is <strong>F = C * (9/5) + 32.</strong>
    </p>
  </div>
</template>

<script>
export default {
  name: 'tempature-converter'
}
</script>

<style>

</style>