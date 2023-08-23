import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @Get('/list')
    async getUsers(@I18n() i18n: I18nContext) {
        const users = await this.userService.getUsers();
        return {
            'users' : users,
            'message' : i18n.t(`lang.user.list`)
        };
    }

    @Get(':userID')
    async getUser(@Param('userID', ParseIntPipe) userID: Number, @I18n() i18n: I18nContext) {
        const user = await this.userService.getUser(userID);
        return {
            'users' : user,
            'message' : i18n.t(`lang.user.list`)
        };
    }
}
