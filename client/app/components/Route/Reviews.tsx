import { styles } from "@/app/styles/style";
import Image from "next/image";
import React from "react";
import ReviewCard from "../Review/ReviewCard";

type Props = {};

export const reviews = [
  {
    "name": "Gourav",
    "avatar": "https://randomuser.me/api/portraits/men/1.jpg",
    "profession": "Student | Rnsit",
    "comment": "EduSphere offers an excellent range of tech courses that are both comprehensive and engaging. The content is well-structured and perfect for all skill levels, from beginners to advanced learners. The tutorials are detailed, and the instructors do an incredible job of explaining complex concepts in an easy-to-understand manner. I particularly enjoyed the hands-on projects that allowed me to apply what I learned in a practical setting. Highly recommended for anyone looking to enhance their tech skills.!"
  },
  {
    "name": "Shifa",
    "avatar": "https://randomuser.me/api/portraits/women/1.jpg",
    "profession": "Full Stack Developer | Apple",
    "comment": "EduSphere’s tutorials are clear, engaging, and incredibly well-structured. The practical examples provided make learning enjoyable and effective, allowing learners to easily grasp and apply new concepts. The platform covers a wide range of topics, ensuring that there's something for everyone, regardless of their skill level or area of interest. The quality of the content is top-notch, and the instructors are very knowledgeable and approachable. I particularly appreciated the focus on real-world applications, which has helped me immensely in my role as a Full Stack Developer. Great job, EduSphere! I'm looking forward to more in-depth tutorials and advanced courses in the future."
  },
  {
    "name": "Piyush",
    "avatar": "https://randomuser.me/api/portraits/men/2.jpg",
    "profession": "Computer Systems Engineering Student | RVCE",
    "comment": "EduSphere's tutorials are insightful, well-organized, and easy to follow. The hands-on approach makes even the most complex topics manageable and understandable. The platform provides a valuable resource for students and professionals alike, with courses that are designed to cater to different learning styles and levels of expertise. The interactive elements, such as quizzes and practical projects, help reinforce learning and ensure that users can apply their knowledge in real-world scenarios. Overall, EduSphere is an exceptional learning platform that I would highly recommend to anyone looking to expand their tech skills and knowledge."
  },
  {
    "name": "Akanksha",
    "avatar": "https://randomuser.me/api/portraits/women/2.jpg",
    "profession": "Junior Web Developer | DSCE",
    "comment": "EduSphere provides high-quality content and a diverse range of courses that cater to various interests and skill levels. The platform is a fantastic resource for learning new tech skills, with detailed tutorials that cover topics thoroughly. The instructors are experienced and knowledgeable, making complex subjects accessible to everyone. The user interface is intuitive and easy to navigate, enhancing the overall learning experience. I have gained a lot of valuable knowledge and skills from EduSphere, and I appreciate the emphasis on practical applications, which has been particularly beneficial for my career as a Junior Web Developer."
  },
  {
    "name": "Amisha",
    "avatar": "https://randomuser.me/api/portraits/women/3.jpg",
    "profession": "Full Stack Web Developer | RNSIT",
    "comment": "The detailed videos on EduSphere are fantastic, covering a wide range of topics in-depth. The thorough explanations and practical examples make it easy to understand and apply the concepts, enabling me to complete projects efficiently and effectively. The platform's focus on hands-on learning is particularly valuable, as it helps reinforce the theoretical knowledge with real-world applications. The course content is up-to-date and relevant, ensuring that learners are equipped with the latest skills and knowledge. I am excited for more content and new courses, as EduSphere has become my go-to resource for continuous learning and professional development."
  },
  {
    "name": "Sheila",
    "avatar": "https://randomuser.me/api/portraits/women/4.jpg",
    "profession": "Full Stack Web Developer | RNSIT",
    "comment": "EduSphere’s focus on practical applications is incredibly useful, especially for developers who want to see how theoretical concepts are applied in real-world scenarios. The React JS lessons were particularly beneficial, providing a deep understanding of project development from start to finish. The instructors are engaging and knowledgeable, breaking down complex topics into easily digestible parts. The interactive nature of the courses, combined with the comprehensive coverage of each topic, ensures that learners can effectively build and expand their skill sets. EduSphere is a valuable platform for anyone looking to advance their tech career, and I highly recommend it for its quality content and effective teaching methods."
  }
];


const Reviews: React.FC<Props> = () => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full">
          <Image
            src={require("../../../public/assests/business-img.png")}
            alt="business"
            width={700}
            height={700}
          />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students Are <span className="text-gradient">Our Strength</span>{" "}
            <br /> See What They Say About Us
          </h3>
          <br />
          <p className={styles.label}>
            Read about how our students have benefited from EduSphere and the impact it has made on their learning journey.
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-20px]">
        {reviews && reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
      </div>
    </div>
  );
};

export default Reviews;
