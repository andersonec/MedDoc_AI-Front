import * as dotenv from 'dotenv';

export function loadEnvironment(): { [key: string]: string } {
  return {
    API_URL: 'http://localhost:3000',
    APP_NAME: 'MedDoc_ai',
    API_KEY: '{{token}}'
  };
}