<template>
  <div class="booking-container">
    Flight Booking
      <el-form :model="booking" ref="bookingForm" :rules="rules" label-position="top">
        <el-form-item label="Trip Type">
          <el-radio-group v-model="booking.tripType">
            <el-radio-button label="One-Way Flight"></el-radio-button>
            <el-radio-button label="Round-Trip Flight"></el-radio-button>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="Departure Date" prop="departure" required>
        <el-input
          placeholder="MM-DD-YYYY"
          suffix-icon="el-icon-date"
          v-model="booking.departure"
          @change="validateForm('bookingForm')"
        ></el-input>
      </el-form-item>
      <el-form-item label="Return Date" prop="return">
        <el-input
          :disabled="booking.tripType !== 'Round-Trip Flight'"
          placeholder="MM-DD-YYYY"
          suffix-icon="el-icon-date"
          v-model="booking.return"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="!validForm" @click="bookTrip" type="primary">Book Trip!</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// Would probably refactor some of this to store the time stamps and use getters for displaying values rather than converting on the fly if this were a real application
const validateDate = (rule, value, callback) => {
  const dateParts = value.split('-');
  if(dateParts.length !== 3) {
    callback(new Error('Invalid Fromat. Please use MM-DD-YYYY.'));
    return false;
  }
  const testDate = new Date(dateParts[2], (+dateParts[0]-1), dateParts[1]);
  if(testDate.getDate() !== parseInt(dateParts[1])) {
    callback(new Error('Invalid Date provided.'));
  }
  callback();
};

const isDateAfter = (date1, date2) => {
  return date1 > date2;
}

const validateDeparture = (rule, value, callback) => {
  const today = Date.now() - 8.64e7;
  const dateParts = value.split('-');
  const testDate = new Date(dateParts[2], (+dateParts[0]-1), dateParts[1]).getTime();
  if(!isDateAfter(testDate, today)) {
    callback(new Error('Departure Date must be today or after.'))
  }
  callback();
}

const getToday = () => {
  const now = new Date();
  return `${("0" + (1 + now.getMonth())).slice(-2)}-${("0" + now.getDate()).slice(-2)}-${now.getFullYear()}`
}

const today = getToday();

export default {
  name: 'flight-booking',
  data() {
    return {
      validForm: true,
      booking: {
        departure: today,
        return: today,
        tripType: 'One-Way Flight'
      },
      rules: {
        departure: [
          { required: true, message: 'Departure Date is required.', trigger: 'blur' },
          { validator: validateDate, trigger: 'blur' },
          { validator: validateDeparture, trigger: 'blur'}
        ],
        return: [
          { required: true, message: 'Return Date is required.', trigger: 'blur' },
          { validator: validateDate, trigger: 'blur' },
          { validator: (rule, value, callback) => {
            const dateParts = value.split('-');
            const testDate = new Date(dateParts[2], (+dateParts[0]-1), dateParts[1]).getTime();
            const departDateParts = this.booking.departure.split('-');
            const departureDate = new Date(departDateParts[2], (+departDateParts[0]-1), departDateParts[1]).getTime();
            console.log(testDate, departureDate);
            if(testDate !== departureDate && !isDateAfter(testDate, departureDate)) {
              this.validForm = false;
              callback(new Error('Arrival Date cannot be before the Departure Date.'));
              return false;
            }
            this.validForm = true;
            callback();
          }, trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    validateForm(form) {
      this.$refs[form].validate((valid) => {
        (valid) ? this.validForm = true : this.validForm = false;
      })
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