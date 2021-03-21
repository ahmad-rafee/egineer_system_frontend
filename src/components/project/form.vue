<template>
<v-container>
  <v-row justify="center" dense>
    <v-col cols="12">
      <v-card outlined>
        <v-card-title>{{project.data.ProjectID?"تعديل مشروع":"إضافة مشروع"}}</v-card-title>
        <v-card-text>
          <v-form class="mx-auto col-11" ref="form">
            <v-row>
              <v-col cols="6">
                <v-autocomplete
                  v-model="project.data.Customer"
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
                  v-model="project.data.ProjectName"
                  outlined
                  rounded
                  dense
                  :label="project.labels.project_name"
                  prepend-inner-icon="fas fa-drafting-compass"
                  type="text"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-autocomplete
                  v-model="project.data.ContractID"
                  outlined
                  rounded
                  dense
                  :label="$t('contract')"
                  prepend-inner-icon="mdi-calendar"
                  :items="contracts"
                  item-text="ProjectName"
                  item-value="PK"
                ></v-autocomplete>
              </v-col>
              <v-col cols="6">
   
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
                      v-model="project.data.ProjectIssueDate"
                      label="تاريخ بداية المشروع"
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
                    v-model="project.data.ProjectIssueDate"
                    min="1950-01-01"
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
                      v-model="project.data.ProjectDueDate"
                      label="تاريخ نهاية المشروع"
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
                    v-model="project.data.ProjectDueDate"
                    @change="save_hijri"
                    :first-day-of-week="1"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="project.data.ProjectArea"
                  outlined
                  rounded
                  dense
                  :label="project.labels.project_area"
                  prepend-inner-icon="fas fa-ruler"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="project.data.NumberOfWindows"
                  outlined
                  rounded
                  dense
                  label="عدد الواجهات"
                  prepend-inner-icon="fas fa-ruler"
                  type="number"
                ></v-text-field>
              </v-col>
              
            </v-row>
  <v-row>
    <v-col cols="6">
                <v-text-field
                  v-model="project.data.TotalTimePeriod"
                  outlined
                  rounded
                  dense
                  :label="project.labels.project_estimated_time"
                  prepend-inner-icon="fas fa-hourglass-start"
                  type="text"
                ></v-text-field>
              </v-col>
  </v-row>
            <v-row>
              <v-col cols="6">
                <v-switch
                  label="موافقة العميل"
                  v-model="project.data.CustomerFinishingConfirm"
                >
                </v-switch>
              </v-col>
              <v-col cols="6">
                <v-switch
                  :label="$t('approvement')"
                  v-model="project.data.MunicipalConfirmed"
                >
                </v-switch>
              </v-col>
            </v-row>
            <!-- <v-row>
              <v-col cols="6">
                <v-textarea
                  label="ملاحظات العميل"
                  v-model="project.data.CustomerNotes"
                  rounded
                  dense
                  outlined
                  rows="1"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="نسبة التقدم الحالية"
                  v-model.number="project.data.CurrentProgress"
                  rounded
                  outlined
                  dense
                  type="number"
                />
              </v-col>
            </v-row> -->
            <v-row>
              <v-col cols="6">
                <v-autocomplete rounded outlined dense label="نوع المشروع" :items="project_types" item-text="Type" item-value="PK" v-model="project.data.ProjectType"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn
                  block
                  dark
                  color="primary"
                  @click="project.data.ProjectID?update(project.data):store(project.data)"
                >
                  {{ project.data.ProjectID?$t('edit'):$t("register") }}
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
   name:'projcet.form',
  data() {
    return {
      menu1: false,
      menu2: false,
      date1: null,
      date2: null,
      project: {
        data: {
          MunicipalConfirmed:false,
          CustomerFinishingConfirm:false
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
  methods: {
    ...mapActions("project",["store","update"]),
    save_grigorean(date) {
      this.$refs.menu1.save(date);
    },
    save_hijri(date) {
      this.$refs.menu2.save(date);
    },
  },
  mounted(){
    if(this.$route.params.contract){
      let contract = this.$route.params.contract;        
      let keys = ['ProjectName', 'ProjectType', 'ContractID','ProjectArea','TotalTimePeriod','ProjectIssueDate','ProjectDueDate','MunicipalConfirmed','CustomerFinishingConfirm','CustomerNotes','CurrentProgress','Customer','NumberOfWindows' ];
      let project = {ContractID : contract.PK};
      keys.map(i=>{
        if(contract[i])
        project[i] = contract[i];
      });
      this.project.data = project;
      this.project.data.ContractID = contract.PK;
    }
    if(this.$route.params.project){
      
      this.project.data = this.$route.params.project;
    } 
    this.$store.dispatch("contract/index");
    this.$store.dispatch("price_offer_type/index");
    this.$store.dispatch("project_type/index");
    this.$store.dispatch("customer/index");
  },
  computed:{
    ...mapState({
      contracts:(state)=>state.contract.all,
      project_types:(state)=>state.price_offer_type.all,
      project_types:(state)=>state.project_type.all,
      customers:(state)=>state.customer.all
    })
  }
};
</script>