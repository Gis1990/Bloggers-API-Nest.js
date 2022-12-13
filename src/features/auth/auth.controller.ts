import { Body, Controller, HttpCode, Post, UseGuards, Res, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { InputModelForCreatingNewUser } from "../users/dto/users.dto";
import { CurrentUserModel, InputModelForCode, InputModelForResendingEmail } from "./dto/auth.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { Response } from "express";
import { AccessTokenClass } from "./entities/auth.entity";
import { JwtRefreshTokenAuthGuard } from "./guards/jwtRefreshToken-auth.guard";
import { CurrentUserId, CurrentUser } from "./auth.cutsom.decorators";
import { userDevicesDataClass } from "../users/entities/users.entity";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("registration-confirmation")
    @HttpCode(204)
    async confirmRegistration(@Body() body: InputModelForCode): Promise<boolean> {
        return await this.authService.confirmEmail(body.code);
    }

    @Post("registration")
    @HttpCode(204)
    async createBlog(@Body() dto: InputModelForCreatingNewUser): Promise<boolean> {
        return await this.authService.createUserWithConfirmationEmail(dto);
    }

    @Post("registration-email-resending")
    @HttpCode(204)
    async registrationEmailResending(@Body() dto: InputModelForResendingEmail): Promise<boolean> {
        return await this.authService.registrationEmailResending(dto);
    }

    @UseGuards(LocalAuthGuard)
    @Post("login")
    @HttpCode(200)
    async login(
        @CurrentUserId() userId: string,
        userDevicesData: userDevicesDataClass,
        @Res({ passthrough: true }) response: Response,
    ): Promise<AccessTokenClass> {
        const result = await this.authService.refreshAllTokens(userId, userDevicesData);
        const accessToken = result[0];
        const refreshToken = result[1];
        response.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 200000 * 1000, // 20 seconds
        });
        return new AccessTokenClass(accessToken);
    }

    @UseGuards(JwtRefreshTokenAuthGuard)
    @Post("refresh-token")
    @HttpCode(200)
    async refreshAllTokens(
        @CurrentUserId() userId: string,
        userDevicesData: userDevicesDataClass,
        @Res({ passthrough: true }) response: Response,
    ): Promise<AccessTokenClass> {
        const result = await this.authService.refreshAllTokens(userId, userDevicesData);
        const accessToken = result[0];
        const refreshToken = result[1];
        response.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 200000 * 1000, // 20 seconds
        });
        return new AccessTokenClass(accessToken);
    }

    @UseGuards(JwtRefreshTokenAuthGuard)
    @Post("logout")
    @HttpCode(204)
    async logout(
        @CurrentUserId() userId: string,
        userDevicesData: userDevicesDataClass,
        @Res({ passthrough: true }) response: Response,
    ): Promise<void> {
        const newRefreshToken = await this.authService.refreshOnlyRefreshToken(userId, userDevicesData);
        response.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 200000 * 1000, // 20 seconds
        });
        return;
    }

    @UseGuards(JwtRefreshTokenAuthGuard)
    @Get("me")
    @HttpCode(200)
    async me(@CurrentUser() user: CurrentUserModel): Promise<CurrentUserModel> {
        return user;
    }
}
