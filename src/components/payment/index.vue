<template>
  <v-container>
    <v-row justify="center" dense>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title> الدفعات المالية </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="2" v-if="!loaded_contract"></v-col>
              <v-col cols="6" v-if="!loaded_contract">
                <v-autocomplete
                  v-model="ContractID"
                  outlined
                  rounded
                  dense
                  :items="contracts"
                  item-text="ProjectName"
                  item-value="PK"
                  label="العقد"
                  prepend-inner-icon="mdi-user"
                ></v-autocomplete>
              </v-col>
              <v-col cols="1" v-if="!loaded_contract">
                <v-btn
                  dark
                  color="primary"
                  @click="
                    $store.dispatch('payment/get_by_contract', ContractID)
                  "
                >
                  اختيار
                </v-btn>
              </v-col>
              <v-col cols="1">
                <v-btn
                  dark
                  v-if="ContractID != null"
                  color="primary"
                  @click="add_payment_dialog = true"
                >
                  إضافة دفعة
                </v-btn>
              </v-col>
            </v-row>
            <v-data-table :headers="headers" :items="all" :items-per-page="5">
              <template v-slot:item.actions="{ item }">
                <v-btn dark color="primary" @click="submit(item)">
                  تأكيد
                </v-btn>
              </template>
              <template v-slot:item.PaymentIsDone="{item}">
                {{item.PaymentIsDone==true?"نعم":"لا"}}
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="add_payment_dialog" width="600">
      <v-card>
        <v-card-title> إضافة دفعة </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="payment.PaymentAmount"
                label="المبلغ"
                rounded
                outlined
                dense
                type="number"
              />
            </v-col>
            <v-col cols="6">
              <v-textarea
                v-model="payment.PaymentNote"
                label="ملاحظات"
                rounded
                outlined
                dense
                rows="1"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-switch
                v-model="payment.PaymentIsDone"
                label="تم الدفع ؟"
                rounded
                outlined
                dense
              />
            </v-col>
            <v-col cols="6">
              <date-picker
                v-model="payment.PaymentDueDate"
                label="تاريخ الاستحقاق"
                rounded
                outlined
                dense
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-btn dark color="primary" @click="save(payment)"> إضافة </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  props: ["contract"],
  data() {
    return {
      menu1: false,
      menu2: false,
      date1: null,
      date2: null,
      project: null,
      submession: {},
      ContractID: null,
      payment: {},
      add_payment_dialog: false,
      loaded_contract: false,
      // all: [
      //  {
      //     Project_name: "بيت الكهرباء",
      //     Customer_full_name: "أحمد العامري",
      //     CustomerAddress: "الرياض - العليا",
      //     Statement: "مشروع لإدارة محل بيع أدوات كهربائية",
      //     Price_in_letters: "23",
      //     Price_in_numbers: "ثلاث و عشرون",
      //     Total_area: "200",
      //     Total_time_period: "7 شهور",
      //     PriceOffer_Issue_date: "17-7-2020",
      //     Customer_phone_number: "0599232232",
      //   },
      //   {
      //     Project_name: "مستشفى ",
      //     Customer_full_name: "سالم الغفري",
      //     CustomerAddress: "الدمام",
      //     Statement: "مشروع مستشفى في مدينة الدمام",
      //     Price_in_letters: "50",
      //     Price_in_numbers: "خمسون",
      //     Total_area: "2000",
      //     Total_time_period: "سنة",
      //     PriceOffer_Issue_date: "15-9-2020",
      //     Customer_phone_number: "0599223115",
      //   },
      // ],
      headers: [
        {
          text: "المبلغ",
          value: "PaymentAmount",
        },
        {
          text: "تاريخ الاستحقاق",
          value: "PaymentDueDate",
        },
        {
          text: "ملاحظات",
          value: "PaymentNote",
        },
        {
          text: "تم الدفع ؟",
          value: "PaymentIsDone",
        },
        // {
        //     text:this.$t('price_in_numbers'),
        //     value:'Price_in_numbers'
        // },
        // {
        //     text:this.$t('project_area'),
        //     value:'Total_area'
        // },
        // {
        //     text:this.$t('project_estimated_time'),
        //     value:'Total_time_period'
        // },
        // {
        //     text:this.$t('issue_date'),
        //     value:'PriceOffer_Issue_date'
        // },
        // {
        //     text:this.$t('customer_mobile'),
        //     value:'Customer_phone_number'
        // },
        {
          text: "إجراءات",
          value: "actions",
        },
      ],
    };
  },
  methods: {
    create_task(project) {
      this.$router.push({
        name: "task.form",
        params: {
          project,
        },
      });
    },
    create_moodboard(project) {
      this.$router.push({
        name: "moodboard.form",
        params: {
          project,
        },
      });
    },
    submit(item) {
      this.$store.dispatch("payment/confirmPayment", item.PK);
    },
    save(payment) {
      payment.FK = this.ContractID;
      this.$store.dispatch("payment/store", payment);
      this.$store.dispatch("payment/get_by_contract",this.ContractID);
      this.add_payment_dialog = false;
      this.$forceUpdate();
    },
  },
  mounted() {
    if (this.$props.contract) {
      this.ContractID = this.$props.contract.PK;
      this.loaded_contract = true;
    } else this.$store.dispatch("contract/index");
  },
  computed: {
    ...mapState({
      contracts: (state) => state.contract.all,
      all: (state) => state.payment.all,
      success: (state) => state.alert.on,
    }),
  },
  watch: {
    success: function (val) {
      if (val) {
        this.$store.dispatch("payment/get_by_contract", this.ContractID);
      }
    },
  },
};
</script>