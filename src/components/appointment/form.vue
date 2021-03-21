<template>
<v-container>
  <v-row justify="center" dense>
    <v-col cols="12">
      <v-card outlined>
        <v-card-title> {{ $t("appointment_add") }} </v-card-title>
        <v-card-text>
          <v-form class="mx-auto col-11" ref="form">
            <v-row>
              <v-col cols="6">
                <date-picker
                  v-model="appointment.data.time"
                  :label="$t('date')"
                />
              </v-col>
              <v-col cols="6">
                <time-picker
                  v-model="appointment.data.time"
                  :label="$t('time')"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-autocomplete
                  v-model="appointment.data.customer"
                  outlined
                  rounded
                  dense
                  :items="['منصور الطناني','سمير نصر','صلاح سالم','أحمد العامري']"
                  :label="$t('customer')"
                  prepend-inner-icon="mdi-calendar"
                ></v-autocomplete>
              </v-col>
              <v-col cols="6">
                <v-autocomplete
                  v-model="appointment.data.customer"
                  outlined
                  rounded
                  dense
                  :items="['حامد فروانة','مصطفى صلاح','أحمد صبيح']"
                  item-text="name"
                  item-value="id"
                  :label="$t('interviewer')"
                  prepend-inner-icon="mdi-user"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-autocomplete
                  v-model="appointment.data.customer"
                  outlined
                  rounded
                  dense
                  :items="['بيت الكهرباء','مستشفى القدس']"
                  item-text="name"
                  item-value="id"
                  :label="$t('interview_project')"
                  prepend-inner-icon="mdi-calendar"
                ></v-autocomplete>
              </v-col>
              <v-col cols="6">
                <v-text-field :label="$t('interview_period')" v-model="appointment.data.interview_period" rounded outlined dense prepend-inner-icon="fas fa-clock"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-textarea
                  v-model="appointment.data.interview_goals"
                  outlined
                  rounded
                  dense
                  :label="$t('interview_goals')"
                  prepend-inner-icon="fas fa-info-circle"
                  type="text"
                  auto-grow
                ></v-textarea>
              </v-col>
              <v-col cols="6">
                <v-textarea
                  v-model="appointment.data.after_interview_notes"
                  outlined
                  rounded
                  dense
                  :label="$t('after_interview_notes')"
                  prepend-inner-icon="fas fa-info-circle"
                  type="text"
                  auto-grow
                ></v-textarea>
              </v-col>
            </v-row>
            
            <v-row>
              <v-col cols="12">
                <v-btn
                  block
                  dark color="primary"
                  @click="add_appointment(appointment.data)"
                >
                  {{ $t("register") }}
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name:'appointment.form',
  data() {
    return {
      menu1: false,
      menu2: false,
      date1: null,
      date2: null,
      contract_types: ["type1", "type2", "type3"],
      appointment: {
        data: {
        },
        labels: {
          project_name: this.$t("project_name"),
          customer_full_name: this.$t("customer_full_name"),
          address: this.$t("address"),
          statement: this.$t("statement"),
          price_in_letters: this.$t("price_in_letters"),
          price_in_numbers: this.$t("price_in_numbers"),
          project_area: this.$t("project_area"),
          project_estimated_time: this.$t("project_estimated_time"),
          issue_date: this.$t("issue_date"),
          mobile: this.$t("customer_mobile"),
          contract_customer: this.$t("contract_customer"),
          project_range: this.$t("project_range"),
          extra_details: this.$t("extra_details"),
          payments: this.$t("payments"),
          date_hijri: this.$t("date_hijri"),
          date_grigorean: this.$t("date_grigorean"),
          contract_subject: this.$t("contract_subject"),
        },
      },
      rules: {
        required: (value) => !!value || this.$t("required"),
        counter: (value) => value.length <= 20 || this.$t("min_8_characters"),
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || this.$t("invalid_email");
        },
      },
    };
  },
  mounted() {
    if (this.$route.params.appointment) {
      this.appointment.data = this.$route.params.appointment;
    }
    [1, 2, 3, 4, 5].map((i) => {
      this.appointment.data.Payments.push({
        key: Math.random() * 100 * i,
        amount: (Math.random() * 100).toFixed(2),
      });
      this.$store.dispatch("project/index");
      this.$store.dispatch("customer/index");
    });
  },
  methods: {
    ...mapActions("appointment",{
      add_appointment:"store"
    }),
    save_grigorean(date) {
      this.$refs.menu1.save(date);
    },
    save_hijri(date) {
      this.$refs.menu2.save(date);
    },
    add_payment() {
      this.appointment.data.Payments.push({
        key: Math.random() * 100,
        amount: "",
      });
    },
    change_amount(e, payment) {
      payment.amount = parseFloat(e.target.innerText);
    },
    
  },
  computed:{
    ...mapState({
      customers:(state)=>state.customer.all,
      projects:(state)=>state.project.all
    })
  }
};
</script>