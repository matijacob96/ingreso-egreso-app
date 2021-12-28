export class Usuario {
  static fromFirestore({ uid, email, nombre }: any) {
    return new Usuario(uid, nombre, email);
  }

  constructor(
    public uid: string,
    public nombre: string,
    public email: string
  ) {}
}
