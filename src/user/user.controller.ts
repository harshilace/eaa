import { Controller, Get, HttpException, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
    constructor(private userService: UserService) { }
    
    @Get('/list')
    @ApiResponse({ status: 200, description: 'User list getting successfully.'})
    @ApiResponse({ status: 401, description: 'Unauthorized.'})
    async getUsers(@I18n() i18n: I18nContext) {
        const users = await this.userService.getUsers();
        return {
            'users' : users,
            'message' : i18n.t(`lang.user.list`)
        };
    }

    @Get(':userID')
    @ApiResponse({ status: 200, description: 'Data get successfully.'})
    @ApiResponse({ status: 403, description: 'User does not exist!.'})
    @ApiResponse({ status: 401, description: 'Unauthorized.'})
    async getUser(@Param('userID', ParseIntPipe) userID: Number, @I18n() i18n: I18nContext) {
        const user = await this.userService.getUser(userID);
        if (user) {
            return {
                'user' : user,
                'message' : i18n.t(`lang.data_success`)
            };
        }
        throw new HttpException(i18n.t(`lang.user.not_found`), 404);
    }
}
