import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppStatus(baseUrl: string) {
    return {
      status: 'Gestão Back Api is running! 🚀',
      docs: baseUrl + '/api',
    };
  }
}
