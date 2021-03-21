<template>
  <v-container>
    <v-row justify="center" dense>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>
            {{ contract.data.PK ? "تعديل عقد" : $t("create_contract") }}
          </v-card-title>
          <v-card-text>
            <v-form class="mx-auto col-11" ref="form">
              <v-row>
                <v-col cols="6">
                  <v-autocomplete
                    v-model="contract.data.Customer"
                    outlined
                    rounded
                    dense
                    label="اسم العميل"
                    prepend-inner-icon="mdi-calendar"
                    :items="customers"
                    item-text="FullName"
                    item-value="PK"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="contract.data.ProjectName"
                    outlined
                    rounded
                    dense
                    :label="contract.labels.project_name"
                    prepend-inner-icon="fas fa-drafting-compass"
                    type="telephone"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="contract.data.CustomerAddress"
                    outlined
                    rounded
                    dense
                    :label="contract.labels.address"
                    prepend-inner-icon="mdi-calendar"
                    type="text"
                  ></v-text-field>
                </v-col>
                <v-col cols="6"> </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="contract.data.GregorianDate"
                        :label="contract.labels.date_grigorean"
                        prepend-inner-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                        outlined
                        rounded
                        dense
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      ref="picker"
                      v-model="contract.data.GregorianDate"
                      @change="save_grigorean"
                      :first-day-of-week="1"
                      locale="ar"
                      dir="rtl"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="6">
                  <v-menu
                    ref="menu2"
                    v-model="menu2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="contract.data.HijriDate"
                        :label="contract.labels.date_hijri"
                        prepend-inner-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                        outlined
                        rounded
                        dense
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      ref="picker"
                      v-model="hd"
                      @change="save_hijri"
                      :first-day-of-week="0"
                      locale="ar-sa"
                      dir="rtl"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-textarea
                    v-model="contract.data.ContractCoverLetters"
                    outlined
                    rounded
                    dense
                    :label="contract.labels.statement"
                    prepend-inner-icon="fas fa-pen"
                    type="text"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="contract.data.PriceInLetters"
                    outlined
                    rounded
                    dense
                    :label="contract.labels.price_in_letters"
                    prepend-inner-icon="fas fa-dollar-sign"
                    type="text"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="contract.data.PriceInNumbers"
                    outlined
                    rounded
                    dense
                    :label="contract.labels.price_in_numbers"
                    prepend-inner-icon="fas fa-dollar-sign"
                    type="number"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="contract.data.TotalArea"
                    outlined
                    rounded
                    dense
                    :label="contract.labels.project_area"
                    prepend-inner-icon="fas fa-ruler"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                <v-text-field
                  v-model="contract.data.NumberOfWindows"
                  outlined
                  rounded
                  dense
                  label="عدد الواجهات"
                  prepend-inner-icon="fas fa-hourglass-start"
                  type="number"
                ></v-text-field>
              </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="contract.data.TotalTimePeriod"
                    outlined
                    rounded
                    dense
                    :label="contract.labels.project_estimated_time"
                    prepend-inner-icon="fas fa-hourglass-start"
                    type="text"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="contract.data.SecondSide"
                    outlined
                    rounded
                    dense
                    :label="contract.labels.contract_customer"
                    prepend-inner-icon="fas fa-user"
                    type="text"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="contract.data.Contract_subject"
                    outlined
                    rounded
                    dense
                    :label="contract.labels.contract_subject"
                    prepend-inner-icon="fas fa-pen"
                    type="text"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="contract.data.WorkingDomain"
                    outlined
                    rounded
                    dense
                    :label="contract.labels.project_range"
                    prepend-inner-icon="fab fa-accusoft"
                    type="text"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-autocomplete
                    v-model.number="contract.data.ContractType"
                    :items="contract_types"
                    :label="$t('contract_type')"
                    outlined
                    rounded
                    dense
                    item-text="Type"
                    item-value="PK"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="6">
                  <v-switch
                    v-model="contract.data.MunicipalConfirmed"
                    :label="$t('approvement')"
                    outlined
                    rounded
                    dense
                  ></v-switch>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-textarea
                    v-model="contract.data.ProjectComponents"
                    outlined
                    rounded
                    dense
                    label="مكونات المشروع"
                    prepend-inner-icon="fas fa-info-circle"
                    type="text"
                    auto-grow
                  ></v-textarea>
                </v-col>
                <v-col cols="6">
                  <v-textarea
                    v-model="contract.data.AdditionalDetails"
                    outlined
                    rounded
                    dense
                    :label="contract.labels.extra_details"
                    prepend-inner-icon="fas fa-info-circle"
                    type="text"
                    auto-grow
                  ></v-textarea>
                </v-col>
              </v-row >
              <v-row v-if="added||contract.data.PK">
                <payments :contract="contract.data" />
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-btn
                    block
                    dark
                    color="primary"
                    @click="
                      contract.data.PK
                        ? update(contract.data)
                        : store_contract(contract.data)
                    "
                  >
                    {{ (added||contract.data.PK) ? $t("edit") : $t("register") }}
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
import payments from '../payment/index';
export default {
   name:'contract.form',
  components:{
    payments
  },
  data() {
    return {
      menu1: false,
      menu2: false,
      date1: null,
      date2: null,

      contract: {
        data: {
          Payments: [],
          MunicipalConfirmed:false,
          
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
        hd:null
    };
  },
  mounted() {
    this.$store.dispatch("contract_type/index");
    this.$store.dispatch("customer/index");
    if (this.$route.params.contract) {
      let contract = this.$route.params.contract;
      this.contract.data = contract;
      this.$store.dispatch("payment/index", {
        ContractID: this.contract.data.PK,
      });
    }
    if (this.$route.params.quotation) {
      let quotation = this.$route.params.quotation;
      delete quotation['PK'];
      delete quotation['CustomerName'];
      this.contract.data = quotation;
      
    }
  },
  methods: {
    ...mapActions("contract", {
      store_contract: "store",
      update: "update",
    }),
    save_grigorean(date) {
      this.$refs.menu1.save(date);
    },
    save_hijri(date) {
      this.$refs.menu2.save(date);
      this.contract.data.HijriDate =  new Intl.DateTimeFormat('FR-u-ca-islamic',{day: 'numeric', month: 'numeric',year : 'numeric'}).format(new Date(date)).split(" ")[0].split("/").reverse().join("-");
    },
    add_payment() {
      this.contract.data.Payments.push({
        key: Math.random() * 100,
        amount: "",
      });
    },
    change_amount(e, payment) {
      payment.amount = parseFloat(e.target.innerText);
    },
    delete_payment(payment) {
      this.contract.data.Payments = this.contract.data.Payments.filter(
        (i) => i.key != payment.key
      );
    },
  },
  computed: {
    ...mapState({
      contract_types: (state) => state.contract_type.all,
      customers: (state) => state.customer.all,
      payments: (state) => state.payment.all,
      ContractID: (state) => state.contract.one,
      added:(state)=>state.contract.one != null,
    }),
  },
  watch: {
    ContractID: function (val) {
      this.contract.data.PK = val;
    },
  },
};
</script>