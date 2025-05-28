import type {Teacher} from "./Teacher";
import type {Equipment} from "./Equipment";

export interface Course {
    id: string; // uuid
    title: string;
    image?: string; // bytea stocké comme URL
    description: string;
    goals?: string[]; // jsonb
    timetable?: any; // jsonb (peut être un objet complexe)
    price: number;
    intro_video_url?: string;
    difficulty_level: string;
    duration_minutes: number;
    max_capacity: number;
    teacher_id: string; //
    created_at: string;
    updated_at: string;
    // Relation (optionnelle, chargée avec join)
    teacher?: Teacher;
}