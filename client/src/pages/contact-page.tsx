import ContactSection from "@/components/sections/contact-section";

const ContactPage = () => {
  return (
    <>
      <div className="min-h-screen text-white relative">
        {/* Fixed gradient background to match home page */}
        <div className="fixed inset-0 bg-gradient-to-b from-black to-[#070752] -z-10"></div>

        <div className="py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4 text-white">Contact Us</h1>
            <p className="text-lg max-w-2xl text-white/90">
              Get in touch with our team of privacy experts to discuss how PrivacyWeave can help your organization.
            </p>
          </div>
        </div>

        <ContactSection />
      </div>
    </>
  );
};

export default ContactPage;
