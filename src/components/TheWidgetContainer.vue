<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane
      v-for="(value, key) in tabs"
      :key="key"
      :label="value"
      :name="key">
      <component :is="componentName(value)" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { kebabCase } from 'lodash'
import Counter from './Counter'
import Crud from './Crud'
import FlightBooking from './FlightBooking'
import TempatureConverter from './TempatureConverter'
import Timer from './Timer'


export default {
  name: 'the-widget-container',
  components: {
    Counter,
    Crud,
    FlightBooking,
    TempatureConverter,
    Timer,
  },

  data() {
    return {
      activeTab: 'counter',
      tabs: {
        counter: 'Counter',
        crud: 'CRUD',
        flight: 'Flight Booking',
        tempatureConverter: 'Tempature Converter',
        timer: 'Timer'
      },
    }
  },

  methods: {
    componentName(value) {
      return kebabCase(value)
    }
  }
}
</script>

<style>

</style>