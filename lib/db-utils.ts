import { getDatabase } from "./mongodb"
import { ObjectId } from "mongodb"
import * as bcrypt from "bcryptjs"

export interface User {
  _id?: ObjectId
  name: string
  email: string
  // allow admin, user, moderator, and content_writer for backwards compatibility
  role: "admin" | "user" | "moderator" | "content_writer"
  // optional password field so users can authenticate
  password?: string
  // when true, user must set a new password on next login (first-time or admin-forced)
  mustChangePassword?: boolean
  status: "active" | "inactive"
  createdAt: Date
  updatedAt: Date
}

export interface Activity {
  _id?: ObjectId
  userId: ObjectId
  action: string
  description: string
  timestamp: Date
}

export interface Stats {
  totalUsers: number
  activeUsers: number
  totalRevenue: number
  totalOrders: number
}

// User operations
export async function getUsers(limit = 10, skip = 0) {
  const db = await getDatabase()
  const users = await db.collection<User>("users").find().sort({ createdAt: -1 }).limit(limit).skip(skip).toArray()
  return users
}

export async function getUserById(id: string) {
  const db = await getDatabase()
  const user = await db.collection<User>("users").findOne({ _id: new ObjectId(id) })
  return user
}

export async function createUser(userData: Omit<User, "_id" | "createdAt" | "updatedAt">) {
  const db = await getDatabase()
  // Hash password before saving. If no password provided, skip.
  const toInsert: any = { ...userData }
  if (toInsert.password) {
    toInsert.password = await bcrypt.hash(toInsert.password, 10)
  }
  // If creating a user without an explicit mustChangePassword flag, require a password change on first login
  if (typeof toInsert.mustChangePassword === 'undefined') {
    toInsert.mustChangePassword = true
  }
  const result = await db.collection<User>("users").insertOne({
    ...toInsert,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return result
}

export async function updateUser(id: string, userData: Partial<User>) {
  const db = await getDatabase()
  const updatePayload: any = { ...userData }
  if (updatePayload.password) {
    // hash password before updating
    updatePayload.password = await bcrypt.hash(updatePayload.password, 10)
    // when password is updated through admin or reset flow, clear mustChangePassword
    updatePayload.mustChangePassword = false
  }
  const result = await db
    .collection<User>("users")
    .updateOne({ _id: new ObjectId(id) }, { $set: { ...updatePayload, updatedAt: new Date() } })
  return result
}

export async function deleteUser(id: string) {
  const db = await getDatabase()
  const result = await db.collection<User>("users").deleteOne({ _id: new ObjectId(id) })
  return result
}

// Activity operations
export async function getRecentActivities(limit = 10) {
  const db = await getDatabase()
  const activities = await db.collection<Activity>("activities").find().sort({ timestamp: -1 }).limit(limit).toArray()
  return activities
}

export async function createActivity(activityData: Omit<Activity, "_id">) {
  const db = await getDatabase()
  const result = await db.collection<Activity>("activities").insertOne(activityData)
  return result
}

// Stats operations
export async function getStats(): Promise<Stats> {
  const db = await getDatabase()

  const totalUsers = await db.collection("users").countDocuments()
  const activeUsers = await db.collection("users").countDocuments({ status: "active" })

  // Mock data for revenue and orders - replace with actual collections
  const totalRevenue = 45231.89
  const totalOrders = 2350

  return {
    totalUsers,
    activeUsers,
    totalRevenue,
    totalOrders,
  }
}

// Blog and Service interfaces and CRUD operations

export interface Blog {
  _id?: ObjectId
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
  status: "draft" | "published" | "archived"
  featuredImage?: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
}

export interface Service {
  _id?: ObjectId
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  currency: string
  status: "active" | "inactive"
  category: string
  features: string[]
  icon?: string
  createdAt: Date
  updatedAt: Date
}

export interface Course {
  _id?: ObjectId
  name: string
  slug: string
  description: string
  shortDescription: string
  status: "active" | "inactive"
  category: string
  highlights?: string[]
  icon?: string
  createdAt: Date
  updatedAt: Date
}

// Blog operations
export async function getBlogs(limit = 10, skip = 0, search = "") {
  const db = await getDatabase()
  const query = search
    ? {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ],
    }
    : {}
  const blogs = await db.collection<Blog>("blogs").find(query).sort({ createdAt: -1 }).limit(limit).skip(skip).toArray()
  return blogs
}

export async function getBlogById(id: string) {
  const db = await getDatabase()
  const blog = await db.collection<Blog>("blogs").findOne({ _id: new ObjectId(id) })
  return blog
}

export async function getBlogsCount(search = "") {
  const db = await getDatabase()
  const query = search
    ? {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ],
    }
    : {}
  return await db.collection<Blog>("blogs").countDocuments(query)
}

