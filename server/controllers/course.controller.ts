import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { createCourse, getAllCoursesService } from "../services/course.service";
import CourseModel, { IComment } from "../models/course.model";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.Model";
import axios from "axios";

// upload course
export const uploadCourse = CatchAsyncError(
  /**
   * Handles the creation of a course with an optional thumbnail upload.
   * @param {Request} req - Express request object containing the course data in the body.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next middleware function.
   * @returns {void} This method doesn't return directly, it calls next() or createCourse().
   * @throws {ErrorHandler} Throws an ErrorHandler with a 500 status code if an error occurs.
   */
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      createCourse(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// edit course
export const editCourse = CatchAsyncError(
  /**
   * Updates a course with new data, including thumbnail management.
   * @param {Request} req - Express request object containing course data and parameters
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with updated course data or calls next with an error
   * @throws {ErrorHandler} If an error occurs during the update process
   */
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      const thumbnail = data.thumbnail;

      const courseId = req.params.id;

      const courseData = await CourseModel.findById(courseId) as any;

      if (thumbnail && !thumbnail.startsWith("https")) {
        await cloudinary.v2.uploader.destroy(courseData.thumbnail.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      if (thumbnail.startsWith("https")) {
        data.thumbnail = {
          public_id: courseData?.thumbnail.public_id,
          url: courseData?.thumbnail.url,
        };
      }

      const course = await CourseModel.findByIdAndUpdate(
        courseId,
        {
          $set: data,
        },
        { new: true }
      );
      await redis.set(courseId, JSON.stringify(course)); // update course in redis
      res.status(201).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get single course --- without purchasing
export const getSingleCourse = CatchAsyncError(
  /**
   * Retrieves a course by ID, utilizing Redis cache for improved performance.
   * @param {Request} req - Express request object containing the course ID in params.
   * @param {Response} res - Express response object used to send the API response.
   * @param {NextFunction} next - Express next middleware function for error handling.
   * @returns {Promise<void>} Sends a JSON response with the course data or forwards to error handler.
   * @throws {ErrorHandler} Forwards any caught errors to the next middleware.
   */
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;

      const isCacheExist = await redis.get(courseId);

      if (isCacheExist) {
        const course = JSON.parse(isCacheExist);
        res.status(200).json({
          success: true,
          course,
        });
      } else {
        const course = await CourseModel.findById(req.params.id).select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
        );

        await redis.set(courseId, JSON.stringify(course), "EX", 604800); // 7days

        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get all courses --- without purchasing
export const getAllCourses = CatchAsyncError(
  /**
   * Retrieves a list of courses with selected fields.
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with course data or passes an error to the next middleware
   * @throws {ErrorHandler} Throws a custom error handler with a 500 status code if an error occurs
   */
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await CourseModel.find().select(
        "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
      );

      res.status(200).json({
        success: true,
        courses,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get course content -- only for valid user
export const getCourseByUser = CatchAsyncError(
  /**
   * Retrieve course content for an authenticated user
   * @param {Request} req - Express request object containing user and course information
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with course content or calls next with an error
   * @throws {ErrorHandler} If user is not eligible to access the course or if there's a server error
   */
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;
      const courseId = req.params.id;

      const courseExists = userCourseList?.find(
        (course: any) => course._id.toString() === courseId
      );

      if (!courseExists) {
        return next(
          new ErrorHandler("You are not eligible to access this course", 404)
        );
      }

      const course = await CourseModel.findById(courseId);

      const content = course?.courseData;

      res.status(200).json({
        success: true,
        content,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// add question in course
interface IAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}

export const addQuestion = CatchAsyncError(
  /**
   * Adds a new question to a specific course content
   * @param {Request} req - Express request object containing the question data in the body
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the updated course or calls the next middleware with an error
   * @throws {ErrorHandler} If the content id is invalid or not found
   */
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { question, courseId, contentId }: IAddQuestionData = req.body;
      const course = await CourseModel.findById(courseId);

      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      const couseContent = course?.courseData?.find((item: any) =>
        item._id.equals(contentId)
      );

      if (!couseContent) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      // create a new question object
      const newQuestion: any = {
        user: req.user,
        question,
        questionReplies: [],
      };

      // add this question to our course content
      couseContent.questions.push(newQuestion);

      await NotificationModel.create({
        user: req.user?._id,
        title: "New Question Received",
        message: `You have a new question in ${couseContent.title}`,
      });

      // save the updated course
      await course?.save();

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// add answer in course question
interface IAddAnswerData {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string;
}

export const addAnwser = CatchAsyncError(
  /**
   * Adds an answer to a question in a course content
   * @param {Request} req - Express request object containing the answer data in the body
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the updated course or forwards to error handling middleware
   * @throws {ErrorHandler} If the content id or question id is invalid, or if there's an error in sending email
   */
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { answer, courseId, contentId, questionId }: IAddAnswerData =
        req.body;

      const course = await CourseModel.findById(courseId);

      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      const couseContent = course?.courseData?.find((item: any) =>
        item._id.equals(contentId)
      );

      if (!couseContent) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      const question = couseContent?.questions?.find((item: any) =>
        item._id.equals(questionId)
      );

      if (!question) {
        return next(new ErrorHandler("Invalid question id", 400));
      }

      // create a new answer object
      const newAnswer: any = {
        user: req.user,
        answer,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // add this answer to our course content
      question.questionReplies.push(newAnswer);

      await course?.save();

      if (req.user?._id === question.user._id) {
        // create a notification
        await NotificationModel.create({
          user: req.user?._id,
          title: "New Question Reply Received",
          message: `You have a new question reply in ${couseContent.title}`,
        });
      } else {
        const data = {
          name: question.user.name,
          title: couseContent.title,
        };

        const html = await ejs.renderFile(
          path.join(__dirname, "../mails/question-reply.ejs"),
          data
        );

        try {
          await sendMail({
            email: question.user.email,
            subject: "Question Reply",
            template: "question-reply.ejs",
            data,
          });
        } catch (error: any) {
          return next(new ErrorHandler(error.message, 500));
        }
      }

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// add review in course
interface IAddReviewData {
  review: string;
  rating: number;
  userId: string;
}

export const addReview = CatchAsyncError(
  /**
   * Adds a review to a course and updates the course's average rating.
   * @param {Request} req - The Express request object containing user and course information.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The Express next middleware function.
   * @returns {Promise<void>} A promise that resolves when the review is added and the response is sent.
   * @throws {ErrorHandler} If the user is not eligible to access the course or if there's a server error.
   */
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;

      const courseId = req.params.id;

      // check if courseId already exists in userCourseList based on _id
      const courseExists = userCourseList?.some(
        (course: any) => course._id.toString() === courseId.toString()
      );

      if (!courseExists) {
        return next(
          new ErrorHandler("You are not eligible to access this course", 404)
        );
      }

      const course = await CourseModel.findById(courseId);

      const { review, rating } = req.body as IAddReviewData;

      const reviewData: any = {
        user: req.user,
        rating,
        comment: review,
      };

      course?.reviews.push(reviewData);

      let avg = 0;

      course?.reviews.forEach((rev: any) => {
        avg += rev.rating;
      });

      if (course) {
        course.ratings = avg / course.reviews.length; // one example we have 2 reviews one is 5 another one is 4 so math working like this = 9 / 2  = 4.5 ratings
      }

      await course?.save();

      await redis.set(courseId, JSON.stringify(course), "EX", 604800); // 7days

      // create notification
      await NotificationModel.create({
        user: req.user?._id,
        title: "New Review Received",
        message: `${req.user?.name} has given a review in ${course?.name}`,
      });


      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// add reply in review
interface IAddReviewData {
  comment: string;
  courseId: string;
  reviewId: string;
}
export const addReplyToReview = CatchAsyncError(
  /**
   * Adds a reply to a review for a specific course
   * @param {Request} req - Express request object containing body with comment, courseId, and reviewId
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   * @returns {Promise<void>} Sends a JSON response with the updated course or calls the next middleware with an error
   * @throws {ErrorHandler} If the course or review is not found, or if there's a server error
   */
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comment, courseId, reviewId } = req.body as IAddReviewData;

      const course = await CourseModel.findById(courseId);

      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const review = course?.reviews?.find(
        (rev: any) => rev._id.toString() === reviewId
      );

      if (!review) {
        return next(new ErrorHandler("Review not found", 404));
      }

      const replyData: any = {
        user: req.user,
        comment,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (!review.commentReplies) {
        review.commentReplies = [];
      }

      review.commentReplies?.push(replyData);

      await course?.save();

      await redis.set(courseId, JSON.stringify(course), "EX", 604800); // 7days

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get all courses --- only for admin
export const getAdminAllCourses = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllCoursesService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Delete Course --- only for admin
export const deleteCourse = CatchAsyncError(
  /**
   * Deletes a course by its ID
   * @param {Request} req - Express request object containing the course ID in params
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function for error handling
   * @returns {Promise<void>} Sends a JSON response with success status and message, or calls next with an error
   * @throws {ErrorHandler} If course is not found or any other error occurs during the process
   */
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const course = await CourseModel.findById(id);

      if (!course) {
        return next(new ErrorHandler("course not found", 404));
      }

      await course.deleteOne({ id });

      await redis.del(id);

      res.status(200).json({
        success: true,
        message: "course deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// generate video url
export const generateVideoUrl = CatchAsyncError(
  /**
   * Generates a one-time password (OTP) for a video using the VdoCipher API.
   * @param {Request} req - Express request object containing the video ID in the request body.
   * @param {Response} res - Express response object used to send the API response.
   * @param {NextFunction} next - Express next middleware function for error handling.
   * @returns {Promise<void>} Sends a JSON response with the OTP data or passes an error to the next middleware.
   * @throws {ErrorHandler} Throws a custom error with a 400 status code if the API request fails.
   */
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { videoId } = req.body;
      const response = await axios.post(
        `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
        { ttl: 300 },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
          },
        }
      );
      res.json(response.data);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
