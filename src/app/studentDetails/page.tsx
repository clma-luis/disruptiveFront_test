"use client"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import StudentDetailsModule from "@/modules/StudentDetailsModule"
import ValidateUser from "@/shared/hooks/useValidateUser"

const studentDetailsPage = () => {
  return (
    <ValidateUser>
      <main className="bg-background dark:bg-background pt-24">
        <Navbar />
        <StudentDetailsModule />
        <Footer />
      </main>
    </ValidateUser>
  )
}

export default studentDetailsPage