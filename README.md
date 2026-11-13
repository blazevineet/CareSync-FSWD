# CareSync – Full-Stack Microservices Healthcare Platform

A production-grade, full-stack healthcare web application built with **React (Vite + React Router)** and **Spring Boot Microservices**.

```
                           ┌──>  Doctor Service      (Port 8081)  ──>  H2 in-memory DB
                           │
React Client (Port 5173)   ├──>  User Service        (Port 8082)  ──>  MySQL / H2 (BCrypt Auth)
                           │
                           └──>  Appointment Service (Port 8083)  ──>  H2 in-memory DB
```

---

## 🚀 Microservices Architecture

| Service | Port | Database | Responsibilities | Endpoints |
|---|---|---|---|---|
| **caresync-react** | `5173` | Local Storage Sync | React 18, React Router 7, Multi-step booking, Telehealth, EHR, Admin portal | Frontend Client |
| **doctor-service** | `8081` | H2 (in-memory) | Doctor catalog, specialties, ratings, fees, schedules, bios | `GET, POST, PUT, DELETE /api/doctors` |
| **user-service** | `8082` | MySQL / H2 | User registration, BCrypt password hashing, authentication | `GET, POST /api/users`, `POST /api/users/login` |
| **appointment-service**| `8083` | H2 (in-memory) | Appointments booking, status management, rescheduling, clinic analytics | `GET, POST, PUT, DELETE /api/appointments` |

---

## 🌐 React Application Routes

| Path | Page Component | Key Functionalities |
|---|---|---|
| `/` | `HomePage` | Hero doctor search, clinical stats, specialties grid, top doctors spotlight, how it works stepper, telehealth promo, FAQ accordion |
| `/doctors` | `DoctorsPage` | Advanced filtering (search keyword, specialty, available today, 4.8+ rating, 10+ yrs exp, sorting, grid/list view toggle) |
| `/doctors/:id` | `DoctorDetailPage` | Detailed doctor bio, qualifications, consultation fee, clinic hours, patient reviews, and instant slot booking widget |
| `/book-appointment` | `BookAppointmentPage` | 4-step booking flow: Doctor selection, Date & Slot picker (14-day calendar), Patient info, Payment options, Confirmation receipt pass |
| `/appointments` | `AppointmentsPage` | Patient portal: Upcoming / Completed / Cancelled tabs, Reschedule modal, Cancel prompt, Digital Prescription slip modal, Telehealth video launcher |
| `/medical-records` | `MedicalRecordsPage` | Vital signs tracker (BP, Heart Rate, Glucose, SpO2) with logging modal, Diagnostic lab test reports, Active medication tracker |
| `/services` | `ServicesPage` | Clinical departments (Cardiology, Dermatology, Neurology, Pediatrics, Imaging, 24/7 Trauma) & accepted insurance network |
| `/about` | `AboutPage` | Hospital mission, quality standards, JCI / NABH / HIPAA accreditations, and multi-campus network directory |
| `/contact` | `ContactPage` | 24/7 Emergency Ambulance hotline, interactive inquiry submission form, campus operating hours and directions |
| `/login` | `LoginPage` | Authentication with 1-Click Demo Logins (`Demo Patient` & `Demo Doctor/Admin`), integrated with User Service (port 8082) |
| `/signup` | `SignupPage` | Account creation with form validation, BCrypt password encryption via User Service |
| `/profile` | `ProfilePage` | Patient health profile (blood group, emergency contact, residential address), saved appointments count |
| `/admin` | `AdminDashboardPage` | Doctor & Clinic Portal: KPI analytics (Revenue, Patients, Appointments), Add Doctor (POST :8081), Delete Doctor, Manage all appointments |
| `/telehealth/:id` | `TelehealthRoomPage` | Simulated HD Video Consultation: call timer, live doctor feed, patient camera/mic controls, in-call prescription chat |
| `*` | `NotFoundPage` | 404 fallback with quick navigation links |

---

## 🏃 Run Instructions (Terminal Order)

### 1. Doctor Service (Port 8081)
```powershell
cd doctor-service
mvn spring-boot:run
```
- API Endpoint: `http://localhost:8081/api/doctors`
- H2 Console: `http://localhost:8081/h2-console` (JDBC URL: `jdbc:h2:mem:doctordb`, user: `sa`, password: empty)

### 2. User Service (Port 8082)
**Option A: Run with MySQL (default)**
1. Open `user-service/src/main/resources/application.properties` and set your MySQL password.
2. Run:
```powershell
cd user-service
mvn spring-boot:run
```

**Option B: Run with H2 In-Memory (Zero MySQL dependency)**
```powershell
cd user-service
mvn spring-boot:run -Dspring-boot.run.profiles=h2
```
- API Endpoint: `http://localhost:8082/api/users`

### 3. Appointment Service (Port 8083)
```powershell
cd appointment-service
mvn spring-boot:run
```
- API Endpoint: `http://localhost:8083/api/appointments`
- Stats Endpoint: `http://localhost:8083/api/appointments/stats`
- H2 Console: `http://localhost:8083/h2-console` (JDBC URL: `jdbc:h2:mem:appointmentdb`, user: `sa`, password: empty)

### 4. React Frontend (Port 5173)
```powershell
cd caresync-react
npm install
npm run dev
```
- Open your browser at: `http://localhost:5173`

---

## 🧪 Quick Test Drive Credentials

You can log in manually or click the **1-Click Demo Buttons** on the `/login` page:

- **Patient Demo Account:**
  - Email: `priya@example.com`
  - Password: `DemoPass456`
  - Role: Patient (Access to My Appointments, Medical Records, Vitals Tracker, Booking)

- **Doctor & Admin Demo Account:**
  - Email: `rahul.sharma@caresync.com` (or click `Demo Doctor / Admin`)
  - Role: Doctor / Admin (Unlocks Admin Portal at `/admin` to add/delete doctors and manage all clinic appointments)
