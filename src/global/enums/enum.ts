// Thông điệp trả về từ server cho client
export enum HttpMessage {
  SUCCESS_MESSAGE = 'Thành công.',
  ERROR_MESSAGE = 'Thất bại.',
  UPDATED_MESSAGE = 'Cập nhật dữ liệu thành công.',
  CREATED_MESSAGE = 'Thêm mới dữ liệu thành công.',
  DELETE_MESSAGE = 'Xóa dữ liệu thành công.',
  NOTFOUND_MESSAGE = 'Bản ghi không tồn tại.',
}

// Trạng thái phản hồi trả về từ server cho client
export enum HttpStatus {
  SUCESSS = 200,
  ERROR = 500,
  NOT_FOUND = 400,
  CREATED = 201,
  BAD_REQUEST = 404,
}
