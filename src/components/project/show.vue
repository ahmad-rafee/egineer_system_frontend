<template>
  <v-container>
    <v-row justify="center" dense>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title> عرض مشروع </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-card>
                  <v-card-title> اسم المشروع </v-card-title>
                  <v-card-text>
                    {{ project.ProjectName }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <v-card-title> اسم العميل </v-card-title>
                  <v-card-text>
                    {{ project.CustomerName }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-card>
                  <v-card-title> مساحة المشروع الكلية </v-card-title>
                  <v-card-text>
                    {{ project.ProjectArea }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <v-card-title> الوقت المتوقع لإنهاء المشروع </v-card-title>
                  <v-card-text>
                    {{ project.TotalTimePeriod }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-card>
                  <v-card-title> تاريخ بداية المشروع </v-card-title>
                  <v-card-text>
                    {{ project.ProjectIssueDate }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <v-card-title> تاريخ نهاية المشروع </v-card-title>
                  <v-card-text>
                    {{ project.ProjectDueDate }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-card>
                  <v-card-title> نسبة التقدم الحالية </v-card-title>
                  <v-card-text>
                    {{ project.CurrentProgress }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <v-card-title> ملاحظات العميل </v-card-title>
                  <v-card-text>
                    {{ project.CustomerNotes }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-card>
                  <v-card-title>موافقة البلدية </v-card-title>
                  <v-card-text>
                    {{ project.MunicipalConfirmed? "نعم": "لا" }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <v-card-title> موافقة العميل </v-card-title>
                  <v-card-text>
                    {{ project.CustomerFinishingConfirm? "نعم": "لا" }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
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
      slider: 0,
    };
  },
  mounted() {
    if (this.$route.params.project) {
      this.$store.dispatch("project/show", this.$route.params.project.ProjectID);
    }
  },
  methods: {
    ...mapActions("task", ["store"]),
    save_grigorean(date) {
      this.$refs.menu1.save(date);
    },
    save_hijri(date) {
      this.$refs.menu2.save(date);
    },
    change_amount(e, payment) {
      payment.amount = parseFloat(e.target.innerText);
    },
    get_parts(item) {
      this.$store.dispatch("moodboard_item/index", item);
      // console.log(item);
    },
  },
  computed: {
    ...mapState({
    //   employees: (state) => state.employee.all,
    //   projects: (state) => state.project.all,
    //   moodboard_parts: (state) => state.moodboard_item.all,
      project: (state) => state.project.one[0],
    }),
  },
  watch: {},
};
</script>