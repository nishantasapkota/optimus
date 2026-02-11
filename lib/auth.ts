import { getDatabase } from "./mongodb"
import type { ObjectId } from "mongodb"
import * as bcrypt from "bcryptjs"

export interface AdminUser {
  _id?: ObjectId
  email: string
  password: string
  name: string
  role: "admin" | "superadmin" | "content_writer"
  // when true, admin must change password on next login
  mustChangePassword?: boolean
  createdAt: Date
}

export async function verifyAdmin(email: string, password: string): Promise<AdminUser | null> {
  const db = await getDatabase()
  const admin = await db.collection<AdminUser>("admins").findOne({ email })
  if (!admin) return null

  const match = await bcrypt.compare(password, admin.password)
  return match ? admin : null
}

export async function getAdminByEmail(email: string): Promise<AdminUser | null> {
  const db = await getDatabase()
  const admin = await db.collection<AdminUser>("admins").findOne({ email })
  return admin
}

export async function createAdmin(adminData: Omit<AdminUser, "_id" | "createdAt">) {
  const db = await getDatabase()

  // Check if admin already exists
  const existingByEmail = await getAdminByEmail(adminData.email)
  if (existingByEmail) {
    throw new Error("Admin with this email already exists")
  }

  // Prevent creating a second admin if any admin/superadmin already exists
  const anyAdmin = await db.collection<AdminUser>('admins').findOne({})
  if (anyAdmin) {
    throw new Error('An admin already exists. Only one admin account is allowed.')
  }

  // hash password
  const toInsert: any = { ...adminData }
  if (toInsert.password) {
    toInsert.password = await bcrypt.hash(toInsert.password, 10)
  }
  // require non-superadmin admins to change password on first login unless explicitly set
  if (typeof toInsert.mustChangePassword === 'undefined' && toInsert.role !== 'superadmin') {
    toInsert.mustChangePassword = true
  }

  const result = await db.collection<AdminUser>("admins").insertOne({
    ...toInsert,
    createdAt: new Date(),
  })

  return result
}

// Generic user verification (users collection) - used for app login
export async function verifyUser(email: string, password: string) {
  const db = await getDatabase()

  const user = await db.collection("users").findOne({ email })
  if (!user) return null

  const match = await bcrypt.compare(password, (user as any).password)
  return match ? user : null
}

export async function getUserByEmail(email: string) {
  const db = await getDatabase()
  const user = await db.collection("users").findOne({ email })
  return user
}
