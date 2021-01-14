<template>
  <div class="booking-container">
    Flight Booking
      <el-form :model="booking" label-position="top">
        <el-form-item label="Trip Type">
          <el-radio-group v-model="booking.tripType">
            <el-radio-button label="One-Way Flight"></el-radio-button>
            <el-radio-button label="Round-Trip Flight"></el-radio-button>
          </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-date-picker type="date" :picker-options="departurePickerOptions" @change="adjustReturn" format="MM/dd/yyyy" placeholder="Departure Date" v-model="booking.departure" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item v-if="booking.tripType === 'Round-Trip Flight'">
        <el-date-picker placeholder="Return Date" :picker-options="returnPickerOptions" format="MM/dd/yyyy" v-model="booking.return" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="validForm" @click="bookTrip" type="primary">Book Trip!</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const today = new Date();

export default {
  name: 'flight-booking-enhanced',
  computed: {
    validForm: {
      get() {
        if(this.booking.tripType === 'One-Way Flight') {
          return !this.booking.departure;
        } else {
          return !this.booking.departure || !this.booking.return;
        }
      }
    }
  },
  data() {
    return {
      booking: {
        departure: today,
        return: today,
        tripType: 'One-Way Flight'
      },
      departurePickerOptions: {
        disabledDate: (date) => {
          return date.getTime() < Date.now() - 8.64e7; // subtract miliseconds in a day to allow today to be selected 
        }
      },
      returnPickerOptions: {
        disabledDate: (date) => {
          const dpDate = new Date(this.booking.departure).getTime();
          return date.getTime() < dpDate; 
        }
      },
    };
  },
  methods: {
    adjustReturn() {
      console.log(this.booking.departure.getTime(), this.booking.return.getTime());
      (this.booking.return.getTime() < this.booking.departure.getTime()) ? this.booking.return = this.booking.departure : null;
    },
    bookTrip() {
      (this.booking.tripType === 'One-Way Flight') ? alert(`You have booked a one way flight on ${this.booking.departure}`) : alert(`You have booked a round trip flight leaving on ${this.departureDate} and returning on ${this.booking.return}`)
    },
  },
}
</script>

<style scoped>
  .booking-container {
    margin: 20px 25%;
  }
</style>