import { Controller, Get, HttpException, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    
    @ApiResponse({ status: 200, description: 'User list getting successfully.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 401, description: 'Unauthorized.'})
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
        if (user) {
            return {
                'user' : user,
                'message' : i18n.t(`lang.user.list`)
            };
        }
        throw new HttpException(i18n.t(`lang.user.not_found`), 404);
    }
}
