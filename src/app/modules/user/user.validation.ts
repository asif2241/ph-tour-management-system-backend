import z from "zod";
import { IsActive, Role } from "./user.interface";

// export enum IsActive {
//     ACTIVE = "ACTIVE",
//     INACTIVE = "INACTIVE",
//     BLOCKED = "BLOCKED"
// }

export const createUserZodShema = z.object({
    name: z
        .string({
            error: (issue) => issue.input === undefined ?
                "This field is required" :
                "Not a string"
        })
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." }),

    email: z
        .string({
            error: (issue) => issue.input === undefined ?
                "Email is required" :
                "Email must be string"
        })
        .email()
        .min(5, { message: "Email must be at least 5 characters long." })
        .max(100, { message: "Email cannot exceed 100 characters." }),

    password: z
        .string({
            error: (issue) => issue.input === undefined ?
                "Password  is required" :
                "Password must be string"
        })
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, {
            message: "Password must contain at least 1 uppercase letter.",
        })
        .regex(/^(?=.*[!@#$%^&*])/, {
            message: "Password must contain at least 1 special character.",
        })
        .regex(/^(?=.*\d)/, {
            message: "Password must contain at least 1 number.",
        }),

    phone: z
        .string({
            error: (issue) => issue.input === undefined ?
                "Phone Number is required" :
                "Phone number must be string"
        })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
            message:
                "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
        })
        .optional(),

    address: z
        .string({
            error: (issue) => issue.input === undefined ?
                "Adress is required" :
                "Adress must be  string"
        })
        .max(200, { message: "Address cannot exceed 200 characters." })
        .optional(),
});


export const updateUserZodShema = z.object({
    //name
    name: z
        .string({
            error: (issue) => issue.input === undefined ?
                "This field is required" :
                "Not a string"
        })
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." })
        .optional(),
    //password
    password: z
        .string({
            error: (issue) => issue.input === undefined ?
                "Password  is required" :
                "Password must be string"
        })
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, {
            message: "Password must contain at least 1 uppercase letter.",
        })
        .regex(/^(?=.*[!@#$%^&*])/, {
            message: "Password must contain at least 1 special character.",
        })
        .regex(/^(?=.*\d)/, {
            message: "Password must contain at least 1 number.",
        })
        .optional(),
    //phone
    phone: z
        .string({
            error: (issue) => issue.input === undefined ?
                "Phone Number is required" :
                "Phone number must be string"
        })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
            message:
                "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
        })
        .optional(),
    //role
    role: z
        // .enum(["ADMIN", "GUIDE", "USER", "SUPER_ADMIN"])
        .enum(Object.values(Role) as [string])
        .optional(),
    //is asctive
    isActive: z
        .enum(Object.values(IsActive) as [string])
        .optional(),
    //is deleted
    isDeleted: z
        .boolean({
            error: (issue) => issue.input === undefined ?
                "This field is required" :
                "isVerified must be true or false"
        })
        .optional(),
    //is verrified
    isVerified: z
        .boolean({
            error: (issue) => issue.input === undefined ?
                "This field is required" :
                "isVerified must be true or false"
        })
        .optional(),
    //address
    address: z
        .string({
            error: (issue) => issue.input === undefined ?
                "Adress is required" :
                "Adress must be  string"
        })
        .max(200, { message: "Address cannot exceed 200 characters." })
        .optional(),
});