const { Model } = require('nedb-models')
const joi = require('@hapi/joi');

const i18n = require('../utils/i18n');
const ApiError = require('../utils/ApiError');

class User extends Model {
  static datastore() {
    return './.nedb/users.db'
  }

  static studentSchema = joi
    .object({
      _id: joi.string().optional(),
      name: joi.string().label('Имя').required(),
      last_name: joi.string().label('Фамилия').required(),
      patronymic: joi.string().label('Отчество').allow('').required(),
      payment_amount: joi.number().label('Сумма оплаты за полугодие').required(),
      backlog: joi.number().label('Задолженность по оплате').required(),
      installment_plan: joi.boolean().label('Наличие рассрочки').required(),
      email: joi.string().label('Email').required(),
      phone_number: joi.string().label('Номер телефона').required(),
      address: joi.string().label('Адрес').allow('').required(),
      password: joi.string().label('Пароль').min(6).optional(),
      contract: joi.string().label('Договор').allow('').required(),
      role: joi.string().label('Должность').required(),
    })
    .unknown(false)
    .messages({ ...i18n });

  static adminSchema = joi
    .object({
      _id: joi.string().optional(),
      name: joi.string().label('Имя').required(),
      last_name: joi.string().label('Фамилия').required(),
      patronymic: joi.string().label('Отчество').allow('').required(),
      payment_amount: joi.number().label('Сумма оплаты за полугодие').optional(),
      backlog: joi.number().label('Задолженность по оплате').optional(),
      installment_plan: joi.boolean().label('Наличие рассрочки').optional(),
      email: joi.string().label('Email').required(),
      phone_number: joi.string().label('Номер телефона').required(),
      address: joi.string().label('Адрес').allow('').optional(),
      password: joi.string().label('Пароль').min(6).optional(),
      contract: joi.string().label('Договор').allow('').optional(),
      role: joi.string().label('Должность').required(),
    })
    .unknown(false)
    .messages({ ...i18n });

  static async validate(data) {
    if (!data.role) {
      throw new ApiError(400, 'Не указана роль пользователя!');
    }

    const {
      error,
    } = (data.role === 'student' 
        ? this.studentSchema 
        : this.adminSchema).validate(data);

    if (error) {
      const {
        details: [{ message }],
      } = error;
      throw new ApiError(400, message);
    }
  }
}

module.exports = User;