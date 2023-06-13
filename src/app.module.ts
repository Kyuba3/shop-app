import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsInCartModule } from './products-in-cart/products-in-cart.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import configuration from './config/configuration';
import * as cors from 'cors';

@Module({
  imports: [
    ProductsModule,
    OrdersModule,
    PrismaModule,
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    UsersModule,
    AuthModule,
    ProductsInCartModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'client', 'build'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(cors({ credentials: true, origin: 'http://localhost:3001' }))
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
