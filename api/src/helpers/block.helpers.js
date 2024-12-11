export function formatDate() {
  let date = new Date();

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export function validateWalletAddress(string) {
  const pattern = /^@\w+\.wallet$/;
  return pattern.test(string);
}

export async function validateWalletBalance(privateKey, privateKeyHash) {
  if (privateKeyHash === encryptPrivateKey(privateKey)) return true;

  return false;
}
