export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  comment: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "James Rodriguez",
    role: "Car Photographer",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
    rating: 5,
    comment: "VroomVisionX transformed my automotive portfolio. Their color grading brought a consistent, professional look to my work that has helped me land major clients. Worth every penny!"
  },
  {
    id: 2,
    name: "Emma Johnson",
    role: "Automotive Influencer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
    rating: 5,
    comment: "These LUTs have completely elevated my content. My car photos now stand out from the crowd with a cinematic quality that my followers love. The before/after difference is stunning!"
  },
  {
    id: 3,
    name: "Marcus Chen",
    role: "Professional Retoucher",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
    rating: 4,
    comment: "As someone who works with automotive brands daily, these LUTs have become an essential part of my workflow. They save me hours of custom color grading while still giving a premium look."
  },
  {
    id: 4,
    name: "Sophia Williams",
    role: "Car Dealership Owner",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
    rating: 5,
    comment: "We've seen a 30% increase in online engagement since using VroomVisionX for our inventory photos. The professional quality makes our listings stand out in a crowded market."
  },
  {
    id: 5,
    name: "David Thompson",
    role: "Automotive Blogger",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
    rating: 5,
    comment: "These LUTs have a magical quality - they enhance everything great about a car while maintaining a natural look. My readers have definitely noticed the improved quality of my images."
  }
];

export default testimonials;
