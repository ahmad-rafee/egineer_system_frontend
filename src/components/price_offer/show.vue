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
                    {{ price_offer.ProjectName }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <v-card-title> اسم العميل </v-card-title>
                  <v-card-text>
                    {{ price_offer.CustomerName }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-card>
                  <v-card-title> مساحة المشروع الكلية </v-card-title>
                  <v-card-text>
                    {{ price_offer.TotalArea }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <v-card-title> الوقت المتوقع لإنهاء المشروع </v-card-title>
                  <v-card-text>
                    {{ price_offer.TotalTimePeriod }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-card>
                  <v-card-title> عدد الواجهات </v-card-title>
                  <v-card-text>
                    {{ price_offer.NumberOfWindows }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-card>
                  <v-card-title> السعر بالأرقام </v-card-title>
                  <v-card-text>
                    {{ price_offer.PriceInNumbers }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <v-card-title> السعر بالحروف </v-card-title>
                  <v-card-text>
                    {{ price_offer.PriceInLetters }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-card>
                  <v-card-title> تاريخ عرض السعر </v-card-title>
                  <v-card-text>
                    {{ price_offer.PriceOfferIssueDate }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <v-card-title> موضوع عرض السعر </v-card-title>
                  <v-card-text>
                    {{ price_offer.Statement }}
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
    if (this.$route.params.price_offer) {
      this.$store.dispatch("price_offer/show", this.$route.params.price_offer.PK);
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
    //   projects: (state) => state.price_offer.all,
    //   moodboard_parts: (state) => state.moodboard_item.all,
      price_offer: (state) => state.price_offer.one,
    }),
  },
  watch: {},
};
</script>