import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { ImpactModule } from './impact/impact.module';
import { TeamModule } from './team/team.module';
import { ActivityModule } from './activity/activity.module';
import { AdminpanelModule } from './adminpanel/adminpanel.module';
import { VendorModule } from './vendor/vendor.module';
import { ServiceModule } from './service/service.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [DashboardModule, ImpactModule, TeamModule, ActivityModule, AdminpanelModule, VendorModule, ServiceModule, AuthModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
