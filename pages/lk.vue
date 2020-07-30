<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card>
        <v-card-title class="headline">
          Личный кабинет студента
          <v-spacer />
          <v-btn
            text 
            color="primary"
            @click="save"
          >
            Сохранить
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="phone_number"
                label="Номер телефона"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-row>
                <v-col :sm="contract ? 8 : 12">
                  <v-file-input
                    v-model="contractFile"
                    label="Файл договора"
                    show-size
                  />
                </v-col>
                <v-col v-if="contract" sm="4">
                  <v-btn @click="download">
                    Скачать
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="address"
                label="Адрес"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                :value="user.last_name"
                label="Фамилия"
                disabled
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                :value="user.name"
                label="Имя"
                disabled
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                :value="user.patronymic"
                label="Отчество"
                disabled
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                :value="user.payment_amount"
                label="Сумма оплаты за полугодие"
                disabled
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                :value="user.backlog"
                label="Задолженность по оплате"
                disabled
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="user.email"
                label="Email"
                disabled
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-checkbox
                v-model="user.installment_plan"
                label="Наличие рассрочки"
                disabled
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-snackbar
        v-model="showAlert"
        :color="alertColor"
      >
        {{ alertText }}

        <template v-slot:action="{ attrs }">
          <v-btn
            dark
            text
            v-bind="attrs"
            @click="showAlert = false"
          >
            Закрыть
          </v-btn>
        </template>
      </v-snackbar>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  middleware: 'auth',
  layout: 'student',
  data() {
    return {
      contractFile: null,
      phone_number: '',
      address: '',
      contract: '',

      showAlert: false,
      alertText: '',
      alertColor: ''
    };
  },
  computed: {
    user() {
      return this.$auth.user;
    }
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      await this.$auth.fetchUser();
      this.phone_number = this.user.phone_number;
      this.address = this.user.address;
      this.contract = this.user.contract;
    },
    alert(color, text) {
      this.showAlert = true;
      this.alertText = text;
      this.alertColor = color;
    },
    download() {
      window.open('/uploads/' + this.contract, '_blank')
    },
    async save() {
      try {
        const userItem = {
          ...this.user,
          phone_number: this.phone_number,
          address: this.address,
        };

        if (this.contractFile) {
          const form = new FormData();
          form.set('file', this.contractFile);

          const { data } = await this.$axios.post('/api/storage/upload', form);
          userItem.contract = data.filename;
        }
        
        await this.$axios.put(`/api/users/me/`, userItem);
        await this.fetch();

        this.alert('success', 'Запись сохранена');

        this.editModal = false;
      } catch(e) {
        console.error(e);

        const error = e.response ? e.response.data.error : e.message;
        this.alert('error', 'Произошла ошибка при сохранении данных. ' + error);
      }
    }
  }
}
</script>
