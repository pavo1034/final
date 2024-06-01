"use client";
import React, { Suspense } from "react";
import UseForm from "./UseForm";
import Loading from "@/app/loading";

const BuyProduct = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <UseForm />
      </Suspense>
    </>
  );
};

export default BuyProduct;
