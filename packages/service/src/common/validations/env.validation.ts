import { HttpStatus } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, validateSync } from 'class-validator';
import { Environment } from '../enums';
import { ApiException } from '../exceptions';

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;
}

export function EnvValidate(config: Record<string, any>): Record<string, any> {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    enableDebugMessages: true,
    skipMissingProperties: false,
    stopAtFirstError: true,
  });

  if (errors.length > 0) {
    const firstError = errors.shift();
    const { constraints } = firstError;

    for (const key in constraints) {
      throw new ApiException(constraints[key], HttpStatus.NOT_IMPLEMENTED);
    }
  }

  return validatedConfig;
}
