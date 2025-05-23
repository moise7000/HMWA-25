import type {Course} from "./Course";
import type {Student} from "./Student";


export interface Feedback {
    id: number;
    course: Course;
    student: Student
    comment: string;
    rating: number;
    createdAt: Date;

}