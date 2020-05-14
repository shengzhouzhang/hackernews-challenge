import _fetch, { Response } from 'node-fetch';

export const fetch = (uri: string): Promise<Response> => _fetch(uri);
