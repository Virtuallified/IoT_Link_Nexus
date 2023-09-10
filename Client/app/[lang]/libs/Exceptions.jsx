export class SomethingWentWrongError extends Error {
  constructor(message = "Something went wrong!") {
    super(message);
    this.name = "SomethingWentWrongError";
  }
}
