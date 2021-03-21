<template>
  <v-row justify="center" dense>
    <v-col cols="6">
      <v-card outlined>
        <v-card-title> Register </v-card-title>
        <v-card-text>
          <v-form class="mx-auto col-11" ref="form">
            <v-text-field
              v-model="user.user_name"
              outlined
              rounded
              dense
              :label="user.labels.user_name"
              prepend-inner-icon="fas fa-user"
              type="email"
            ></v-text-field>
            <v-text-field
              v-model="user.first_name"
              outlined
              rounded
              dense
              :label="$t('first_name')"
              prepend-inner-icon="fas fa-user"
              type="text"
            ></v-text-field>
            <v-text-field
              v-model="user.last_name"
              outlined
              rounded
              dense
              :label="$t('last_name')"
              prepend-inner-icon="fas fa-user"
              type="text"
            ></v-text-field>
            <v-text-field
              v-model="user.email"
              outlined
              rounded
              dense
              :label="$t('email')"
              prepend-inner-icon="mdi-email"
              type="email"
            ></v-text-field>
            <v-text-field
              v-model="user.password"
              outlined
              rounded
              dense
              :label="user.labels.password"
              prepend-inner-icon="mdi-lock"
              type="password"
            ></v-text-field>
            <v-text-field
              v-model="user.Customer_phone_number"
              outlined
              rounded
              dense
              :label="$t('Customer_phone_number')"
              prepend-inner-icon="mdi-phone"
              type="phone"
            ></v-text-field>

            <div class="col-12 text-center">
              <v-btn text class="text-justify" to="/login">{{
                $t("already_have_account")
              }}</v-btn>
            </div>
            <v-btn block dark color="primary" @click="register(user)">
              {{ $t("register") }}
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      menu: false,
      date: null,
      user: {
        data: {
          user_name: "",
          display_name: "",
          email: "",
          password: "",
          birth_date: null,
        },
        labels: {
          user_name: this.$t("user_name"),
          display_name: this.$t("display_name"),
          email: this.$t("email"),
          password: this.$t("password"),
          birth_date: this.$t("birth_date"),
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
    ...mapActions(["register"]),
    save(date) {
      this.$refs.menu.save(date);
    },
  },
};
</script>