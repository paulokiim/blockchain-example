import crypto from 'crypto';

const createHash = (data: string): string =>
  crypto.createHash('sha256').update(data).digest('hex');

export { createHash };
