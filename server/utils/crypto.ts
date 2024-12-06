import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
});

interface VerifyOptions {
  amount: number;
  recipient: string;
}

export async function verifyTransaction(
  hash: string,
  options: VerifyOptions
): Promise<boolean> {
  try {
    const transaction = await publicClient.getTransaction({ hash });
    
    if (!transaction) {
      return false;
    }

    // Verify recipient
    if (transaction.to?.toLowerCase() !== options.recipient.toLowerCase()) {
      return false;
    }

    // Verify amount (with some tolerance for gas)
    const tolerance = 0.001; // 0.1%
    const actualAmount = Number(transaction.value);
    const expectedAmount = options.amount;
    const difference = Math.abs(actualAmount - expectedAmount);
    
    if (difference / expectedAmount > tolerance) {
      return false;
    }

    // Verify confirmations
    const block = await publicClient.getBlock({ blockHash: transaction.blockHash! });
    const latestBlock = await publicClient.getBlockNumber();
    const confirmations = Number(latestBlock) - Number(block.number);
    
    return confirmations >= 3;
  } catch (error) {
    console.error('Transaction verification failed:', error);
    return false;
  }
}