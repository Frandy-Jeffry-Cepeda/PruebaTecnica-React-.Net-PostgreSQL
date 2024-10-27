import { z } from 'zod'
import { dataEmployee, loginSchema, registerFormDataSchema, updateFormDataSchema, userSchema } from '../schemas'

export type LoginUserData = {
    email: string,
    password: string
}

export enum UserRole {
    Admin = 'Admin',
    Employee = 'Employee',
}

export type LoginUserDataSchema = z.infer<typeof loginSchema>
export type UserSchema = z.infer<typeof userSchema>
export type RegisterFormDataSchema = z.infer<typeof registerFormDataSchema>
export type UpdateFormDataSchema = z.infer<typeof updateFormDataSchema>
export type DataEmployee = z.infer<typeof dataEmployee>
