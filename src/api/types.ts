import { ApiAnimalType } from "@/types/animal";

export interface IError {
  statusCode: number;
  data: unknown | null;
}


export interface ICommentData {
  id: number;
  userId: number;
  nickname: string;
  profileImageUrl: string;
  transformedContent: string;
  postType: ApiAnimalType;
  createdAt: string;
}

export interface ICommentDataPagination {
  content: ICommentData[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  last: boolean;
}
export interface ICreateComment {
  content: string;
}

export interface IImagesPreSignedUrlResponse {
  url: string;
  key: string;
}
