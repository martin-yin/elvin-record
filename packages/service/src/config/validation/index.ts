import { HttpStatus } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IsNumber, validateSync } from 'class-validator';
import { ApiException } from '../../common/exceptions/api.exception';

class EnvironmentVariables {
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
      throw new ApiException(
        constraints[key],
        HttpStatus.INTERNAL_SERVER_ERROR,
        500,
      );
    }
  }

  return validatedConfig;
}
