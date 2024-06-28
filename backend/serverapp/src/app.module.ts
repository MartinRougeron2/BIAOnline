import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ServicesModule } from './services/services.module';
import { VendorsModule } from './vendors/vendors.module';
import { AdminpanelModule } from './adminpanel/adminpanel.module';
import { ActivitiesModule } from './activities/activities.module';
import { TeamsModule } from './teams/teams.module';
import { ImpactsModule } from './impacts/impacts.module';
import { ViewsModule } from './views/views.module';
import { AuthModule } from './auth/auth.module';
import { AppsModule } from './apps/apps.module';

@Module({
  imports: [PrismaModule, ViewsModule, ImpactsModule, TeamsModule, ActivitiesModule, AdminpanelModule, VendorsModule, ServicesModule, AppsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
