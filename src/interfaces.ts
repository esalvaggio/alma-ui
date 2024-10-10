export interface EssayData {
    id: number;
    user: string;
    title: string;
    content: string;
    author: string;
}

export interface CardData {
    id: number;
    essay: number;
    question: string;
    answer: string;
    next_review_date: Date;
    review_interval: number;
    review_count: number;
    percent_through: number;
}
