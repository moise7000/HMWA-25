
export interface Teacher {
    id: number;
    name: string;
    email: string;
    photo?:string;
    biography: string;
    certificates: string[];
    socialMedia?: {
        instagram?: string;
        linkedin?: string;
        website?: string;
    };
    createdAt: Date;
}