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
          Администрация
          <v-spacer />
          <v-btn
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
          <template v-slot:item.role="{ item }">
            {{ roles.find(r => r.value === item.role).text }}
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
              label="Фамилия"
            />
            <v-text-field
              v-model="edititingItem.name"
              label="Имя"
            />
            <v-text-field
              v-model="edititingItem.patronymic"
              label="Отчество"
            />
            <v-text-field
              v-model="edititingItem.phone_number"
              label="Номер телефона"
            />
            <v-text-field
              v-model="edititingItem.email"
              label="Email"
            />
            <v-text-field
              v-model="edititingItem.password"
              type="password"
              label="Пароль"
            />
            <v-select
              v-model="edititingItem.role"
              :items="roles"
              label="Должность"
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
      last_name: '',
      name: '',
      patronymic: '',
      phone_number: '',
      email: '',
      password: '',
      role: '',
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
          text: 'Должность',
          value: 'role',
        },
        {
          text: '',
          value: 'controls'
        }
      ],
      query: {
        role: {
          $ne: 'student'
        }
      },
      roles: [
        { text: 'Директор', value: 'director' },
        { text: 'Бухгалтер', value: 'bookkeeper' },
      ],
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
        if (this.items.length === 1) {
          throw new Error('Невозможно удалить единственную запись пользователя');
        }

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
