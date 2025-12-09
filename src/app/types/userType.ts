export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface IReview {
  eventId:string;
  rating: number;
  comment: string
}