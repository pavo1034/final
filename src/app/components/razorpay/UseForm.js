"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const UseForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const makePayment = async (formdata) => {

    console.log(formdata);

    const key = process.env.RAZORPAY_API_KEY;

    console.log(key);

    const object = JSON.stringify(formdata)
  
    const data = await fetch("http://localhost:3000/api/razorpay", {
      method: "POST",
      body: object,
    });

    const { order } = await data.json();

    const options = {
      key: key,
      name: formdata.name,
      currency: order.currency,
      amount: order.amount,
      order_id: order.id,
      description: "testing for project purpose",
      handler: async function (response) {
        const data = await fetch("http://localhost:3000/api/paymentverify", {
          method: "POST",
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });

        const res = await data.json();

        console.log("response verify==", res);

        if (res?.message == "success") {
          console.log("redirected.......");
          router.push(
            "/paymentsuccess?paymentid=" + response.razorpay_payment_id
          );
        }
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: formdata.name,
        email: formdata.email,
        contact: formdata.phoneNo,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      alert("Payment failed. Please try again. Contact support for help");
    });
  };

  return (
    <>
      <div className="form">
        <form onSubmit={handleSubmit(makePayment)}>
          <div className="formcontainer">
            <div className="title">
              <h3>The Holiday Hub</h3>
            </div>
            <div className="formbody">
              <div className="name">
                <input
                  type=" text"
                  placeholder=""
                  {...register("name", { required: true, minLength: 5 })}
                />
                <span>Name</span>
                {errors.name?.type == "required" && <p>Name Id required</p>}
                {errors.name?.type == "minLength" && (
                  <p>Minimun 5 character is required</p>
                )}
              </div>
              <div className="email">
                <input
                  type="email"
                  placeholder=""
                  {...register("email", { required: true })}
                />
                <span>Email</span>
                {errors.email?.type == "required" && <p>Email Id required</p>}
              </div>

              <div className="phoneNo">
                <input
                  type="text"
                  placeholder=""
                  {...register("phoneNo", {
                    required: true,
                    minLength: 10,
                    maxLength: 11,
                  })}
                />
                <span>Phone_no</span>
                {errors.phoneNo?.type == "required" && <p>Enter Phone_No </p>}
                {errors.phoneNo?.type == "minLength" && (
                  <p>Enter valid phone no </p>
                )}
                {errors.phoneNo?.type == "maxLength" && (
                  <p>Enter valid phone no </p>
                )}
              </div>
              <div className="price">
                <input
                  type="number"
                  placeholder=""
                  {...register("price", { required: true, min: 1 })}
                />
                <span>Price</span>
                {errors.price?.type == "required" && <p>Enter price </p>}
                {errors.price?.type == "min" && <p>Enter price more than 0 </p>}
              </div>
              <div className="submit">
                <button className="submitbtn" type="submit">
                  make payment
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UseForm;