export async function getBlogBySlug(slug: string) {
  const db = await getDatabase()
  const blog = await db.collection<Blog>("blogs").findOne({ slug })
  return blog
}

export async function createBlog(blogData: Omit<Blog, "_id" | "createdAt" | "updatedAt">) {
  const db = await getDatabase()
  const result = await db.collection<Blog>("blogs").insertOne({
    ...blogData,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return result
}

export async function updateBlog(id: string, blogData: Partial<Blog>) {
  const db = await getDatabase()
  const result = await db
    .collection<Blog>("blogs")
    .updateOne({ _id: new ObjectId(id) }, { $set: { ...blogData, updatedAt: new Date() } })
  return result
}

export async function deleteBlog(id: string) {
  const db = await getDatabase()
  const result = await db.collection<Blog>("blogs").deleteOne({ _id: new ObjectId(id) })
  return result
}

// Course operations
export async function getCourses(limit = 10, skip = 0, search = "") {
  const db = await getDatabase()
  const query = search
    ? {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    }
    : {}
  const courses = await db
    .collection<Course>("courses")
    .find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .toArray()
  return courses
}

export async function getCoursesCount(search = "") {
  const db = await getDatabase()
  const query = search
    ? {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    }
    : {}
  return await db.collection<Course>("courses").countDocuments(query)
}

export async function getCourseById(id: string) {
  const db = await getDatabase()
  const course = await db.collection<Course>("courses").findOne({ _id: new ObjectId(id) })
  return course
}

export async function getCourseBySlug(slug: string) {
  const db = await getDatabase()
  const course = await db.collection<Course>("courses").findOne({ slug })
  return course
}

export async function createCourse(courseData: Omit<Course, "_id" | "createdAt" | "updatedAt">) {
  const db = await getDatabase()
  const result = await db.collection<Course>("courses").insertOne({
    ...courseData,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return result
}

export async function updateCourse(id: string, courseData: Partial<Course>) {
  const db = await getDatabase()
  const result = await db
    .collection<Course>("courses")
    .updateOne({ _id: new ObjectId(id) }, { $set: { ...courseData, updatedAt: new Date() } })
  return result
}

export async function deleteCourse(id: string) {
  const db = await getDatabase()
  const result = await db.collection<Course>("courses").deleteOne({ _id: new ObjectId(id) })
  return result
}

// Service operations
export async function getServices(limit = 10, skip = 0, search = "") {
  const db = await getDatabase()
  const query = search
    ? {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    }
    : {}
  const services = await db
    .collection<Service>("services")
    .find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .toArray()
  return services
}

export async function getServicesCount(search = "") {
  const db = await getDatabase()
  const query = search
    ? {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    }
    : {}
  return await db.collection<Service>("services").countDocuments(query)
}

export async function getServiceById(id: string) {
  const db = await getDatabase()
  const service = await db.collection<Service>("services").findOne({ _id: new ObjectId(id) })
  return service
}

export async function getServiceBySlug(slug: string) {
  const db = await getDatabase()
  const service = await db.collection<Service>("services").findOne({ slug })
  return service
}

export async function createService(serviceData: Omit<Service, "_id" | "createdAt" | "updatedAt">) {
  const db = await getDatabase()
  const result = await db.collection<Service>("services").insertOne({
    ...serviceData,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return result
}

export async function updateService(id: string, serviceData: Partial<Service>) {
  const db = await getDatabase()
  const result = await db
    .collection<Service>("services")
    .updateOne({ _id: new ObjectId(id) }, { $set: { ...serviceData, updatedAt: new Date() } })
  return result
}

export async function deleteService(id: string) {
  const db = await getDatabase()
  const result = await db.collection<Service>("services").deleteOne({ _id: new ObjectId(id) })
  return result
}

// Appointment interface and CRUD operations
export interface Appointment {
  _id?: ObjectId
  name: string
  email: string
  phone: string
  service: string
  preferredDate: Date
  preferredTime: string
  message?: string
  status: "pending" | "approved" | "rejected" | "completed"
  createdAt: Date
  updatedAt: Date
  reviewedAt?: Date
  reviewedBy?: string
}

// Appointment operations
export async function getAppointments(limit = 50, skip = 0) {
  const db = await getDatabase()
  const appointments = await db
    .collection<Appointment>("appointments")
    .find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .toArray()
  return appointments
}

export async function getAppointmentById(id: string) {
  const db = await getDatabase()
  const appointment = await db.collection<Appointment>("appointments").findOne({ _id: new ObjectId(id) })
  return appointment
}

export async function createAppointment(appointmentData: Omit<Appointment, "_id" | "createdAt" | "updatedAt">) {
  const db = await getDatabase()
  const result = await db.collection<Appointment>("appointments").insertOne({
    ...appointmentData,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return result
}

export async function updateAppointment(id: string, appointmentData: Partial<Appointment>) {
  const db = await getDatabase()
  const result = await db
    .collection<Appointment>("appointments")
    .updateOne({ _id: new ObjectId(id) }, { $set: { ...appointmentData, updatedAt: new Date() } })
  return result
}

export async function deleteAppointment(id: string) {
  const db = await getDatabase()
  const result = await db.collection<Appointment>("appointments").deleteOne({ _id: new ObjectId(id) })
  return result
}

// Media interface and operations
export interface Media {
  _id?: ObjectId
  fileName: string
  originalName: string
  url: string
  size: number
  mimeType: string
  alt?: string
  caption?: string
  createdAt: Date
  updatedAt: Date
}

// Media operations
export async function getMediaFiles(limit = 50, skip = 0) {
  const db = await getDatabase()
  const media = await db.collection<Media>("media").find().sort({ createdAt: -1 }).limit(limit).skip(skip).toArray()
  return media
}

export async function getMediaById(id: string) {
  const db = await getDatabase()
  const media = await db.collection<Media>("media").findOne({ _id: new ObjectId(id) })
  return media
}

export async function createMedia(mediaData: Omit<Media, "_id" | "createdAt" | "updatedAt">) {
  const db = await getDatabase()
  const result = await db.collection<Media>("media").insertOne({
    ...mediaData,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return result
}

export async function updateMedia(id: string, mediaData: Partial<Media>) {
  const db = await getDatabase()
  const result = await db
    .collection<Media>("media")
    .updateOne({ _id: new ObjectId(id) }, { $set: { ...mediaData, updatedAt: new Date() } })
  return result
}

export async function deleteMedia(id: string) {
  const db = await getDatabase()
  const result = await db.collection<Media>("media").deleteOne({ _id: new ObjectId(id) })
  return result
}

// Student Counseling interface and operations
export interface StudentCounseling {
  _id?: ObjectId
  howDidYouKnow?: string
  referredBy?: string
  fullName: string
  contact: string
  email: string
  address?: string
  interestedCountry?: string
  university?: string
  intake?: string
  interestedCourse?: string
  lastAcademicQualification?: string
  academicScores?: string
  englishTest?: string
  englishScores?: string
  passedYear?: string
  yearIntake?: string
  status: "pending" | "contacted" | "in-progress" | "completed" | "rejected"
  createdAt: Date
  updatedAt: Date
}

// Student Counseling operations
export async function getStudentCounselings(limit = 50, skip = 0) {
  const db = await getDatabase()
  const counselings = await db
    .collection<StudentCounseling>("student_counseling")
    .find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .toArray()
  return counselings
}

export async function getStudentCounselingById(id: string) {
  const db = await getDatabase()
  const counseling = await db.collection<StudentCounseling>("student_counseling").findOne({ _id: new ObjectId(id) })
  return counseling
}

export async function createStudentCounseling(counselingData: Omit<StudentCounseling, "_id" | "createdAt" | "updatedAt">) {
  const db = await getDatabase()
  const result = await db.collection<StudentCounseling>("student_counseling").insertOne({
    ...counselingData,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return result
}

export async function updateStudentCounseling(id: string, counselingData: Partial<StudentCounseling>) {
  const db = await getDatabase()
  const result = await db
    .collection<StudentCounseling>("student_counseling")
    .updateOne({ _id: new ObjectId(id) }, { $set: { ...counselingData, updatedAt: new Date() } })
  return result
}

export async function deleteStudentCounseling(id: string) {
  const db = await getDatabase()
  const result = await db.collection<StudentCounseling>("student_counseling").deleteOne({ _id: new ObjectId(id) })
  return result
}

// Online Application interface and operations
export interface OnlineApplication {
  _id?: ObjectId
  fullName: string
  contact: string
  email: string
  address?: string
  interestedCountry?: string
  university?: string
  intake?: string
  interestedCourse?: string
  lastAcademicQualification?: string
  academicScores?: string
  englishTest?: string
  englishScores?: string
  passedYear?: string
  yearIntake?: string
  documents: {
    masterDegree?: string
    bachelorsDegree?: string
    diploma?: string
    grade12?: string
    cv?: string
    passport?: string
    ielts?: string
    oxfordELLT?: string
    others?: string
  }
  status: "pending" | "under-review" | "approved" | "rejected"
  createdAt: Date
  updatedAt: Date
}

// Online Application operations
export async function getOnlineApplications(limit = 50, skip = 0) {
  const db = await getDatabase()
  const applications = await db
    .collection<OnlineApplication>("online_applications")
    .find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .toArray()
  return applications
}

export async function getOnlineApplicationById(id: string) {
  const db = await getDatabase()
  const application = await db.collection<OnlineApplication>("online_applications").findOne({ _id: new ObjectId(id) })
  return application
}

export async function createOnlineApplication(applicationData: Omit<OnlineApplication, "_id" | "createdAt" | "updatedAt">) {
  const db = await getDatabase()
  const result = await db.collection<OnlineApplication>("online_applications").insertOne({
    ...applicationData,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return result
}

export async function updateOnlineApplication(id: string, applicationData: Partial<OnlineApplication>) {
  const db = await getDatabase()
  const result = await db
    .collection<OnlineApplication>("online_applications")
    .updateOne({ _id: new ObjectId(id) }, { $set: { ...applicationData, updatedAt: new Date() } })
  return result
}

export async function deleteOnlineApplication(id: string) {
  const db = await getDatabase()
  const result = await db.collection<OnlineApplication>("online_applications").deleteOne({ _id: new ObjectId(id) })
  return result
}

// Testimonial interface and operations
export interface Testimonial {
  _id?: ObjectId
  name: string
  designation: string
  description: string
  image: string
  createdAt: Date
  updatedAt: Date
}

// Testimonial operations
export async function getTestimonials(limit = 100, skip = 0) {
  const db = await getDatabase()
  const testimonials = await db
    .collection<Testimonial>("testimonials")
    .find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .toArray()
  return testimonials
}

export async function getTestimonialById(id: string) {
  const db = await getDatabase()
  const testimonial = await db.collection<Testimonial>("testimonials").findOne({ _id: new ObjectId(id) })
  return testimonial
}

export async function createTestimonial(testimonialData: Omit<Testimonial, "_id" | "createdAt" | "updatedAt">) {
  const db = await getDatabase()
  const result = await db.collection<Testimonial>("testimonials").insertOne({
    ...testimonialData,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return result
}

export async function updateTestimonial(id: string, testimonialData: Partial<Testimonial>) {
  const db = await getDatabase()
  const result = await db
    .collection<Testimonial>("testimonials")
    .updateOne({ _id: new ObjectId(id) }, { $set: { ...testimonialData, updatedAt: new Date() } })
  return result
}

export async function deleteTestimonial(id: string) {
  const db = await getDatabase()
  const result = await db.collection<Testimonial>("testimonials").deleteOne({ _id: new ObjectId(id) })
  return result
}

// Event interface and operations
export interface Event {
  _id?: ObjectId
  title: string
  description: string
  image: string
  date?: string
  location?: string
  status: "active" | "inactive"
  createdAt: Date
  updatedAt: Date
}

export interface EventRegistration {
  _id?: ObjectId
  eventId: ObjectId
  fullName: string
  contact: string
  email: string
  address?: string
  createdAt: Date
}

// Event operations
export async function getEvent() {
  const db = await getDatabase()
  const event = await db.collection<Event>("events").findOne({})
  return event
}

export async function upsertEvent(eventData: Omit<Event, "_id" | "createdAt" | "updatedAt">) {
  const db = await getDatabase()
  const existingEvent = await db.collection<Event>("events").findOne({})

  if (existingEvent) {
    const result = await db.collection<Event>("events").updateOne(
      { _id: existingEvent._id },
      {
        $set: {
          ...eventData,
          updatedAt: new Date()
        }
      }
    )
    return result
  } else {
    const result = await db.collection<Event>("events").insertOne({
      ...eventData,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Event)
    return result
  }
}

// Registration operations
export async function createEventRegistration(registrationData: Omit<EventRegistration, "_id" | "createdAt" | "eventId"> & { eventId: string }) {
  const db = await getDatabase()
  const result = await db.collection<EventRegistration>("event_registrations").insertOne({
    ...registrationData,
    eventId: new ObjectId(registrationData.eventId),
    createdAt: new Date(),
  } as EventRegistration)
  return result
}

export async function getEventRegistrations(eventId?: string) {
  const db = await getDatabase()
  const filter = eventId ? { eventId: new ObjectId(eventId) } : {}
  const registrations = await db
    .collection<EventRegistration>("event_registrations")
    .find(filter)
    .sort({ createdAt: -1 })
    .toArray()
  return registrations
}

// Business Details interface and operations
export interface BusinessDetails {
  _id?: ObjectId
  name: string
  logo?: string
  address: string
  emails: string[]
  phones: string[]
  socialLinks: {
    facebook?: string
    twitter?: string
    linkedin?: string
    instagram?: string
    youtube?: string
  }
  updatedAt: Date
}

export async function getBusinessDetails() {
  const db = await getDatabase()
  const details = await db.collection<BusinessDetails>("business_details").findOne({})
  return details
}

export async function updateBusinessDetails(detailsData: Omit<BusinessDetails, "_id" | "updatedAt">) {
  const db = await getDatabase()
  const existing = await db.collection<BusinessDetails>("business_details").findOne({})

  if (existing) {
    const result = await db.collection<BusinessDetails>("business_details").updateOne(
      { _id: existing._id },
      {
        $set: {
          ...detailsData,
          updatedAt: new Date()
        }
      }
    )
    return result
  } else {
    const result = await db.collection<BusinessDetails>("business_details").insertOne({
      ...detailsData,
      updatedAt: new Date(),
    } as BusinessDetails)
    return result
  }
}

// Partner interface and operations
export interface Partner {
  _id?: ObjectId
  name: string
  logo: string
  website?: string
  order?: number
  createdAt: Date
}

export async function getPartners() {
  const db = await getDatabase()
  return await db
    .collection<Partner>("partners")
    .find({})
    .sort({ order: 1, createdAt: -1 })
    .toArray()
}

export async function createPartner(partner: Omit<Partner, "_id" | "createdAt">) {
  const db = await getDatabase()
  return await db.collection<Partner>("partners").insertOne({
    ...partner,
    createdAt: new Date()
  } as Partner)
}

export async function deletePartner(id: string) {
  const db = await getDatabase()
  return await db.collection<Partner>("partners").deleteOne({ _id: new ObjectId(id) })
}// BOD Member interface and operations
export interface BODMember {
  _id?: ObjectId
  name: string
  role: string
  image: string
  level: number // 1 for top primary (Chairman/MD), 2 for second level, etc.
  socials?: {
    mail?: string
    linkedin?: string
    facebook?: string
    twitter?: string
  }
  createdAt: Date
  updatedAt: Date
}

export async function getBODMembers() {
  const db = await getDatabase()
  return await db
    .collection<BODMember>("bod_members")
    .find({})
    .sort({ level: 1, createdAt: 1 })
    .toArray()
}

export async function createBODMember(member: Omit<BODMember, "_id" | "createdAt" | "updatedAt">) {
  const db = await getDatabase()
  return await db.collection<BODMember>("bod_members").insertOne({
    ...member,
    createdAt: new Date(),
    updatedAt: new Date()
  } as BODMember)
}

export async function updateBODMember(id: string, member: Partial<BODMember>) {
  const db = await getDatabase()
  return await db.collection<BODMember>("bod_members").updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...member, updatedAt: new Date() } }
  )
}

export async function deleteBODMember(id: string) {
  const db = await getDatabase()
  return await db.collection<BODMember>("bod_members").deleteOne({ _id: new ObjectId(id) })
}
