import { Resolver } from '@nestjs/graphql';
import { ViewsService } from './views.service';

@Resolver('View')
export class ViewsResolver {
  constructor(private readonly viewsService: ViewsService) {}
}
