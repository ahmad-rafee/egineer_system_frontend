<template>
  <v-container>
    <v-row justify="center" dense>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>
            <v-row>
              <v-col cols="10"> جدول العناصر </v-col>
              <v-col cols="2">
                <v-btn to="/item/form" dark color="primary"> إضافة عنصر </v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-data-table :headers="headers" :items="all" :items-per-page="5">
              <template v-slot:item.actions="{ item }">
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
      project: null,
      submession: {},
      ContractID: null,
      payment: {},
      add_payment_dialog: false,
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
          text: "الاسم",
          value: "ItemName",
        },
        {
          text: "وقت التصنيع",
          value: "DueTimeForCreation",
        },
        {
          text: "وقت التعديل",
          value: "DueTimeForModification",
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
    edit(item) {
      let name = "item";
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
          this.$store.dispatch("item/delete", item.ItemID).then(() => {
            this.$store.dispatch("item/index");
          });
        }
      });
    },
  },
  mounted() {
    this.$store.dispatch("item/index");
  },
  computed: {
    ...mapState({
      all: (state) => state.item.all,
    }),
  },
  watch: {},
};
</script>