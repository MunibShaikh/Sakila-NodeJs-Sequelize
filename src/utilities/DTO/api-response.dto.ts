export class ApiResponseDTO<T> {
  success?: boolean;
  message?: string;
  statusCode?: number;
  data?: T | any;

  constructor(
    success: boolean = true,
    message: string = "",
    data?: T,
    statusCode: number = 200
  ) {
    this.success = success;
    this.message = message;
    this.data = data || [];
    this.statusCode = statusCode || 200;
  }
}
