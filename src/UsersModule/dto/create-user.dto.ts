import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Must be informed your first name.' })
    first_name: string;

    @IsNotEmpty({ message: 'Must be informed your last name.' })
    last_name: string;

    @IsNotEmpty({ message: 'Must be informed your avatar string.' })
    avatar: string;

    @IsEmail(undefined, {
        message: 'The e-mail sent doesnt seems to be a valid one',
    })
    @IsNotEmpty({ message: 'Must be informed your email.' })
    email: string;
}
