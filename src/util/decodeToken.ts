interface DecodedJWT {
    header: Record<string, unknown>;
    payload: Record<string, unknown>;
    signature: string;
  }
  
  export function decodeJWT(token: string): DecodedJWT {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('The token is invalid');
    }
  
    const decoded = parts.slice(0, 2).map(part => {
      const decodedPart = atob(part.replace(/-/g, '+').replace(/_/g, '/'));
      try {
        return JSON.parse(decodedPart);
      } catch (e) {
        throw new Error('Failed to parse the token parts');
      }
    }) as [Record<string, unknown>, Record<string, unknown>];
  
    return {
      header: decoded[0],
      payload: decoded[1],
      signature: parts[2],
    };
  }
  
  
  