<template>
<v-container>
  <v-row justify="center" dense>
    <v-col cols="12">
      <v-card outlined>
        <v-card-title> {{ price_offer.data.PK?"تعديل عرض سعر":$t("create_price_offer") }} </v-card-title>
        <v-card-text>
          <v-form class="mx-auto col-11" ref="form">
            <v-row>
              <v-col cols="6">
                <v-autocomplete
                  v-model="price_offer.data.Customer"
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
                  v-model="price_offer.data.ProjectName"
                  outlined
                  rounded
                  dense
                  :label="price_offer.labels.project_name"
                  prepend-inner-icon="fas fa-drafting-compass"
                  type="telephone"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="price_offer.data.CustomerAddress"
                  outlined
                  rounded
                  dense
                  :label="price_offer.labels.address"
                  prepend-inner-icon="mdi-calendar"
                  type="text"
                ></v-text-field>
              </v-col>
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
                      v-model="price_offer.data.PriceOfferIssueDate"
                      :label="price_offer.labels.issue_date"
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
                    v-model="price_offer.data.PriceOfferIssueDate"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save_grigorean"
                    :first-day-of-week="1"
                    locale="ar"
                    dir="rtl"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6">
                <v-textarea
                  v-model="price_offer.data.Statement"
                  outlined
                  rounded
                  dense
                  :label="price_offer.labels.statement"
                  prepend-inner-icon="fas fa-pen"
                  type="text"
                  rows="1"
                  auto-grow
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="price_offer.data.PriceInLetters"
                  outlined
                  rounded
                  dense
                  :label="price_offer.labels.price_in_letters"
                  prepend-inner-icon="fas fa-dollar-sign"
                  type="text"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model.number="price_offer.data.PriceInNumbers"
                  outlined
                  rounded
                  dense
                  :label="price_offer.labels.price_in_numbers"
                  prepend-inner-icon="fas fa-dollar-sign"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="price_offer.data.TotalArea"
                  outlined
                  rounded
                  dense
                  :label="price_offer.labels.project_area"
                  prepend-inner-icon="fas fa-ruler"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="price_offer.data.NumberOfWindows"
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
                  v-model="price_offer.data.TotalTimePeriod"
                  outlined
                  rounded
                  dense
                  :label="price_offer.labels.project_estimated_time"
                  prepend-inner-icon="fas fa-hourglass-start"
                  type="text"
                ></v-text-field>
              </v-col>
          </v-row>
            <v-row>
              <v-col cols="6">
                <v-autocomplete
                  v-model.number="price_offer.data.PriceOfferType"
                  :items="price_offer_types"
                  :label="$t('price_offer_type')"
                  outlined
                  rounded
                  dense
                  item-text="Type"
                  item-value="PK"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn
                  block
                  dark
                  color="primary"
                  @click="price_offer.data.PK?update(price_offer.data):store(price_offer.data)"
                >
                  {{ price_offer.data.PK?$t('edit'):$t("register") }}
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
   name:'price_offer.form',
  data() {
    return {
      menu1: false,
      menu2: false,
      date1: null,
      date2: null,
      price_offer: {
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
          price_offer_type: "",
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
    this.$store.dispatch("price_offer_type/index");
    this.$store.dispatch("customer/index");
    if(this.$route.params.price_offer){
      this.price_offer.data = this.$route.params.price_offer;
    }
  },
  methods: {
    ...mapActions("price_offer", ["store","update"]),
    save_grigorean(date) {
      this.$refs.menu1.save(date);
    },
    save_hijri(date) {
      this.$refs.menu2.save(date);
    },
  },
  computed: {
    ...mapState({
      price_offer_types: (state) => state.price_offer_type.all,
      customers:(state)=>state.customer.all
    }),
  },
};
</script>