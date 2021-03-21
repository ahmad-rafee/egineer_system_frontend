<template>
  <v-container>
    <v-row justify="center" dense>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>
            <v-row>
              <v-col cols="10"> المهام </v-col>
              <v-col cols="2" v-if="$store.state.auth.role != 'Engineer'">
                <v-btn to="/task/form" dark color="primary">
                  إضافة مهمة جديدة
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row
              v-if="
                $store.state.auth.role != 'Engineer' ||
                $store.state.auth.role != 'Customer'
              "
            >
              <v-col cols="2"></v-col>
              <v-col cols="6">
                <v-autocomplete
                  v-model="project"
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
              <v-col cols="2">
                <v-btn
                  dark
                  color="primary"
                  @click="$store.dispatch('task/get_by_project', project)"
                >
                  اختيار
                </v-btn>
              </v-col>
            </v-row>
            <v-data-table :headers="headers" :items="all" :items-per-page="5">
              <template v-slot:item.TaskName="{ item }">
                <v-btn text depressed @click="display_task(item)">
                  {{ item.TaskName }}
                </v-btn>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-row v-if="$store.state.auth.role == 'Engineer'">
                  <v-col cols="6">
                    <v-file-input
                      v-model="item.File"
                      label="اختر ملفا"
                      prepend-icon="mdi-plus"
                      width="100"
                      dense
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-btn dark color="primary" @click="submit(item)">
                      تسليم
                    </v-btn>
                    <v-btn
                      icon
                      @click="edit(item)"
                      title="تعديل"
                      v-if="$store.state.auth.role != 'Engineer'"
                    >
                      <v-icon> fas fa-edit </v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      @click="remove(item)"
                      title="حذف"
                      v-if="$store.state.auth.role != 'Engineer'"
                    >
                      <v-icon> fas fa-trash </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <v-btn
                  icon
                  @click="$store.dispatch('task/confirmTask', item)"
                  title="تأكيد"
                  v-if="
                    (!item.ConfirmedBySuperVisor &&
                      $store.state.auth.user.role == 'SuperVisorEngineer') ||
                    $store.state.auth.user.role == 'Admin'
                  "
                >
                  <v-icon> fas fa-check </v-icon>
                </v-btn>
                <v-btn
                  icon
                  @click="
                    task_files_dialog = true;
                    $store.dispatch('task/getTaskFiles', item.PK);
                  "
                  title="عرض ملفات المهمة"
                  v-if="
                    (!item.ConfirmedBySuperVisor &&
                      $store.state.auth.user.role == 'SuperVisorEngineer') ||
                    $store.state.auth.user.role == 'Admin'
                  "
                >
                  <v-icon> fas fa-eye </v-icon>
                </v-btn>
                <v-btn
                  icon
                  @click="$store.dispatch('task/confirmTask', item)"
                  title="تأكيد"
                  v-if="
                    !item.ConfirmedByCustomer &&
                    $store.state.auth.user.rol == 'Customer'
                  "
                >
                  <v-icon> fas fa-check </v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="task_files_dialog" width="600">
      <v-card>
        <v-card-title> عرض ملفات المهمة </v-card-title>
        <v-card-text>
          <v-simple-table>
            <thead>
              <th>#</th>
              <th>اسم الملف</th>
              <th>رابط الملف</th>
            </thead>
            <tbody>
              <tr v-for="file in task_files" :key="file.PK">
                <td>
                  {{ file.PK }}
                </td>
                <td>
                  {{ (file.name = file.File.split("/").reverse()[0]) }}
                </td>
                <td>
                  <v-btn icon @click="downloadFile(file.File, file.name)" title="تحميل الملفات">
                    <v-icon> fas fa-download </v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-dialog>
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
      task_files_dialog: false,
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
    display_task(task) {
      this.$router.push({
        name: "task.show",
        params: {
          task,
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
          this.$store.dispatch("task/delete", item).then(() => {
            if (this.$store.state.auth.role == "Engineer") {
              this.$store.dispatch(
                "task/get_by_employee",
                this.$store.state.auth.user.id
              );
            } else if (this.$route.params.employee && this.$route.params.done) {
              this.$store.dispatch("task/getTasksDoneByEmployee", {
                PK: employee.id,
              });
            } else {
              this.$store.dispatch("project/index");
            }
          });
        }
      });
    },
    downloadFile(uri, name) {
      var link = document.createElement("a");
      link.setAttribute("download", name);
      link.target = "_blank";
      link.href = "http://172.86.75.235:8000" + uri;
      document.body.appendChild(link);
      link.click();
      link.remove();
      this.task_files_dialog = false;
    },
  },
  mounted() {
    if (this.$store.state.auth.role == "Engineer") {
      this.$store.dispatch(
        "task/get_by_employee",
        this.$store.state.auth.user.id,
        this.$store.state.auth.user.role
      );
    } else if (this.$route.params.employee && this.$route.params.done) {
      this.$store.dispatch("task/getTasksDoneByEmployee", { PK: employee.id });
    } else {
      this.$store.dispatch("project/index");
    }
  },
  computed: {
    ...mapState({
      all: (state) => state.task.all,
      projects: (state) => state.project.all,
      task_files: (state) => state.task.task_files,
    }),
  },
};
</script>