import * as crypto from 'crypto';

export const hashPwd = (p: string): string => {
  const hmac = crypto.createHmac(
    'sha512',
    'nvxmhfs874234-0239fshfkscvcxmv,mwe98f347r239r',
  );
  hmac.update(p);
  return hmac.digest('hex');
};
