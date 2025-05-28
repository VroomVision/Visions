import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Send } from "lucide-react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const reviewSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  comment: z.string().min(5, "Comment must be at least 5 characters"),
  rating: z.number().min(1, "Please select a rating").max(5)
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

const ReviewForm: React.FC = () => {
  const { toast } = useToast();
  
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: "",
      email: "",
      comment: "",
      rating: 0
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: ReviewFormValues) => {
      const response = await apiRequest("POST", "/api/reviews", data);
      if (!response.ok) {
        throw new Error("Failed to submit review");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
        variant: "default"
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit review",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: ReviewFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto bg-brand-gray p-6 rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John Doe" 
                      className="bg-brand-dark border border-zinc-700 rounded-md" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="your@email.com" 
                      className="bg-brand-dark border border-zinc-700 rounded-md" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Comment</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Share your experience with us..." 
                    className="bg-brand-dark border border-zinc-700 rounded-md" 
                    rows={4}
                    {...field} 
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Rating</FormLabel>
                <FormControl>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map(rating => (
                      <Button
                        key={rating}
                        type="button"
                        variant="ghost"
                        className={`p-1 ${rating <= field.value ? "text-yellow-400" : "text-gray-500"}`}
                        onClick={() => field.onChange(rating)}
                      >
                        <Star className="w-6 h-6 fill-current" />
                      </Button>
                    ))}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="bg-purple-500 hover:bg-purple-600 text-white w-full py-2 rounded-md font-medium flex items-center justify-center"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Submitting..." : (
              <>Submit Comment <Send className="ml-2 w-4 h-4" /></>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ReviewForm;
