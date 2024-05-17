"use client"
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import DetailsModule from "@/modules/DetailsModule";
import ValidateUser from "@/shared/hooks/useValidateUser";
import React from "react";

const DetailsPage = () => {
  return (
    <ValidateUser>
      <main className="bg-background dark:bg-background pt-24">
        <Navbar />
        <DetailsModule />
        <Footer />
      </main>
    </ValidateUser>
  );
};

export default DetailsPage;
