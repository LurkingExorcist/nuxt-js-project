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
          Студенты
          <v-spacer />
          <v-btn
            v-if="userRole === 'director'"
            text 
            @click="create"
          >
            Создать
          </v-btn>
        </v-card-title>
        <v-card-text>
        <v-data-table
          :headers="headers"
          :items="items"
          multi-sort
        >
          <template v-slot:item.contract="{ item }">
            <v-btn
              v-if="item.contract"
              @click="download(item.contract)"
              text
            >
              {{ item.contract }}
            </v-btn>
            <span v-else>Нет</span>
          </template>
          <template v-slot:item.controls="{ item }">
            <v-btn
              icon
              @click="edit(item)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              icon  
              @click="remove(item)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
        </v-card-text>
      </v-card>
      <v-dialog
        v-model="editModal"
        max-width="505"
      >
        <v-card class="edit-modal">
          <v-card-title class="headline">
            {{ modalTitle }}
            <v-spacer />
            <v-btn
              color="green darken-1"
              text
              @click="save"
            >
              Сохранить
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-text-field
              v-model="edititingItem.last_name"
              :disabled="userRole !== 'director'"
              label="Фамилия"
            />
            <v-text-field
              v-model="edititingItem.name"
              :disabled="userRole !== 'director'"
              label="Имя"
            />
            <v-text-field
              v-model="edititingItem.patronymic"
              :disabled="userRole !== 'director'"
              label="Отчество"
            />
            <v-text-field
              v-model="edititingItem.email"
              :disabled="userRole !== 'director'"
              label="Email"
            />
            <v-text-field
              v-model="edititingItem.phone_number"
              :disabled="userRole !== 'director'"
              label="Номер телефона"
            />
            <v-text-field
              v-model="edititingItem.address"
              :disabled="userRole !== 'director'"
              label="Адрес"
            />
            <v-text-field
              v-model="edititingItem.payment_amount"
              :disabled="userRole !== 'director'"
              label="Сумма оплаты за полугодие (руб.)"
            />
            <v-text-field
              v-model="edititingItem.backlog"
              label="Задолженность по оплате (руб.)"
            />
            <v-checkbox
              v-model="edititingItem.installment_plan"
              label="Наличие рассрочки"
            />
            <v-text-field
              v-model="edititingItem.password"
              :disabled="userRole !== 'director'"
              type="password"
              label="Пароль"
            />
          </v-card-text>
        </v-card>
      </v-dialog>
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
import qs from 'qs';

export default {
  layout: 'admin',
  data() {
    const defaultItem = {
      name: '',
      last_name: '',
      patronymic: '',
      payment_amount: 0,
      backlog: 0,
      installment_plan: false,
      email: '',
      phone_number: '',
      address: '',
      password: '',
      contract: '',
      role: 'student'
    };

    return {
      table: 'users',
      items: [],
      headers: [
        {
          text: 'Имя',
          value: 'name',
        },
        {
          text: 'Фамилия',
          value: 'last_name',
        },
        {
          text: 'Отчество',
          value: 'patronymic',
        },
        {
          text: 'Email',
          value: 'email',
        },
        {
          text: 'Телефон',
          value: 'phone_number',
        },
        {
          text: 'Договор',
          value: 'contract',
        },
        {
          text: '',
          value: 'controls'
        }
      ],
      query: {
        role: 'student'
      },
      editModal: false,
      edititingItem: {...defaultItem},
      defaultItem,

      showAlert: false,
      alertText: '',
      alertColor: ''
    };
  },
  mounted() {
    this.fetch();
  },
  computed: {
    userRole() {
      return this.$auth.user.role;
    },
    isEdit() {
      return !!this.edititingItem._id;
    },
    modalTitle() {
      return this.isEdit ? 'Редактирование' : 'Создание';
    }
  },
  methods: {
    alert(color, text) {
      this.showAlert = true;
      this.alertText = text;
      this.alertColor = color;
    },
    download(contract) {
      window.open('/uploads/' + contract, '_blank')
    },
    edit(item) {
      this.edititingItem = {...item};
      this.edititingItem.password = '';

      this.editModal = true;
    },
    create() {
      this.edititingItem = {...this.defaultItem};
      this.editModal = true;
    },
    async fetch() {
      try {
        const { data } = await this.$axios.get(`/api/${this.table}/list?${qs.stringify(this.query)}`);
        this.items = data;

        this.alert('success', 'Данные успешно загружены');
      } catch(e) {
        console.error(e);

        const error = e.response ? e.response.data.error : e.message;
        this.alert('error', 'Произошла ошибка при загрузке данных. ' + error);
      }
    },
    async remove(item) {
      try {
        await this.$axios.delete(`/api/${this.table}/one?id=${item._id}`);

        this.alert('success', 'Запись удалена');

        await this.fetch();
        this.editModal = false;
      } catch(e) {
        console.error(e);

        const error = e.response ? e.response.data.error : e.message;
        this.alert('error', 'Произошла ошибка при удалении данных. ' + error);
      }
    },
    async save() {
      try {
        if (this.edititingItem.password === '') {
          delete this.edititingItem.password;
        }
        
        if (this.isEdit) {
          await this.$axios.put(`/api/${this.table}/one/?${qs.stringify({
            id: this.edititingItem._id
          })}`, this.edititingItem);
        } else {
          await this.$axios.post(`/api/${this.table}/one`, this.edititingItem);
        }

        this.alert('success', 'Запись сохранена');

        await this.fetch();
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
