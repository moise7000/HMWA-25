
export interface Article {
    id: number;
    title: string;
    content: string;
    snippet: string;
    isPublished: boolean;
    publishedAt: Date;
    viewsCount: number;
    authors?: string[]
    createdAt: Date;

}