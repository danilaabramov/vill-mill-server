import { body } from "express-validator"

export const loginValidation = [
    body('login', 'Укажите логин').isString().isLength({min: 1}),
    body('password', "Пароль должен быть минимум 5 символов").isLength({ min: 5 }),
]

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail().optional(),
    body('number', 'Укажите номер телефона').isString().isLength({min: 11}),
    body('address', 'Укажите адрес').isString().isLength({min: 1}),
    body('login', 'Укажите логин').isString().isLength({min: 1}),
    body('password', "Пароль должен быть минимум 5 символов").isLength({ min: 5 }),
    body('fullName', "Укажите имя").isLength({min: 3}),
    body('avatarUrl', "Неверная ссылка на аватарку").optional().isURL(),
]