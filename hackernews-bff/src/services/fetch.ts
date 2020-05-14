import _fetch, { Response } from 'node-fetch';

export const fetch = (uri: string): Response => _fetch(uri);
