"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

const Success = () => {
  const searchParams = useSearchParams();
  const paymentid = searchParams.get("paymentid");

  return (
    <div className="success">
      <div className="successblock">
        <span>
          Payment successful !!&nbsp;&nbsp;Your paymentID= {paymentid} has been
          processed.
        </span>
      </div>
      <div className="footer">
      <div className="regard"><span>Kind &nbsp;&nbsp;regards&nbsp;&nbsp;🙏🙏🙏</span></div>
      <div className="owner">Pawan Kumar</div>
      </div>
    </div>
  );
};

export default Success;
