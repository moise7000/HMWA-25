import type {Teacher} from "~/types/teacher";

export interface Course {
    id: number;
    title: string;
    description: string;
    price: number;
    durationMinutes: number;
    introVideoUrl?: string;
    maxCapacity: number;
    teacher: Teacher;

    createdAt: Date;
}