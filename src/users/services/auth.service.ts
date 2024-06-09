import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../models/user.class';
import * as bcrypt from 'bcrypt';
import { Observable, from, of } from 'rxjs';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}


    hashPassword(password: string): Observable<string> {
        return from(bcrypt.hash(password, 12));
    }

    doesUserExist(email: string): Observable<boolean> {
        return from(this.userRepository.findOne({ where: {email} })).pipe(
            switchMap((user: User) => {
              return of(!!user);
            }),
        )
    }

    registerAccount(user: User): Observable<User> {
        const { firstName, lastName, email, password } = user;
    
        return this.doesUserExist(email).pipe(
          tap((doesUserExist: boolean) => {
            if (doesUserExist)
              throw new HttpException(
                'A user has already bee created with this email address',
                HttpStatus.BAD_REQUEST,
              );
          }),
          switchMap(() => {
            return this.hashPassword(password).pipe(
              switchMap((hashedPassword: string) => {
                return from(
                  this.userRepository.save({
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                  }),
                ).pipe(
                  map((user: User) => {
                    delete user.password;
                    return user;
                  }),
                );
              }),
            );
          }),
        );
      }

      validateUser(email: string, password: string): Observable<User> {
        return from(
          this.userRepository.findOne(
            { where: { email }, select: ['id', 'email', 'password'] }
          )
        ).pipe(
          switchMap((user: User) => {
            if (!user) {
              throw new HttpException(
                { status: HttpStatus.FORBIDDEN, error: 'Invalid Credentials' },
                HttpStatus.FORBIDDEN,
              );
            }
            return from(bcrypt.compare(password, user.password)).pipe(
              map((isValidPassword: boolean) => {
                if (isValidPassword) {
                  delete user.password;
                  return user;
                } else {
                  throw new HttpException(
                    { status: HttpStatus.FORBIDDEN, error: 'Invalid Credentials' },
                    HttpStatus.FORBIDDEN,
                  );
                }
              }),
            );
          }),
        );
    }


   
  login(user: User): Observable<User> {
    const { email, password } = user;
    return this.validateUser(email, password).pipe(
      switchMap((validatedUser: User) => {
        if (validatedUser) {
          return from(this.userRepository.findOne({
            where: { email },
            relations: ['wallets'],
          })).pipe(
            map((userWithRelations: User | null) => {
              if (!userWithRelations) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
              }
              delete userWithRelations.password;
              return userWithRelations;
            })
          );
        } else {
          throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
      }),
    );
  }

    /**
     * 
     * @param id req.param.id User Id
     * @returns Deleted User
     */
    deleteUser(id: number): Observable<DeleteResult> {
        return from(this.userRepository.delete(id))
    }
    
}
