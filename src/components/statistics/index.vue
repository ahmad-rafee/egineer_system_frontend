<template>
<v-container>
  <v-row justify="center" dense>
    <v-col cols="12">
      <v-card outlined>
        <v-card-title> معدلات الإنجاز </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="all"
            :items-per-page="5"
          >
          <template v-slot:item.EmployeeName="{item}">
            <v-btn text @click="showStats(item)" depressed>
              {{item.EmployeeName}}
            </v-btn>
            </template>
          <template v-slot:item.Ration="{item}">
            {{item.Ration+"%"}}
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
                text:"اسم الموظف",
                value:'EmployeeName'
            },
            {
                text:"الشهر",
                value:'Month'
            },
            {
                text:"المعدل",
                value:'Ration'
            },
            // {
            //     text:"نوع العقد",
            //     value:'ContractType'
            // },
            // {
            //     text:"موافقة البلدية",
            //     value:'MunicipalConfirmed'
            // },
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
            // {
            //     text:"إجراءات",
            //     value:'actions'
            // },
        ],
    };
  },
  methods: {
  create_task(project){
      this.$router.push({
          name:'task.form',
          params:{
              project
          }
      });
  },
  create_moodboard(project){
      this.$router.push({
          name:'moodboard.form',
          params:{
              project
          }
      });
  },
  showStats(row){
     this.$router.push({
          name:'employee_stat.show',
          params:{
              employee:row
          }
      });
  }
  },
  mounted(){
    this.$store.dispatch("statistics/index");
  },
  computed:{
    ...mapState({
      all:(state)=>state.statistics.all
    })
  }
};
</script>