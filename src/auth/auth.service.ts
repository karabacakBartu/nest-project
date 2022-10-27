import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { ClientService } from '../client/client.service';

@Injectable()
export class AuthService {
  constructor(private readonly clientService: ClientService) {}
}
