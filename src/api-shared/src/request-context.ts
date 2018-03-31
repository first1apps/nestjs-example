import * as uuidLib from 'uuid';

import { Request, Response } from 'express';

export class RequestContext {
  static readonly zoneKey = 'RequestContext1';

  readonly uuid = uuidLib();

  constructor(request: Request, response: Response) {}

  static current(): RequestContext {
    return Zone.current.get(RequestContext.zoneKey);
  }
}
