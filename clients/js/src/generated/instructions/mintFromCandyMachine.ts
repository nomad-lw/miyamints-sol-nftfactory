/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  findCollectionAuthorityRecordPda,
  findMasterEditionPda,
  findMetadataPda,
} from '@metaplex-foundation/mpl-token-metadata';
import {
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  array,
  mapSerializer,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { findCandyMachineAuthorityPda } from '../../hooked';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  expectPublicKey,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type MintFromCandyMachineInstructionAccounts = {
  /** Candy machine account. */
  candyMachine: PublicKey | Pda;
  /**
   * Candy machine authority account. This is the account that holds a delegate
   * to verify an item into the collection.
   *
   */

  authorityPda?: PublicKey | Pda;
  /** Candy machine mint authority (mint only allowed for the mint_authority). */
  mintAuthority: Signer;
  /** Payer for the transaction and account allocation (rent). */
  payer?: Signer;
  /**
   * Mint account of the NFT. The account will be initialized if necessary.
   *
   */

  nftMint: PublicKey | Pda;
  /** Mint authority of the NFT. In most cases this will be the owner of the NFT. */
  nftMintAuthority?: Signer;
  /**
   * Metadata account of the NFT. This account must be uninitialized.
   *
   */

  nftMetadata?: PublicKey | Pda;
  /**
   * Master edition account of the NFT. The account will be initialized if necessary.
   *
   */

  nftMasterEdition?: PublicKey | Pda;
  /**
   * Collection authority record account is either the delegated authority record (legacy)
   * or a metadata delegate record for the `authority_pda`. The delegate is set when a new collection
   * is set to the candy machine.
   *
   */

  collectionAuthorityRecord?: PublicKey | Pda;
  /**
   * Mint account of the collection NFT.
   *
   */

  collectionMint: PublicKey | Pda;
  /**
   * Metadata account of the collection NFT.
   *
   */

  collectionMetadata?: PublicKey | Pda;
  /**
   * Master edition account of the collection NFT.
   *
   */

  collectionMasterEdition?: PublicKey | Pda;
  /**
   * Update authority of the collection NFT.
   *
   */

  collectionUpdateAuthority: PublicKey | Pda;
  /**
   * Token Metadata program.
   *
   */

  tokenMetadataProgram?: PublicKey | Pda;
  /** SPL Token program. */
  tokenProgram?: PublicKey | Pda;
  /** System program. */
  systemProgram?: PublicKey | Pda;
  /**
   * SlotHashes sysvar cluster data.
   *
   */

  recentSlothashes?: PublicKey | Pda;
};

// Data.
export type MintFromCandyMachineInstructionData = {
  discriminator: Array<number>;
};

export type MintFromCandyMachineInstructionDataArgs = {};

export function getMintFromCandyMachineInstructionDataSerializer(): Serializer<
  MintFromCandyMachineInstructionDataArgs,
  MintFromCandyMachineInstructionData
> {
  return mapSerializer<
    MintFromCandyMachineInstructionDataArgs,
    any,
    MintFromCandyMachineInstructionData
  >(
    struct<MintFromCandyMachineInstructionData>(
      [['discriminator', array(u8(), { size: 8 })]],
      { description: 'MintFromCandyMachineInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [51, 57, 225, 47, 182, 146, 137, 166],
    })
  ) as Serializer<
    MintFromCandyMachineInstructionDataArgs,
    MintFromCandyMachineInstructionData
  >;
}

// Instruction.
export function mintFromCandyMachine(
  context: Pick<Context, 'eddsa' | 'identity' | 'payer' | 'programs'>,
  input: MintFromCandyMachineInstructionAccounts
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplCandyMachineCore',
    'M1YA9A1YxA8kUeqpuURd3RXTQzXu2ZbotA4dLLetFNQ'
  );

  // Accounts.
  const resolvedAccounts: ResolvedAccountsWithIndices = {
    candyMachine: {
      index: 0,
      isWritable: true,
      value: input.candyMachine ?? null,
    },
    authorityPda: {
      index: 1,
      isWritable: true,
      value: input.authorityPda ?? null,
    },
    mintAuthority: {
      index: 2,
      isWritable: false,
      value: input.mintAuthority ?? null,
    },
    payer: { index: 3, isWritable: true, value: input.payer ?? null },
    nftMint: { index: 4, isWritable: true, value: input.nftMint ?? null },
    nftMintAuthority: {
      index: 5,
      isWritable: false,
      value: input.nftMintAuthority ?? null,
    },
    nftMetadata: {
      index: 6,
      isWritable: true,
      value: input.nftMetadata ?? null,
    },
    nftMasterEdition: {
      index: 7,
      isWritable: true,
      value: input.nftMasterEdition ?? null,
    },
    collectionAuthorityRecord: {
      index: 8,
      isWritable: false,
      value: input.collectionAuthorityRecord ?? null,
    },
    collectionMint: {
      index: 9,
      isWritable: false,
      value: input.collectionMint ?? null,
    },
    collectionMetadata: {
      index: 10,
      isWritable: true,
      value: input.collectionMetadata ?? null,
    },
    collectionMasterEdition: {
      index: 11,
      isWritable: false,
      value: input.collectionMasterEdition ?? null,
    },
    collectionUpdateAuthority: {
      index: 12,
      isWritable: false,
      value: input.collectionUpdateAuthority ?? null,
    },
    tokenMetadataProgram: {
      index: 13,
      isWritable: false,
      value: input.tokenMetadataProgram ?? null,
    },
    tokenProgram: {
      index: 14,
      isWritable: false,
      value: input.tokenProgram ?? null,
    },
    systemProgram: {
      index: 15,
      isWritable: false,
      value: input.systemProgram ?? null,
    },
    recentSlothashes: {
      index: 16,
      isWritable: false,
      value: input.recentSlothashes ?? null,
    },
  };

  // Default values.
  if (!resolvedAccounts.authorityPda.value) {
    resolvedAccounts.authorityPda.value = findCandyMachineAuthorityPda(
      context,
      { candyMachine: expectPublicKey(resolvedAccounts.candyMachine.value) }
    );
  }
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.nftMintAuthority.value) {
    resolvedAccounts.nftMintAuthority.value = context.identity;
  }
  if (!resolvedAccounts.nftMetadata.value) {
    resolvedAccounts.nftMetadata.value = findMetadataPda(context, {
      mint: expectPublicKey(resolvedAccounts.nftMint.value),
    });
  }
  if (!resolvedAccounts.nftMasterEdition.value) {
    resolvedAccounts.nftMasterEdition.value = findMasterEditionPda(context, {
      mint: expectPublicKey(resolvedAccounts.nftMint.value),
    });
  }
  if (!resolvedAccounts.collectionAuthorityRecord.value) {
    resolvedAccounts.collectionAuthorityRecord.value =
      findCollectionAuthorityRecordPda(context, {
        mint: expectPublicKey(resolvedAccounts.collectionMint.value),
        collectionAuthority: expectPublicKey(
          resolvedAccounts.authorityPda.value
        ),
      });
  }
  if (!resolvedAccounts.collectionMetadata.value) {
    resolvedAccounts.collectionMetadata.value = findMetadataPda(context, {
      mint: expectPublicKey(resolvedAccounts.collectionMint.value),
    });
  }
  if (!resolvedAccounts.collectionMasterEdition.value) {
    resolvedAccounts.collectionMasterEdition.value = findMasterEditionPda(
      context,
      { mint: expectPublicKey(resolvedAccounts.collectionMint.value) }
    );
  }
  if (!resolvedAccounts.tokenMetadataProgram.value) {
    resolvedAccounts.tokenMetadataProgram.value = context.programs.getPublicKey(
      'mplTokenMetadata',
      'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
    );
    resolvedAccounts.tokenMetadataProgram.isWritable = false;
  }
  if (!resolvedAccounts.tokenProgram.value) {
    resolvedAccounts.tokenProgram.value = context.programs.getPublicKey(
      'splToken',
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
    );
    resolvedAccounts.tokenProgram.isWritable = false;
  }
  if (!resolvedAccounts.systemProgram.value) {
    resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
      'splSystem',
      '11111111111111111111111111111111'
    );
    resolvedAccounts.systemProgram.isWritable = false;
  }
  if (!resolvedAccounts.recentSlothashes.value) {
    resolvedAccounts.recentSlothashes.value = publicKey(
      'SysvarS1otHashes111111111111111111111111111'
    );
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'programId',
    programId
  );

  // Data.
  const data = getMintFromCandyMachineInstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
