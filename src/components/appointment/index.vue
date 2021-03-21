<template>
  <v-container>
    <v-row justify="center" dense>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title> 
             <v-row>
          <v-col cols="10">
            
            {{ $t("appointments") }} </v-card-title>
          </v-col>
              <v-col cols="2">
                <v-btn to="/appointment/form" dark color="primary"> إضافة موعد </v-btn>
              </v-col>
            </v-row>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="appointments"
              :items-per-page="5"
            >
              <template v-slot:item.actions="{ item }">
                <v-btn icon link to="/appointment/add">
                  <v-icon> mdi-plus </v-icon>
                </v-btn>
                <v-btn icon @click="edit(item)" title="تعديل">
                  <v-icon> fas fa-edit </v-icon>
                </v-btn>
                <v-btn icon @click="remove(item)" title="حذف">
                  <v-icon> fas fa-trash </v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      menu1: false,
      menu2: false,
      date1: null,
      date2: null,
      appointments: [{}],
      headers: [
        {
          text: this.$t("project_name"),
          value: "Project_name",
        },
        {
          text: this.$t("customer_full_name"),
          value: "Customer_full_name",
        },
        {
          text: this.$t("address"),
          value: "CustomerAddress",
        },
        {
          text: this.$t("statement"),
          value: "Statement",
        },
        {
          text: this.$t("price_in_letters"),
          value: "Price_in_letters",
        },
        {
          text: this.$t("price_in_numbers"),
          value: "Price_in_numbers",
        },
        {
          text: this.$t("project_area"),
          value: "Total_area",
        },
        {
          text: this.$t("project_estimated_time"),
          value: "Total_time_period",
        },
        {
          text: this.$t("issue_date"),
          value: "PriceOffer_Issue_date",
        },
        {
          text: this.$t("customer_mobile"),
          value: "Customer_phone_number",
        },
        {
          text: this.$t("create_contract_from_appointment"),
          value: "actions",
        },
      ],
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
    save_grigorean(date) {
      this.$refs.menu1.save(date);
    },
    save_hijri(date) {
      this.$refs.menu2.save(date);
    },
    edit(item) {
      let name = "appointment";
      this.$router.push({
        name: `${name}.form`,
        params: {
          [name]: item,
        },
      });
    },
    remove(item) {
      this.$swal({
        title: "هل أنت متأكد ؟",
        showCancelButton: true,
        confirmButtonText: `تأكيد`,
        cancelButtonText: `إلغاء`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("price_offer/delete", item);
        }
      });
    },
  },
};
</script>