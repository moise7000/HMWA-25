import type {Course} from "~/types/Course";

export interface Feedback {
    id: number;
    course: Course;
    comment: string;
    rating: number;

    createdAt: Date;

}