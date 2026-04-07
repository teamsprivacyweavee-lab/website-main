import { motion } from "framer-motion";

const feedbacks = [
    {
        name: "Priyadharshini R",
        email: "priyadharshini.2311044@srec.ac.in",
        photo: "/user_photos/PRIYADHARSHINI.jpeg",
        ratings: { mentorship: 5 },
        feedback:
            "My internship at Privacy Weave was a highly professional and enriching experience. The program was well-structured, combining hands-on projects with real-world privacy tech applications. I gained valuable insights into AI, data privacy, and adaptive technologies. The mentorship and collaborative environment made the learning journey impactful and rewarding.",
    },
    {
        name: "Hemanthkumar",
        email: "hemanthkumar.2311020@srec.ac.in",
        photo: "/user_photos/Hemanthkumar.jpg",
        ratings: { company: 5 },
        feedback:
            "The mentors were highly supportive and always encouraged curiosity, innovation, and critical thinking. The tasks and projects assigned were not only industry-relevant but also designed to challenge our problem-solving abilities and technical skills",
    },
    {
        name: "Shreshath Sivaji",
        email: "shreshathsivaji.2311055@srec.ac.in",
        photo: "/user_photos/SHRESHATH SIVAJI.jpg",
        ratings: { task: 4 },
        feedback:
            "The internship at Privacy Weave was professional, enriching, and well-structured for learning. The program offered a perfect blend of theoretical knowledge and hands-on practice, especially in the fields of AI, Data Privacy, and cutting-edge technologies like Adaptive Tokenization and Federated Learning.",
    },
    {
        name: "Gokul P",
        email: "gokulpadmarajan.27@gmail.com",
        photo: "/user_photos/GokulP.jpg",
        ratings: { company: 5 },
        feedback:
            "The overall standard of your internship initiative appears to be quite promising. The communication regarding the opportunity is clear, and it reflects a structured plan aimed at providing students with practical industry exposure. The professionalism in how the opportunity is presented gives confidence that this internship would be a meaningful experience. Furthermore, the initiative to engage students early in their career development through internships is highly appreciated. ",
    },
];

const StarRating = ({ count }: { count: number }) => (
    <div className="flex">
        {[...Array(5)].map((_, i) => (
            <span key={i} className={i < count ? "text-yellow-400" : "text-gray-300"}>
                ★
            </span>
        ))}
    </div>
);

export default function InternFeedbackSection() {
    return (
        <section className="py-20 bg-[#f8fafc]">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-[#0a2c5a]">Intern Feedback</h2>
                {/* Feedback Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {feedbacks.map((fb, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="bg-white shadow-xl rounded-2xl p-6"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={fb.photo}
                                    alt={fb.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="text-xl font-semibold">{fb.name}</h3>
                                    <p className="text-sm text-gray-500">{fb.email}</p>
                                </div>
                            </div>

                            <div className="space-y-2 mb-4">
                                {"task" in fb.ratings && (
                                    <p>
                                        <strong>Task Rating:</strong>{" "}
                                        <StarRating count={fb.ratings.task as number} />
                                    </p>
                                )}
                                {"mentorship" in fb.ratings && (
                                    <p>
                                        <strong>Mentorship Rating:</strong>{" "}
                                        <StarRating count={fb.ratings.mentorship as number} />
                                    </p>
                                )}
                                {"company" in fb.ratings && (
                                    <p>
                                        <strong>Company Rating:</strong>{" "}
                                        <StarRating count={fb.ratings.company as number} />
                                    </p>
                                )}
                            </div>

                            <p className="italic text-gray-700">“{fb.feedback}”</p>
                        </motion.div>
                    ))}
                </div>

                {/* Group Section */}
                <div className="mt-16 flex flex-col lg:flex-row items-center gap-10">
                    {/* Group Photo */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <img
                            src="/user_photos/group.jpg"
                            alt="Intern Group"
                            className="rounded-2xl shadow-lg object-contain max-w-full h-auto"
                            style={{ maxWidth: "750px", maxHeight: "90%", width: "100%" }}
                        />
                    </div>

                    {/* Text Content */}
                    <div className="w-full lg:w-1/2 text-justify">
                        <h3 className="text-2xl font-semibold mb-4 text-[#0a2c5a]">Internship Overview</h3>
                        <p className="text-gray-700 leading-7">
                            We are proud to have successfully hosted 15 talented students from
                            Sri Ramakrishna Engineering College, Coimbatore, for an enriching
                            internship at <strong>Privacy Weave</strong>. During their tenure,
                            the interns gained practical experience in advanced AI technologies and
                            data privacy solutions, contributing meaningfully to real-world
                            projects.
                            <br />
                            <br />
                            Upon completion, all interns were awarded{" "}
                            <strong>Internship Completion Certificates</strong> and{" "}
                            <strong>Letters of Recommendation</strong> in recognition of their
                            dedication and performance. We appreciate their enthusiasm and
                            commendable learning spirit throughout the program.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
} 