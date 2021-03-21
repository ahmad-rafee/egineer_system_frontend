<template>
  <v-container>
    <v-row justify="center" dense>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title> عرض مهمة </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-card>
                  <v-card-title> اسم المهمة </v-card-title>
                  <v-card-text>
                    {{ task.TaskName }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <v-card-title> اسم العنصر </v-card-title>
                  <v-card-text>
                    {{ task.TableItem }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-card>
                  <v-card-title> اسم العميل </v-card-title>
                  <v-card-text>
                    {{ task.CustomerName }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <v-card-title> المشروع </v-card-title>
                  <v-card-text>
                    {{ task.ProjectName }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-card>
                  <v-card-title> عدد الأمتار </v-card-title>
                  <v-card-text>
                    {{ task.NumberOfMeters }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <v-card-title> عدد الواجهات </v-card-title>
                  <v-card-text>
                    {{ task.NumberOfWindows }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2"></v-col>
              <v-col cols="6">
                <v-card>
                  <v-card-title> صور المهمة </v-card-title>
                  <v-card-text>
                    <v-carousel v-model="slider">
                      <v-carousel-item
                        v-for="image in task.images"
                        :key="image.PK"
                      >
                        <img
                          :src="'http://172.86.75.235:8000' + image.Images"
                          alt=""
                          style="width: 100%; height: 100%"
                        />
                      </v-carousel-item>
                    </v-carousel>
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
    if (this.$route.params.task) {
      this.$store.dispatch("task/show", this.$route.params.task.PK);
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
    add_payment() {
      this.task.Payments.push({
        key: Math.random() * 100,
        amount: "",
      });
    },
    change_amount(e, payment) {
      payment.amount = parseFloat(e.target.innerText);
    },
    delete_payment(payment) {
      this.task.Payments = this.task.Payments.filter(
        (i) => i.key != payment.key
      );
    },
    get_parts(item) {
      this.$store.dispatch("moodboard_item/index", item);
      // console.log(item);
    },
  },
  computed: {
    ...mapState({
      employees: (state) => state.employee.all,
      projects: (state) => state.project.all,
      moodboard_parts: (state) => state.moodboard_item.all,
      task: (state) => state.task.one,
    }),
  },
  watch: {},
};
</script>