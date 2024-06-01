# this is a nextjs project with API integration testing
1. A form is build with proper validation with name, email ,phone no and price.

* after we click on the **make payment** button it saves the user details to the local DB and we proceed for further process to make payment.

* A window of razorpay is opened.

* after making the payment Paymentid  and orderid  signature are generated for varification.

* after verification  we are given option to make payment successful of fail.

* depending on that we are redirected  to a page confirming the successful payment

2. this is all happening just because of API provided by razorpay. this is valid for 24 hrs. these two **RAZORPAY_API_KEY** and **RAZORPAY_APT_SECRET**  are confidential as it is generated only for testing purpose after one create an account to razorpay.


