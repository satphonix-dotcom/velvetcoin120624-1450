import { createHash, randomBytes } from 'crypto';

// Secure hash function using SHA-512
export const hashData = (data, salt = randomBytes(32).toString('hex')) => {
  const hash = createHash('sha512');
  hash.update(data + salt);
  return {
    hash: hash.digest('hex'),
    salt
  };
};

// Constant time comparison to prevent timing attacks
export const safeCompare = (a, b) => {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return false;
  }

  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
};

// Generate cryptographically secure random token
export const generateSecureToken = (length = 32) => {
  return randomBytes(length).toString('hex');
};

// Encrypt sensitive data
export const encryptData = (data, key) => {
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return {
    encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex')
  };
};

// Decrypt sensitive data
export const decryptData = (encrypted, key, iv, authTag) => {
  const decipher = createDecipheriv(
    'aes-256-gcm',
    key,
    Buffer.from(iv, 'hex')
  );
  
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
};