
export interface Event {
    id: number;
    title: string;
    date: Date;
    endDate: Date;
    description: string;
    location: string;
    capacity: number;
    price: number;
    isFree: boolean;
    registrationRequired: boolean;
    createdAt: Date;
    //teachers: Teacher[];
}