import 'zone.js';
import { Request, Response, NextFunction } from 'express';
import { Middleware, NestMiddleware } from '@nestjs/common';

export type ContextFactory = (
  Request: any,
  Response: any,
) => any | PromiseLike<any>;

export class RequestContextMiddleware implements NestMiddleware {
  constructor() {}
  resolve() {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        const requestContext = await this.makeContext(req, res);
        const contextName = this.getContextName();
        Zone.current
          .fork({
            name: contextName,
            properties: {
              [contextName]: requestContext,
            },
          })
          .fork(Zone['longStackTraceZoneSpec'])
          .run(async () => {
            await next();
          });
      } catch (ex) {
        next(ex);
      }
    };
  }

  getContextName: () => string;
  makeContext: ContextFactory;

  static for<T>(
    contextName: string,
    makeContext: ContextFactory,
  ): typeof RequestContextMiddleware {
    @Middleware()
    class RealRequestContextMiddleware extends RequestContextMiddleware {
      getContextName = () => contextName;
      makeContext = makeContext;
    }

    return RealRequestContextMiddleware;
  }
}
