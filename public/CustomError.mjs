export default class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError"; // 设置自定义的错误名称
  }
}
