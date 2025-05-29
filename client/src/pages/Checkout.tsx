import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";

const Checkout: React.FC = () => {
  const [, navigate] = useLocation();
  const { cart, removeFromCart, getTotalPrice, clearCart, updateQuantity } = useCart();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'cancelled' | 'failed'>('idle');

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
  };

  const handleRazorpayPayment = async () => {
    if (!email) {
      toast({
        title: "Missing information",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setPaymentStatus('processing');

    try {
      // Create order on backend (should be a real API call)
      const orderResponse = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: getTotalPrice(), // amount in paise
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
          email,
        }),
      });
      const orderData = await orderResponse.json();
      if (!orderResponse.ok) throw new Error(orderData.message || "Order creation failed");

      const options = {
        key: "rzp_test_myXHywY5WTMuIg",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Vroom Visions",
        description: "Product Purchase",
        order_id: orderData.id,
        handler: function (response: any) {
          setPaymentStatus('idle'); // Payment successful, reset status
          toast({
            title: "Payment successful",
            description: "Your order has been processed successfully",
            variant: "default",
          });
          clearCart();
          // Navigate to success page and pass email
          navigate(`/payment-success?email=${encodeURIComponent(email)}`);
        },
        prefill: {
          email,
        },
        notes: {},
        theme: { color: "#a259ff" },
        callback_url: "https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTY4MDYzMTA0MzI1MjZkNTUzMTUxMzYi_pc"
      };
      // @ts-ignore
      const rzp = new window.Razorpay(options);

      rzp.on('modal.close', function() {
        console.log('Razorpay modal closed. Setting paymentStatus to idle.');
        setPaymentStatus('idle'); // Payment cancelled, reset status
        toast({
          title: "Payment cancelled",
          description: "You have closed the payment window.",
          variant: "destructive",
        });
      });

      rzp.open();
    } catch (error: any) {
      console.error('Razorpay payment failed.', error);
      setPaymentStatus('idle'); // Payment failed, reset status
      toast({
        title: "Payment failed",
        description: error.message || "Payment could not be processed",
        variant: "destructive",
      });
    }
  };

  const totalPrice = getTotalPrice();
  const formattedTotal = (totalPrice / 100).toFixed(2);

  const getButtonText = () => {
    switch (paymentStatus) {
      case 'processing':
        return (
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </div>
        );
      case 'cancelled':
        return "Payment Cancelled";
      case 'failed':
        return "Payment Failed";
      default:
        return "Buy";
    }
  };

  return (
    <>
      {/* Main background wrapper - fixed position to cover entire viewport */}
      <div className="fixed inset-0 z-[-1]">
        {/* Video background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-[1]"></div> {/* Adjusted overlay */}
          <video 
            className="absolute top-0 left-0 min-w-full min-h-full object-cover opacity-80" // Adjusted opacity
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src="/videos/blackhole.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Stars overlays - three layers for parallax effect */}
        <div className="absolute inset-0 z-[2] stars stars-large opacity-70"></div>
        <div className="absolute inset-0 z-[2] stars opacity-60"></div>
        <div className="absolute inset-0 z-[2] stars stars-small opacity-60"></div>
      </div>
      
      <motion.section 
        className="relative py-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-6">
            <Link href="/">
              <a className="text-gray-400 hover:text-white flex items-center">
                <ArrowLeft className="mr-2 w-4 h-4" /> Continue shopping
              </a>
            </Link>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-8">Checkout</h1>
          
          {cart.length === 0 ? (
            <div className="bg-purple-900/20 backdrop-blur-md p-6 rounded-lg text-center shadow-glow border border-white/10">
              <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-gray-400 mb-6">Looks like you haven't added anything to your cart yet.</p>
              <Button 
                className="bg-purple-600/70 hover:bg-purple-600 shadow-glow border border-white/10"
                onClick={() => navigate("/")}
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Order Summary - now spans 2 columns on medium screens */}
              <div className="md:col-span-2">
                <div className="bg-purple-900/20 backdrop-blur-md p-6 rounded-lg shadow-glow border border-white/10 sticky top-20">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  
                  <div className="border-b border-white/10 pb-4 mb-4">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex mb-4 p-2 rounded-lg bg-purple-950/40 backdrop-blur-sm border border-white/5">
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name} 
                          className="w-20 h-20 rounded object-cover border border-white/10"
                        />
                        <div className="ml-3 flex-1">
                          <h3 className="font-medium">{item.product.name}</h3>
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            Qty:
                            <button
                              className="px-2 py-0.5 rounded bg-purple-950/60 border border-white/10 text-white hover:bg-purple-900/80 transition"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="px-2">{item.quantity}</span>
                            <button
                              className="px-2 py-0.5 rounded bg-purple-950/60 border border-white/10 text-white hover:bg-purple-900/80 transition"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <div className="font-medium mt-1 text-white">${((item.product.price * item.quantity) / 100).toFixed(2)}</div>
                        </div>
                        <button 
                          className="ml-auto text-gray-400 hover:text-white hover:bg-red-500/20 p-1 rounded-full transition-colors"
                          onClick={() => handleRemoveItem(item.product.id)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2 text-sm mb-4 p-3 rounded-lg bg-purple-950/40 backdrop-blur-sm border border-white/5">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium">${formattedTotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes</span>
                      <span>Calculated at next step</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between font-bold text-lg p-3 rounded-lg bg-purple-950/40 backdrop-blur-sm border border-white/5 mt-4">
                    <span>Total</span>
                    <span className="text-white">${formattedTotal}</span>
                  </div>
                  
                  <div className="mt-4 text-xs text-gray-400">
                    By confirming your payment, you allow AEJuice LLC to charge you for this payment and future payments in accordance with their terms.
                  </div>
                </div>
              </div>
              {/* Contact Information - now spans 1 column on medium screens */}
              <div className="md:col-span-1 space-y-6">
                <div className="bg-purple-900/20 backdrop-blur-md p-6 rounded-lg shadow-glow border border-white/10">
                  <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                  <div className="mb-4">
                    <Label htmlFor="checkout-email" className="block text-sm font-medium mb-1">Email</Label>
                    <Input 
                      type="email" 
                      id="checkout-email" 
                      placeholder="your@email.com" 
                      className="w-full bg-purple-950/40 backdrop-blur-md border border-white/10 rounded-md px-4 py-2 focus:border-purple-500/50 shadow-glow" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button 
                    className="w-full bg-purple-600/70 hover:bg-purple-600 text-white py-3 rounded-md font-medium shadow-glow border border-white/10 mt-4" 
                    onClick={handleRazorpayPayment}
                    disabled={paymentStatus === 'processing'}
                  >
                    {getButtonText()}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.section>
    </>
  );
};

export default Checkout;
