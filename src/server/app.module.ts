import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { checkAuthMiddleware } from "./common/checkAuthMiddleware";
import { ImageModule } from "./images/image.module";
import { ConfigModule } from "@nestjs/config";
import { LikesModule } from "./likes/likes.module";
import { HistoryModule } from "./history/history.module";

@Module({
  imports: [UsersModule, ImageModule, LikesModule, HistoryModule, ConfigModule.forRoot()],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(checkAuthMiddleware).exclude("/api/users/(.*)").forRoutes("/");
  }
}
