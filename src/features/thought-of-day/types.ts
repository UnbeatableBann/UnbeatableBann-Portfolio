export type ThoughtCategory = "AI" | "PRODUCT" | "ENGINEERING" | "LEARNING" | "BUILDING";

export interface Thought {
  id: string;
  category: ThoughtCategory;
  text: string;
  author: string;
}

export interface ThoughtOfTheDayResult {
  thought: Thought;
  date: string;
}
