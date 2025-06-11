export interface IError {
  statusCode: number;
  data: unknown | null;
}

export interface IImagesPreSignedUrlResponse {
  url: string;
  key: string;
}
