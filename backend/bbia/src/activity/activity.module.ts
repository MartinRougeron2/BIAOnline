import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { ImpactService } from 'src/impact/impact.service';

@Module({
  controllers: [ActivityController],
  providers: [ActivityService, ImpactService],
})
export class ActivityModule {}
