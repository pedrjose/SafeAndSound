export function BlockchainNode(transaction) {
  this.transaction = transaction;
  this.prevHash = null;
  this.hash = null;
  this.nonce = null;
  this.minerRecord = null;
  this.next = null;
}
