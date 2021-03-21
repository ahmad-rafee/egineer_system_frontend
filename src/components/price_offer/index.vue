<template>
  <v-container>
    <v-row justify="center" dense>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>
            <v-row>
              <v-col cols="10">
                {{ $t("price_offers") }}
              </v-col>
              <v-col cols="2">
                <v-btn to="/price_offer/form" dark color="primary">
                  إضافة عرض سعر
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="quotations"
              :items-per-page="5"
            >
              <template v-slot:item.actions="{ item }">
                <v-btn @click="show(item)" title="عرض" icon depressed>
                  <v-icon>
                    fas fa-eye
                  </v-icon>
                </v-btn>
                <v-btn icon @click="create_contract(item)" title="تحويل إلى عقد">
                  <v-icon> mdi-plus </v-icon>
                </v-btn>
                <v-btn
                  icon
                  @click="confirmPriceOffer(item)"
                  title="الموافقة على عرض السعر"
                  v-if="$store.state.auth.role == 'Admin'"
                >
                  <v-icon> fas fa-check </v-icon>
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
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      menu1: false,
      menu2: false,
      date1: null,
      date2: null,
      headers: [
        {
          text: this.$t("customer_name"),
          value: "CustomerName",
        },
        {
          text: this.$t("project_name"),
          value: "ProjectName",
        },
        // {
        //     text:this.$t('customer_full_name'),
        //     value:'CustomerFullName'
        // },
        // {
        //     text:this.$t('address'),
        //     value:'CustomerAddress'
        // },
        {
          text: this.$t("price_in_numbers"),
          value: "PriceInNumbers",
        },
        {
          text: this.$t("project_area"),
          value: "TotalArea",
        },
        {
          text: this.$t("project_estimated_time"),
          value: "TotalTimePeriod",
        },
        {
          text: this.$t("issue_date"),
          value: "PriceOfferIssueDate",
        },
        {
          text: this.$t("create_contract_from_price_offer"),
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
    ...mapActions(["add_quotation"]),
    save_grigorean(date) {
      this.$refs.menu1.save(date);
    },
    save_hijri(date) {
      this.$refs.menu2.save(date);
    },
    create_contract(quotation) {
      this.$router.push({
        name: "contract.form",
        params: {
          quotation,
        },
      });
    },
    confirmPriceOffer(item) {
      this.$store.dispatch("price_offer/confirmPriceOffer", item);
    },
    edit(item) {
      let name = "price_offer";
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
          this.$store.dispatch("price_offer/delete", item.PK).then(()=>{
            this.$store.dispatch("price_offer/index");
          });;
        }
      });
    },
    show(item){
      this.$router.push({
        name:'price_offer.show',
        params:{
          price_offer:item
        }
      });
    }
  },
  computed: {
    ...mapState({
      quotations: (state) => state.price_offer.all,
    }),
  },
  mounted() {
    this.$store.dispatch("price_offer/index");
  },
};
</script>