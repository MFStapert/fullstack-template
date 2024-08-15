import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocationDto } from '../dto/location.dto';
import { LocationsService } from '../services/locations.service';

@ApiTags('Location')
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get('')
  async getLocations(): Promise<LocationDto[]> {
    return this.locationsService.getLocations();
  }
}
