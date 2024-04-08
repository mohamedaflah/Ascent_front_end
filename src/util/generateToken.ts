// eslint-disable-next-line @typescript-eslint/no-explicit-any
function base64url(source: any) {
  console.log("🚀 ~ base64url ~ source:", source)
  let encodedSource = btoa(JSON.stringify(source));
  encodedSource = encodedSource.replace(/=+$/, "");
  encodedSource = encodedSource.replace(/\+/g, "-");
  encodedSource = encodedSource.replace(/\//g, "_");

  return encodedSource;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateToken(payload: any) {
  const encodedHeader = base64url({ alg: "HS256", typ: "JWT" });
  const encodedPayload = base64url(payload);
  const signature = "signature";

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}
