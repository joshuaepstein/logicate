export const hashToken = async (
  token: string,
  {
    secret = false,
  }: {
    secret?: boolean;
  } = {}
) => {
  const encoder = new TextEncoder();

  const data = encoder.encode(`${token}${secret ? process.env.SECRET_PASSWORD : ''}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};
