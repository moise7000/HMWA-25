import type {Course} from "~/types/Course";

export interface Student {
    id: number;
    name: string;
    email: string;
    phone: string,
    courses: Course[];
    createdAt: Date;
}