<template>
<v-container>
  <v-row justify="center" dense>
    <v-col cols="12">
      <v-card outlined>
        <v-card-title> الدفعات المالية </v-card-title>
        <v-card-text>
          <v-form class="mx-auto col-11" ref="form">
            <v-row>
              <v-col cols="6">
                <v-autocomplete
                  v-model="ContractID"
                  outlined
                  rounded
                  dense
                  :items="contracts"
                  item-text="ProjectName"
                  item-value="PK"
                  label="العقد"
                ></v-autocomplete>
              </v-col>
              <v-col cols="6">
                <v-autocomplete
                  v-model="task.Project"
                  outlined
                  rounded
                  dense
                  :items="projects"
                  item-text="ProjectName"
                  item-value="ProjectID"
                  label="المشروع"
                  prepend-inner-icon="mdi-user"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="task.TaskName"
                  label="اسم المهمة"
                  rounded
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
              </v-col>
            </v-row>
          <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="task.NumberOfMeters"
                  outlined
                  rounded
                  dense
                  label="عدد الأمتار"
                  prepend-inner-icon="mdi-calendar"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="task.NumberOfWindows"
                  outlined
                  rounded
                  dense
                  label="عدد الواجهات"
                  prepend-inner-icon="mdi-calendar"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-textarea
                  v-model="task.Details"
                  outlined
                  rounded
                  dense
                  label="تفاصيل"
                  prepend-inner-icon="fas fa-info-circle"
                  type="text"
                  auto-grow
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-switch
                  v-model="task.CompletedByEmployee"
                  label="تم إنجازها من قبل الموظف"
                >
                </v-switch>
              </v-col>
              <v-col cols="6">
                <v-switch
                  v-model="task.ConfirmedBySuperVisor"
                  label="تمت الموافقة بواسطة المشرف"
                >
                </v-switch>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-switch
                  v-model="task.ConfirmedByCustomer"
                  label="تمت الموافقة بواسطة العميل"
                >
                </v-switch>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn block dark color="primary" @click="store(task)">
                  إضافة مهمة
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
   name:'payment.form',
  data() {
    return {
      customers: [
        {
          id: 1,
          name: "ahmed",
        },
        {
          id: 2,
          name: "mohammed",
        },
        {
          id: 3,
          name: "sami",
        },
      ],
      
      menu1: false,
      menu2: false,
      date1: null,
      date2: null,
      contract_types: ["type1", "type2", "type3"],
      task:{},
      quotation: {
        data: {
          Project_name: "",
          Customer_full_name: "",
          CustomerAddress: "",
          Statement: "",
          Price_in_letters: "",
          Price_in_numbers: "",
          Total_area: "",
          Total_time_period: "",
          PriceOffer_Issue_date: "",
          Customer_phone_number: "",
          Contract_customer: "",
          Contract_subject: "",
          Project_range: "",
          Extra_details: "",
          PriceOffer_Issue_date_hijri: "",
          PriceOffer_Issue_date_grigorean: "",
          Payments: [],
          Contract_type: "",
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
    this.$store.dispatch("employee/index");
    this.$store.dispatch("project/index");
  },
  methods: {
    ...mapActions("task", ["store"]),
    save_grigorean(date) {
      this.$refs.menu1.save(date);
    },
    save_hijri(date) {
      this.$refs.menu2.save(date);
    },
    add_payment() {
      this.task.Payments.push({
        key: Math.random() * 100,
        amount: "",
      });
    },
    change_amount(e, payment) {
      payment.amount = parseFloat(e.target.innerText);
    },
    delete_payment(payment) {
      this.task.Payments = this.task.Payments.filter(
        (i) => i.key != payment.key
      );
    },
  },
  computed: {
    ...mapState({
      employees: (state) => state.employee.all,
      projects: (state) => state.project.all,
    }),
  },
};
</script>