import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface NewsletterProps {
  variant?: "default" | "alternative";
  className?: string;
}

const Newsletter: React.FC<NewsletterProps> = ({ 
  variant = "default",
  className = "", 
}) => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/subscribe", { email });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to subscribe");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "You've been successfully subscribed to our newsletter.",
        variant: "default"
      });
      setEmail("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to subscribe",
        variant: "destructive"
      });
    }
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    
    mutation.mutate(email);
  };

  if (variant === "alternative") {
    return (
      <div className={`bg-brand-dark rounded-lg ${className}`}>
        <div className="flex flex-col md:flex-row justify-between items-center p-0">
          {/* Removed newsletter form */}
        </div>
      </div>
    );
  }

  return (
    <section className={`bg-brand-gray border-t border-zinc-800 ${className}`}>
      <div className="container px-0">
        <div className="flex flex-col md:flex-row justify-between items-center p-0">
          {/* Removed newsletter heading and description */}
          {/* Removed newsletter form */}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
