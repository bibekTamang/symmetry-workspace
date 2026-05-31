import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from 'zod';

export const validateRequest = (schema: ZodType) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
       const formattedErrors = error.issues.reduce((acc: Record<string, string>, curr) => {
          const path = curr.path.join('.');
          acc[path] = curr.message;
          return acc;
        }, {});

        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: formattedErrors,
        });
        return;
      }

      res.status(500).json({ success: false, message: 'Internal server error during validation' });
    }
  };
};