import Razorpay from "razorpay";

// Replace with your actual Razorpay Key ID and Key Secret
const razorpay = new Razorpay({
  key_id: "re_HmvNGGAz_KKBQY24ewBLMi3fXE3GnhpDR", // updated API key
  key_secret: "gnXguBSM8RDG54KHJxuiuEG1", // keep your real secret here
});

export const createRazorpayOrder = async (amount: number, currency: string, receipt: string, email?: string) => {
  const options = {
    amount: amount, // amount in the smallest currency unit
    currency: currency,
    receipt: receipt,
    notes: {
      notification_email: "vroomvisionx.gmail.com", // notify this email on order
      ...(email ? { buyer_email: email } : {})
    },
  };

  try {
    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw error;
  }
};
