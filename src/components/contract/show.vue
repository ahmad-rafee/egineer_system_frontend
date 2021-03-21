<template>
  <v-container>
    <v-row justify="center" dense>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title> عرض عقد </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-card>
                  <v-card-title> اسم المشروع </v-card-title>
                  <v-card-text>
                    {{ contract.ProjectName }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <v-card-title> نوع العقد </v-card-title>
                  <v-card-text>
                    {{ contract.ContractTypeName }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                <v-card>
                  <v-card-title> اسم العميل </v-card-title>
                  <v-card-text>
                    {{ contract.CustomerName }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <v-card-title> عنوان العميل </v-card-title>
                  <v-card-text>
                    {{ contract.CustomerAddress }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                <v-card>
                  <v-card-title> اسم العميل </v-card-title>
                  <v-card-text>
                    {{ contract.GregorianDate }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <v-card-title> عنوان العميل </v-card-title>
                  <v-card-text>
                    {{ contract.HijriDate }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-card>
                  <v-card-title> مساحة المشروع الكلية </v-card-title>
                  <v-card-text>
                    {{ contract.TotalArea }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <v-card-title> الوقت المتوقع لإنهاء المشروع </v-card-title>
                  <v-card-text>
                    {{ contract.TotalTimePeriod }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-card>
                  <v-card-title> عدد الواجهات </v-card-title>
                  <v-card-text>
                    {{ contract.NumberOfWindows }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-card>
                  <v-card-title> السعر بالأرقام </v-card-title>
                  <v-card-text>
                    {{ contract.PriceInNumbers }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <v-card-title> السعر بالحروف </v-card-title>
                  <v-card-text>
                    {{ contract.PriceInLetters }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-card>
                  <v-card-title> الطرف الثاني للعقد </v-card-title>
                  <v-card-text>
                    {{ contract.SecondSide }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <v-card-title> مكونات المشروع </v-card-title>
                  <v-card-text>
                    {{ contract.ProjectComponents }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-card>
                  <v-card-title> نطاق العمل </v-card-title>
                  <v-card-text>
                    {{ contract.WorkingDomain }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <v-card-title> تفاصيل إضافية </v-card-title>
                  <v-card-text>
                    {{ contract.AdditionalDetails }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-card>
                  <v-card-title> موضوع العقد </v-card-title>
                  <v-card-text>
                    {{ contract.ContractCoverLetters }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <v-card-title> موافقة البلدية </v-card-title>
                  <v-card-text>
                    {{ contract.MunicipalConfirmed?"نعم" : "لا" }}
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
    if (this.$route.params.contract) {
      this.$store.dispatch("contract/show", this.$route.params.contract.PK);
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
    //   projects: (state) => state.contract.all,
    //   moodboard_parts: (state) => state.moodboard_item.all,
      contract: (state) => state.contract.one[0],
    }),
  },
  watch: {},
};
</script>