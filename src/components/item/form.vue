<template>
  <v-container>
    <v-row justify="center" dense>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title> {{data.ItemID?"تعديل عنصر":"إضافة عنصر"}} </v-card-title>
          <v-card-text>
            <v-form class="mx-auto col-11" ref="form">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="الاسم"
                    outlined
                    rounded
                    dense
                    v-model="data.ItemName"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="وقت التصنيع"
                    outlined
                    rounded
                    dense
                    v-model="data.DueTimeForCreation"
                    type="number"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="وقت التعديل"
                    outlined
                    rounded
                    dense
                    v-model="data.DueTimeForModification"
                    type="number"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-btn block dark color="primary" @click="data.ItemID?update(data):store(data)">
                    {{ data.ItemID?$t('edit'):$t("register") }}
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
import { mapActions } from "vuex";
export default {
   name:'item.form',
  data() {
    return {
      data: {},
    };
  },
  mounted() {
    if(this.$route.params.item){
      this.data = this.$route.params.item;
    }
  },
  methods: {
    ...mapActions("item", ["store"]),
  },
};
</script>