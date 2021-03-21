<template>
<v-container>
  <v-row justify="center" dense>
    <v-col cols="12">
      <v-card outlined>
        <v-card-title> إضافة عميل </v-card-title>
        <v-card-text>
          <v-form class="mx-auto col-11" ref="form">
             <v-row>
              <v-col cols="6">
            <v-text-field
              v-model="customer.data.FullName"
              outlined
              rounded
              dense
              :label="customer.labels.customer_full_name"
              prepend-inner-icon="fas fa-user"
              type="text"
            ></v-text-field>
            </v-col>
            <v-col cols="6">
                  <v-text-field
              v-model="customer.data.CustomerPhoneNumber"
              outlined
              rounded
              dense
              :label="customer.labels.mobile"
              prepend-inner-icon="mdi-calendar"
              type="text"
            ></v-text-field>
            </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">

            <v-text-field
              v-model="customer.data.CustomerUserName"
              outlined
              rounded
              dense
              label="اسم المستخدم"
              type="text"
            ></v-text-field>
                </v-col>
                <v-col cols="6">
          <v-text-field
              v-model="customer.data.CustomerPassword"
              outlined
              rounded
              dense
              label="كلمة المرور"
              type="password"
            ></v-text-field>

                </v-col>
            </v-row>
           
<v-row>
    <v-col cols="12">

            <v-btn block dark color="primary" @click="customer.data.PK?update(customer.data):store(customer.data)">
              {{ customer.data.PK?$t('edit'):$t("register") }}
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
import { mapActions } from "vuex";
export default {
   name:'customer.form',
  data() {
    return {
      menu1: false,
      menu2: false,
      date1: null,
      date2: null,
      customer_types:[
         {
           id:1,
           name:"test"
         }
      ],
      customer: {
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
          mobile:this.$t('customer_mobile')
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
  methods: {
    ...mapActions("customer",["store","update"]),
  },
};
</script>