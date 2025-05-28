import type {Teacher} from "~/types/Teacher";

export interface Event {
    id: string;
    title: string;
    date: string; //timestamp
    endDate: string; //timestamp
    description: string;
    location: string;
    capacity: number;
    price: number;
    isFree: boolean;
    registrationRequired: boolean;
    createdAt: string; //timestamp
    teacher_id: string;
    article_id: string;

}




