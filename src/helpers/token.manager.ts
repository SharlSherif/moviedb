/* eslint-disable prettier/prettier */
import * as jwt from 'jsonwebtoken';
import { Document } from 'mongoose';

export default abstract class TokenManager {
  public static createUserToken(user): string {
    const expiresIn = 60 * 60 * 24 * 30; // 1 month
    const dataStoredInToken = {
      id: user.id,
      userType: user.type,
    };
    return TokenManager.createToken(
      dataStoredInToken,
      process.env.JWT_SECRET,
      expiresIn,
    );
  }

  public static decodeToken<T>(token: string): T {
    return jwt.decode(token) as T;
  }

  public static isValidJwtToken(token: string): boolean {
    if (!token) return false;
    return !!jwt.verify(token, process.env.JWT_SECRET);
  }

  public static createToken(
    data: any,
    secret: string | Buffer,
    expiresIn: number,
  ): string {
    return `${jwt.sign(data, secret, { expiresIn })}`;
  }
}
