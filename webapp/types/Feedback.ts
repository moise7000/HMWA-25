import type {Course} from "~/types/Course";

export interface Feedback {
    id: number;
    course: Course;
    text: string;
    rating: number;

    createdAt: Date;

}