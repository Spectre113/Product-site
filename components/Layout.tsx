"use client";
import "../src/css/normalize.css";
import "choices.js/public/assets/styles/choices.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/css/states.css";
import "../src/css/media.css";
import "../src/css/style.css";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
