export class User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;

  constructor(_id, username, passsword, firstName, lastName) {
    this._id = _id;
    this.username = username;
    this.password = passsword;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
