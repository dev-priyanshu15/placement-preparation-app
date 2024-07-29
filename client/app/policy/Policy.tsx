import React from "react";
import { styles } from "../styles/style";

type Props = {};

const Policy = (props: Props) => {
  return (
    <div>
      <div className={"w-[95%] 800px:w-[92%] m-auto py-2 text-black dark:text-white px-3"}>
        <h1 className={`${styles.title} !text-start pt-2`}>
          Platform Terms and Condition
        </h1>
      <ul style={{ listStyle: "unset", marginLeft: "15px" }}>
  
        <br />
        <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
  **1. Introduction**<br />
  Welcome to EduSphere! We are committed to providing an excellent learning experience. This document outlines our policies to ensure the effective and fair use of our platform.
</p>
<br />
<p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
  **2. User Conduct**<br />
  All users must interact with respect and professionalism. Any form of harassment, discrimination, or inappropriate behavior is prohibited. Users are expected to adhere to high standards of integrity and honesty.
</p>
<br />
<p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
  **3. Content Guidelines**<br />
  Content shared on EduSphere should be relevant and educational. Inappropriate content, including illegal activities and hate speech, is not allowed. Respect for intellectual property is essential; unauthorized use or sharing of copyrighted materials is prohibited.
</p>
<br />
<p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
  **4. Privacy and Data Protection**<br />
  EduSphere is committed to protecting your personal information. Our [Privacy Policy](#) provides details on how we collect, use, and protect your data. Users must maintain the confidentiality of their account information.
</p>
<br />
<p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
  **5. Account Management**<br />
  Users must provide accurate information when creating accounts. EduSphere reserves the right to suspend or terminate accounts that violate our policies or disrupt platform operations.
</p>
<br />
<p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
  **6. Course Enrollment and Access**<br />
  Enrollment in courses is subject to availability and prerequisites. EduSphere may modify course content and availability as necessary. Access to course materials is granted based on enrollment and is subject to course-specific terms.
</p>
<br />
<p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
  **7. Fees and Payments**<br />
  Course fees are specified on the EduSphere website. Users are responsible for paying applicable fees before accessing course materials. Refunds are subject to our [Refund Policy](#).
</p>
<br />
<p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
  **8. Support and Feedback**<br />
  For assistance, users can contact our support team at [support email/phone number]. We welcome feedback and suggestions to improve our platform, which can be submitted through [feedback form/link].
</p>
<br />
<p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
  **9. Changes to the Policy**<br />
  EduSphere may update this policy periodically. Users will be informed of significant changes via email or through notifications on the platform. Continued use of EduSphere signifies acceptance of the revised policy.
</p>
<br />
<p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
  **10. Contact Information**<br />
  For any questions or concerns, please contact us at:<br />
  Email: [support email]<br />
  Phone: [support phone number]<br />
  Address: [EduSphere Address]
</p>

      </ul>
      </div>
    </div>
  );
};

export default Policy;
