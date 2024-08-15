import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocationDto } from '../dto/location.dto';
import { LocationService } from '../service/location.service';

@ApiTags('Locations')
@Controller('locations')
export class LocationController {
  constructor(private readonly locationsService: LocationService) {}

  @Get('')
  async getLocations(): Promise<LocationDto[]> {
    return this.locationsService.getLocations();
  }
}
