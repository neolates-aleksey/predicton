export function addressToShort(address: string) {
  if (address.length <= 6) {
    return address;
  }

  return address.substring(0, 3) + "..." + address.substring(address.length - 3);
}
