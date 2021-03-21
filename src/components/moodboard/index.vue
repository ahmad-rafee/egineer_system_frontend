<template>
  <v-container>
    <v-row justify="center" dense>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>
            <v-row>
              <v-col cols="10"> المودبورد </v-col>
              <v-col cols="2" v-if="$store.state.auth.role != 'Engineer'">
                <v-btn to="/moodboard/form" dark color="primary" title="إضافة مودبورد" icon>
                  <v-icon>
                    fas fa-plus
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-data-table :headers="headers" :items="all" :items-per-page="5">
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
          text: "اسم المهمة",
          value: "TaskName",
        },
        {
          text: "عدد الأمتار",
          value: "NumberOfMeters",
        },
        {
          text: "عدد الواجهات",
          value: "NumberOfWindows",
        },
        {
          text: "تفاصيل",
          value: "Details",
        },
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
      this.$store.dispatch("task_submession/store", {
        Task: item.PK,
        TaskName: item.TaskName,
        File: item.File,
        EmployeeID: item.EmployeeID,
        Project: item.Project,
      });
    },
    edit(item) {
      let name = "task";
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
          this.$store.dispatch("task/delete", item).then(()=>{
            this.$store.dispatch("moodboard/index");
          });;
        }
      });
    },
  },
  mounted() {
    this.$store.dispatch("moodboard/index");
  },
  computed: {
    ...mapState({
      all: (state) => state.moodboard.all,
      projects: (state) => state.project.all,
    }),
  },
};
</script>