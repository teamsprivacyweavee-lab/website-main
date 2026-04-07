import { motion } from "framer-motion";

const PrivacyPolicy = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="py-16 bg-[#0a2c5a]">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Privacy Policy</h1>
                        <p className="text-lg text-white opacity-90">
                            How we collect, use, and protect your personal information
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Privacy Policy Content */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="max-w-4xl mx-auto prose prose-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="bg-gray-50 p-8 rounded-lg mb-8">
                            <h2 className="text-2xl font-bold text-[#0a2c5a] mb-4">
                                PRIVACY WEAVE TECHNOLOGIES PRIVATE LTD. PRIVACY NOTICE
                            </h2>
                            <p className="text-sm text-gray-600 mb-2">
                                <strong>Effective August 8, 2025</strong>
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold text-[#0a2c5a] mb-4">I. INTRODUCTION</h3>
                                <p className="text-gray-700 mb-4">
                                    This Privacy Notice ("Notice") covers the personal information (also known as personal data)
                                    that Privacy Weave Technologies Private Ltd., its subsidiaries, and affiliates ("Privacy Weave",
                                    "we", "our" or "us") collect, store, use, disclose and otherwise process about you, as well as the
                                    rights available to you when Privacy Weave acts as the data fiduciary for such personal
                                    information.
                                </p>
                                <p className="text-gray-700 mb-4">
                                    This Privacy Notice describes the categories of personal information collected, the purposes for
                                    such collection, and how it is processed, used, and disclosed following applicable data protection
                                    laws, including the Digital Personal Data Protection (DPDP) Act and other relevant data privacy
                                    regulations.
                                </p>
                                <p className="text-gray-700">
                                    You are advised to carefully read this Privacy Notice before using or availing any of our
                                    products and/or services.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-[#0a2c5a] mb-4">II. DEFINITIONS</h3>
                                <p className="text-gray-700 mb-4">
                                    In this Privacy Notice, the following definitions are used:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li><strong>"Personal Information"</strong> means any information that helps to identify an individual, such
                                        as name, phone number, or email address.</li>
                                    <li><strong>"Processing"</strong> refers to any action that is conducted with respect to personal information, such
                                        as collecting, storing, using, or sharing it.</li>
                                    <li><strong>"We", "Our", or "Us"</strong> refer to Privacy Weave, the organization responsible for
                                        managing your personal information.</li>
                                    <li><strong>"Fiduciary"</strong> means any entity that determines the means and purpose of processing the
                                        personal information.</li>
                                    <li><strong>"Cookies"</strong> refer to a small file placed on your device by our website when you visit or
                                        use certain features of our website. A cookie generally allows a website to remember
                                        your actions or preferences for a certain period.</li>
                                    <li><strong>"Data Protection laws"</strong> are any applicable law for the time being in force relating to the
                                        processing of Data.</li>
                                    <li><strong>"User or you"</strong> refers to the natural person who accesses our services through our
                                        websites.</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-[#0a2c5a] mb-4">III. WHAT PERSONAL INFORMATION WE COLLECT ABOUT YOU</h3>
                                <p className="text-gray-700 mb-4">
                                    We may collect the following categories of information:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li><strong>Contact Information</strong> – Legal name</li>
                                    <li><strong>Business Information</strong> – Company's Name and the company's email address.</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-[#0a2c5a] mb-4">IV. HOW WE COLLECT PERSONAL INFORMATION</h3>
                                <p className="text-gray-700 mb-4">
                                    We collect personal information in the following ways:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li><strong>Information You Give Us:</strong> We receive and store any information you enter on our
                                        website when you request a demo.</li>
                                    <li><strong>Automatic Information We Collect:</strong> – We use "cookies" to receive and store certain
                                        types of information whenever you interact with us.</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-[#0a2c5a] mb-4">V. OUR USE OF PERSONAL INFORMATION</h3>
                                <p className="text-gray-700 mb-4">
                                    Personal Information collected by Privacy Weave Technologies Private Ltd. may be used by us
                                    for the following reasons:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li>carry out our obligations arising from any contract entered into between you and us;</li>
                                    <li>provide products and/or services and communicate with you about products and/or services
                                        offered by us;</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-[#0a2c5a] mb-4">VI. MINORS</h3>
                                <p className="text-gray-700">
                                    Our website does not offer products or services for use by minors. If you are under 18, you may
                                    use our website only with the involvement of a parent or guardian.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-[#0a2c5a] mb-4">VII. KEEPING PERSONAL INFORMATION SECURE</h3>
                                <p className="text-gray-700 mb-4">
                                    We will use technical and organisational measures to safeguard your Data, and we store your
                                    Data on secure servers. Technical and organisational measures include measures to deal with any
                                    suspected data breach. If you suspect any misuse or loss, or unauthorised access to your Data,
                                    please let us know immediately by contacting us by email at{" "}
                                    <a href="mailto:teams@privacyweave.in" className="text-blue-600 hover:underline">
                                        teams@privacyweave.in
                                    </a>.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-[#0a2c5a] mb-4">VIII. RETENTION OF PERSONAL INFORMATION</h3>
                                <p className="text-gray-700 mb-4">
                                    Privacy Weave Technologies Private Ltd. retains Personal Information for as long as necessary
                                    for the use of our products and/or services or to provide access to and use of our website, or for
                                    other essential purposes such as complying with our legal obligations, resolving disputes,
                                    enforcing our agreements and as long as processing and retaining your personal information is
                                    necessary for our legitimate interests. Because these needs can vary for different data types and
                                    purposes, actual retention periods can vary significantly.
                                </p>
                                <p className="text-gray-700">
                                    Even if we delete your Data, including on account of the exercise of your right under below, it
                                    may persist on backup or archival media for audit, legal, tax, or regulatory purposes.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-[#0a2c5a] mb-4">IX. LEGAL BASIS FOR PROCESSING YOUR PERSONAL INFORMATION</h3>
                                <p className="text-gray-700 mb-4">
                                    We process your personal information only when we have a lawful reason to do so, as required
                                    under the Digital Personal Data Protection Act, 2023. This means your data will be collected and
                                    used only when:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li>You have given your clear, specific, and informed consent for us to process your data;</li>
                                    <li>The processing is necessary to enter into or perform a contract with you;</li>
                                    <li>The processing is required to comply with a legal obligation under applicable laws.</li>
                                    <li>The processing is necessary to address a medical emergency or to protect your life,
                                        health, or safety, or that of another person.</li>
                                    <li>The processing is needed for the performance of any function of the State, as authorized
                                        by law.</li>
                                    <li>The processing is for legitimate use as permitted under the DPDP Act and does not
                                        override your rights and expectations of privacy.</li>
                                </ul>
                                <p className="text-gray-700 mt-4">
                                    We will not process your personal information for any other reason without a valid legal basis.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-[#0a2c5a] mb-4">X. YOUR RIGHTS AND CHOICES</h3>
                                <p className="text-gray-700 mb-4">
                                    As a Data Principal under the Digital Personal Data Protection Act, 2023, you are entitled to
                                    exercise the following rights regarding your personal information:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li><strong>Right to Access:</strong> You can request information about the personal data we hold about you.</li>
                                    <li><strong>Right to Correction:</strong> You may request correction, completion, or updating of any
                                        inaccurate or outdated personal information.</li>
                                    <li><strong>Right to Erasure:</strong> You may request deletion of your personal information, subject to legal
                                        or regulatory obligations that may require its retention.</li>
                                    <li><strong>Right to Nominate:</strong> You may nominate another individual to exercise your rights in case
                                        of your death or incapacity.</li>
                                    <li><strong>Right to Withdraw Consent:</strong> You can withdraw your consent for data processing at any
                                        time. We will stop processing your information unless required to do so by law.</li>
                                </ul>
                                <p className="text-gray-700 mt-4">
                                    To exercise any of these rights, please contact our Grievance Officer using the details provided
                                    below. We will respond following the timelines prescribed under the Act.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-[#0a2c5a] mb-4">XI. SEVERABILITY</h3>
                                <p className="text-gray-700">
                                    If any court or competent authority finds that any provision of this Privacy Notice (or part of any
                                    provision) is invalid, illegal, or unenforceable, that provision or part-provision will, to the extent
                                    required, be deemed to be deleted, and the validity and enforceability of the other provisions of
                                    this Privacy Notice will not be affected.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-[#0a2c5a] mb-4">XII. COOKIES</h3>
                                <p className="text-gray-700 mb-4">
                                    Our website may place and access certain Cookies on your device. Cookies are unique identifiers
                                    that we transfer to your device to enable our systems to recognize your device.
                                </p>
                                <p className="text-gray-700 mb-4">
                                    When you first visit our website, you will be presented with a pop-up screen informing you of
                                    our use of Cookies and asking you to provide your consent for such use. The pop-up screen may
                                    not reappear for all your subsequent visits to our website. You may adjust your web browser
                                    software if you do not wish to receive Cookies or web beacons, but this may prevent you from
                                    taking advantage of some of the features of our website.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-[#0a2c5a] mb-4">XIII. CHANGES TO THE PRIVACY NOTICE</h3>
                                <p className="text-gray-700 mb-4">
                                    Our business changes constantly, and our Privacy Notice will also change. We may email
                                    periodic reminders of our notices and conditions, unless you have instructed us not to, but you
                                    should check our website frequently to see recent changes. The updated version will be effective
                                    as soon as it is accessible. We encourage you to review this Privacy Notice frequently to be
                                    informed of how we are protecting your information.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-[#0a2c5a] mb-4">XIV. HOW TO CONTACT US</h3>
                                <p className="text-gray-700">
                                    To request to review, update, or delete your personal information or to otherwise reach us, please
                                    submit a request by emailing us at{" "}
                                    <a href="mailto:teams@privacyweave.in" className="text-blue-600 hover:underline">
                                        teams@privacyweave.in
                                    </a>. We will respond to your request
                                    within 30 days.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-[#0a2c5a] mb-4">XV. GRIEVANCE OFFICER</h3>
                                <p className="text-gray-700 mb-4">
                                    Please see below the details of our grievance officer:
                                </p>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <p className="text-gray-700 mb-2">
                                        <strong>Email:</strong>{" "}
                                        <a href="mailto:teams@privacyweave.in" className="text-blue-600 hover:underline">
                                            teams@privacyweave.in
                                        </a>
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Address:</strong> Kesariya Complex, 914/8-14, Avinashi Road, Coimbatore Central, Coimbatore,
                                        Coimbatore South, Tamil Nadu, India, 641018
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default PrivacyPolicy;


