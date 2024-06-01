import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";
import DBconnect from "@/app/mongoDB/DBconnection";
import User from "@/app/mongoDB/models/user";

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
  });


export async function POST(req) {
   
    const body =  await req.json();
    await DBconnect();
    await User.create(body);
    const price = Number(body.price)*100;
    const payment_capture = 1;
    const amount = 1 * price; 
    const currency = "INR";
    const options = {
        amount: (amount).toString(),
        currency,
        receipt: shortid.generate(),
        payment_capture,
        notes: {
            paymentFor: "testingDemo",
            userId: "100",
            productId: 'P100'
        }
    };

   const order = await instance.orders.create(options);
  return NextResponse.json({ msg: "success",order });
}



