// src/middleware/validateDto.ts
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validateDto<T>(dtoClass: new () => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToInstance(dtoClass, req.body);

    const errors = await validate(dtoObject as object, {
      whitelist: true,           // strip unknown fields
      forbidNonWhitelisted: true // error on unknown fields
    });

    if (errors.length > 0) {
      const formatted = errors.map((err) => ({
        field: err.property,
        constraints: err.constraints,
      }));

      return res.status(400).json({
        message: 'Validation failed',
        errors: formatted,
      });
    }

    // optionally replace body with the validated DTO instance
    req.body = dtoObject;

    return next();
  };
}
