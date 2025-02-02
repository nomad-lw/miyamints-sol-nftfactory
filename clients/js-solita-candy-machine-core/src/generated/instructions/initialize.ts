/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { CandyMachineData, candyMachineDataBeet } from '../types/CandyMachineData';

/**
 * @category Instructions
 * @category Initialize
 * @category generated
 */
export type InitializeInstructionArgs = {
  data: CandyMachineData;
};
/**
 * @category Instructions
 * @category Initialize
 * @category generated
 */
export const initializeStruct = new beet.FixableBeetArgsStruct<
  InitializeInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['data', candyMachineDataBeet],
  ],
  'InitializeInstructionArgs',
);
/**
 * Accounts required by the _initialize_ instruction
 *
 * @property [_writable_] candyMachine
 * @property [_writable_] authorityPda
 * @property [] authority
 * @property [**signer**] payer
 * @property [] collectionMetadata
 * @property [] collectionMint
 * @property [] collectionMasterEdition
 * @property [_writable_, **signer**] collectionUpdateAuthority
 * @property [_writable_] collectionAuthorityRecord
 * @property [] tokenMetadataProgram
 * @category Instructions
 * @category Initialize
 * @category generated
 */
export type InitializeInstructionAccounts = {
  candyMachine: web3.PublicKey;
  authorityPda: web3.PublicKey;
  authority: web3.PublicKey;
  payer: web3.PublicKey;
  collectionMetadata: web3.PublicKey;
  collectionMint: web3.PublicKey;
  collectionMasterEdition: web3.PublicKey;
  collectionUpdateAuthority: web3.PublicKey;
  collectionAuthorityRecord: web3.PublicKey;
  tokenMetadataProgram: web3.PublicKey;
  systemProgram?: web3.PublicKey;
  anchorRemainingAccounts?: web3.AccountMeta[];
};

export const initializeInstructionDiscriminator = [175, 175, 109, 31, 13, 152, 155, 237];

/**
 * Creates a _Initialize_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category Initialize
 * @category generated
 */
export function createInitializeInstruction(
  accounts: InitializeInstructionAccounts,
  args: InitializeInstructionArgs,
  programId = new web3.PublicKey('M1YA9A1YxA8kUeqpuURd3RXTQzXu2ZbotA4dLLetFNQ'),
) {
  const [data] = initializeStruct.serialize({
    instructionDiscriminator: initializeInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.candyMachine,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.authorityPda,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.authority,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.payer,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: accounts.collectionMetadata,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.collectionMint,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.collectionMasterEdition,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.collectionUpdateAuthority,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.collectionAuthorityRecord,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.tokenMetadataProgram,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.systemProgram ?? web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
  ];

  if (accounts.anchorRemainingAccounts != null) {
    for (const acc of accounts.anchorRemainingAccounts) {
      keys.push(acc);
    }
  }

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  });
  return ix;
}
