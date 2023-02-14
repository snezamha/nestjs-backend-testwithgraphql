import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/models/user';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  validate(mobile: string, code: number): User | null {
    const user = this.userService.getUserByMobile(mobile);
    if (!user) {
      return null;
    }
    const codeIsValid = code == user.otp.code;
    return codeIsValid ? user : null;
  }
  login(user: User): { access_token: string } {
    const payload = {
      mobile: user.mobile,
      sub: user.userId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  verify(token: string): User {
    const decode = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_KEY,
    });
    const user = this.userService.getUserByMobile(decode.mobile);
    if (!user) {
      throw new Error('Unable to ge the user from decoded token.');
    }
    return user;
  }
}
