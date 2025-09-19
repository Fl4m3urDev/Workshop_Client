import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { configuration } from './configs/configuration';
import { UsersModule } from './routes/users/users.module';
import { CategoriesModule } from './routes/categories/categories.module';
import { ArticlesModule } from './routes/articles/articles.module';
import { UserInterestsModule } from './routes/userinterests/userinterests.module';
import { UserActionsModule } from './routes/useractions/useractions.module';
import { TagsModule } from './routes/tags/tags.module';
import { ArticleTagsModule } from './routes/articletags/articletags.module';

@Module({
  imports: [
    UsersModule,
    CategoriesModule,
    ArticlesModule,
    UserInterestsModule,
    UserActionsModule,
    TagsModule,
    ArticleTagsModule,
    ConfigModule.forRoot({ load: [configuration], ignoreEnvFile: true, isGlobal: true }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('mailerSmtpHost'),
          port: configService.get('mailerSmtpPort'),
          secure: false,
          tls: { rejectUnauthorized: false },
        },
        defaults: {
          from: configService.get('mailerDefaultFrom'),
        },
        template: {
          dir: __dirname + '/../templates/mails',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
