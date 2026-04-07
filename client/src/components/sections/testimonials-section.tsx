import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    text: "PrivacyWeave's automation capabilities have reduced our compliance workload by 75%. Their AI-driven approach to privacy is truly revolutionary.",
    name: "Dr. Anita Sharma",
    position: "CIO, City Hospital",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    stars: 5,
    delay: 0
  },
  {
    text: "The end-to-end encryption solution provided by PrivacyWeave gives us confidence that our patients' data is secure. Implementation was seamless.",
    name: "Rajesh Kumar",
    position: "CTO, Med Solutions",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
    stars: 5,
    delay: 0.2
  },
  {
    text: "PrivacyWeave's AI technology helped us identify privacy risks we weren't even aware of. Their team's expertise has been invaluable to our organization.",
    name: "Priya Nair",
    position: "CISO, TechVantage",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&h=150&q=80",
    stars: 4,
    delay: 0.4
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl p-8 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: testimonial.delay }}
    >
      <div className="flex items-center mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i}
            className={`h-6 w-6 ${i < testimonial.stars ? 'text-primary fill-current' : 'text-neutral-200'}`}
          />
        ))}
      </div>
      <p className="text-neutral-dark mb-6 italic">
        "{testimonial.text}"
      </p>
      <div className="flex items-center">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-bold text-primary-dark">{testimonial.name}</h4>
          <p className="text-sm text-neutral-dark">{testimonial.position}</p>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-neutral-light">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-6">What Our Clients Say</h2>
          <p className="text-lg text-neutral-dark max-w-3xl mx-auto">
            Hear from our clients about how PrivacyWeave has transformed their approach to data privacy.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
