import 'zone.js';
import { Request, Response, NextFunction } from 'express';
import { Middleware, NestMiddleware } from '@nestjs/common';

export type ExpressZoneSpecFactory<T = any> = (
  req: Request,
  res: Response,
) => ZoneSpec | PromiseLike<ZoneSpec>;

export abstract class ZoneMiddleware implements NestMiddleware {
  constructor() {}
  resolve() {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        const zoneSpec = await this.zoneSpecFactory(req, res);
        Zone.current
          .fork(zoneSpec)
          .fork(Zone['longStackTraceZoneSpec'])
          .run(async () => {
            await next();
          });
      } catch (ex) {
        next(ex);
      }
    };
  }

  abstract zoneSpecFactory: ExpressZoneSpecFactory;

  static create<T>(
    zoneSpecFactory: ExpressZoneSpecFactory,
  ): typeof ZoneMiddleware {
    @Middleware()
    class ZoneMiddlewareImplementation extends ZoneMiddleware {
      zoneSpecFactory = zoneSpecFactory;
    }

    return ZoneMiddlewareImplementation;
  }
}
