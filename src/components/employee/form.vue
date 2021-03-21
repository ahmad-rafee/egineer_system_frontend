<template>
<v-container>
  <v-row justify="center" dense>
    <v-col cols="12">
      <v-card outlined>
        <v-card-title> {{employee.PK?"تعديل موضوعات موظف" : "إضافة موظف جديد"}} </v-card-title>
        <v-card-text>
          <v-form class="mx-auto col-11" ref="form">
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="employee.EmployeeName" :label="$t('employee_name')" outlined rounded dense></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-text-field v-model="employee.EmployeeUserName" label="اسم المستخدم للموظف" outlined rounded dense></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field v-model="employee.EmployeePassword" label="كلمة المرور" outlined rounded dense type="password"></v-text-field>
                </v-col>

            </v-row>
            <v-row>
              <v-col cols="6">
                <v-autocomplete
                  v-model="employee.EmployeeJobType"
                  outlined
                  rounded
                  dense
                  :items="job_types"
                  item-text="JobType"
                  item-value="PK"
                  label="المسمى الوظيفي"
                  prepend-inner-icon="mdi-calendar"
                ></v-autocomplete>
              </v-col>
              <v-col cols="6">
                <v-autocomplete
                  v-model="employee.EmployeeCategory"
                  outlined
                  rounded
                  dense
                  :items="employee_categories"
                  item-text="CategoryName"
                  item-value="PK"
                  label="تصنيف الوظيفة"
                  prepend-inner-icon="mdi-user"
                ></v-autocomplete>
              </v-col>
            </v-row>
    <v-row>
        <v-col cols="6">
            <v-checkbox label="نشط" v-model="employee.IsActive"></v-checkbox>
        </v-col>
        <v-col cols="6">
            <v-checkbox label="مشرف" v-model="employee.IsSuperVisor"></v-checkbox>
        </v-col>
    </v-row>
            
            <v-row>
              <v-col cols="12">
                <v-btn
                  block
                  dark color="primary"
                  @click="employee.PK?update(employee):store(employee)"
                >
                 {{ employee.PK?$t('edit'):$t("register") }}
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
   name:'employee.form',
  data() {
    return {
      menu1: false,
      menu2: false,
      date1: null,
      date2: null,
      employee:{
        IsSuperVisor:false,
        IsActive:false
      }
    };
  },
  mounted() {
    this.$store.dispatch("job_type/index");
    this.$store.dispatch("employee_category/index");
    if(this.$route.params.employee){
      this.employee = this.$route.params.employee;
    }
  },
  methods: {
    ...mapActions("employee",["store","update"]),
  },
  computed:{
    ...mapState({
      job_types:(state)=>state.job_type.all,
      employee_categories:(state)=>state.employee_category.all
    })
  }
};
</script>