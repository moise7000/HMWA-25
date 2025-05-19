import type {Teacher} from "~/types/Teacher";
import type {Equipment} from "~/types/Equipment";

export interface Course {
    id: number;
    title: string;
    description: string;
    price: number;
    durationMinutes: number;
    introVideoUrl?: string;
    maxCapacity: number;
    teacher: Teacher;
    equipments? : [number,boolean,Equipment][]; //quantity, isRequired
    createdAt: Date;
}