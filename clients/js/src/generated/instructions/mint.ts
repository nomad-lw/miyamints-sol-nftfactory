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
  Option,
  OptionOrNullable,
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
  bytes,
  mapSerializer,
  option,
  string,
  struct,
  u32,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { findCandyGuardPda, findCandyMachineAuthorityPda } from '../../hooked';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  expectPublicKey,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type MintInstructionAccounts = {
  candyGuard?: PublicKey | Pda;
  candyMachineProgram?: PublicKey | Pda;
  candyMachine: PublicKey | Pda;
  candyMachineAuthorityPda?: PublicKey | Pda;
  payer?: Signer;
  nftMetadata?: PublicKey | Pda;
  nftMint: PublicKey | Pda;
  nftMintAuthority?: Signer;
  nftMasterEdition?: PublicKey | Pda;
  collectionAuthorityRecord?: PublicKey | Pda;
  collectionMint: PublicKey | Pda;
  collectionMetadata?: PublicKey | Pda;
  collectionMasterEdition?: PublicKey | Pda;
  collectionUpdateAuthority: PublicKey | Pda;
  tokenMetadataProgram?: PublicKey | Pda;
  tokenProgram?: PublicKey | Pda;
  systemProgram?: PublicKey | Pda;
  recentSlothashes?: PublicKey | Pda;
  instructionSysvarAccount?: PublicKey | Pda;
};

// Data.
export type MintInstructionData = {
  discriminator: Array<number>;
  mintArgs: Uint8Array;
  group: Option<string>;
};

export type MintInstructionDataArgs = {
  mintArgs: Uint8Array;
  group: OptionOrNullable<string>;
};

export function getMintInstructionDataSerializer(): Serializer<
  MintInstructionDataArgs,
  MintInstructionData
> {
  return mapSerializer<MintInstructionDataArgs, any, MintInstructionData>(
    struct<MintInstructionData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['mintArgs', bytes({ size: u32() })],
        ['group', option(string())],
      ],
      { description: 'MintInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [51, 57, 225, 47, 182, 146, 137, 166],
    })
  ) as Serializer<MintInstructionDataArgs, MintInstructionData>;
}

// Args.
export type MintInstructionArgs = MintInstructionDataArgs;

// Instruction.
export function mint(
  context: Pick<Context, 'eddsa' | 'identity' | 'payer' | 'programs'>,
  input: MintInstructionAccounts & MintInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplCandyGuard',
    'M1YAQdqp2JyDxVreYxuhox7tkU84exrzW1AGuFu3Ek6'
  );

  // Accounts.
  const resolvedAccounts: ResolvedAccountsWithIndices = {
    candyGuard: {
      index: 0,
      isWritable: false,
      value: input.candyGuard ?? null,
    },
    candyMachineProgram: {
      index: 1,
      isWritable: false,
      value: input.candyMachineProgram ?? null,
    },
    candyMachine: {
      index: 2,
      isWritable: true,
      value: input.candyMachine ?? null,
    },
    candyMachineAuthorityPda: {
      index: 3,
      isWritable: true,
      value: input.candyMachineAuthorityPda ?? null,
    },
    payer: { index: 4, isWritable: true, value: input.payer ?? null },
    nftMetadata: {
      index: 5,
      isWritable: true,
      value: input.nftMetadata ?? null,
    },
    nftMint: { index: 6, isWritable: true, value: input.nftMint ?? null },
    nftMintAuthority: {
      index: 7,
      isWritable: false,
      value: input.nftMintAuthority ?? null,
    },
    nftMasterEdition: {
      index: 8,
      isWritable: true,
      value: input.nftMasterEdition ?? null,
    },
    collectionAuthorityRecord: {
      index: 9,
      isWritable: false,
      value: input.collectionAuthorityRecord ?? null,
    },
    collectionMint: {
      index: 10,
      isWritable: false,
      value: input.collectionMint ?? null,
    },
    collectionMetadata: {
      index: 11,
      isWritable: true,
      value: input.collectionMetadata ?? null,
    },
    collectionMasterEdition: {
      index: 12,
      isWritable: false,
      value: input.collectionMasterEdition ?? null,
    },
    collectionUpdateAuthority: {
      index: 13,
      isWritable: false,
      value: input.collectionUpdateAuthority ?? null,
    },
    tokenMetadataProgram: {
      index: 14,
      isWritable: false,
      value: input.tokenMetadataProgram ?? null,
    },
    tokenProgram: {
      index: 15,
      isWritable: false,
      value: input.tokenProgram ?? null,
    },
    systemProgram: {
      index: 16,
      isWritable: false,
      value: input.systemProgram ?? null,
    },
    recentSlothashes: {
      index: 17,
      isWritable: false,
      value: input.recentSlothashes ?? null,
    },
    instructionSysvarAccount: {
      index: 18,
      isWritable: false,
      value: input.instructionSysvarAccount ?? null,
    },
  };

  // Arguments.
  const resolvedArgs: MintInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.candyGuard.value) {
    resolvedAccounts.candyGuard.value = findCandyGuardPda(context, {
      base: expectPublicKey(resolvedAccounts.candyMachine.value),
    });
  }
  if (!resolvedAccounts.candyMachineProgram.value) {
    resolvedAccounts.candyMachineProgram.value = context.programs.getPublicKey(
      'mplCandyMachine',
      'M1YA9A1YxA8kUeqpuURd3RXTQzXu2ZbotA4dLLetFNQ'
    );
    resolvedAccounts.candyMachineProgram.isWritable = false;
  }
  if (!resolvedAccounts.candyMachineAuthorityPda.value) {
    resolvedAccounts.candyMachineAuthorityPda.value =
      findCandyMachineAuthorityPda(context, {
        candyMachine: expectPublicKey(resolvedAccounts.candyMachine.value),
      });
  }
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.nftMetadata.value) {
    resolvedAccounts.nftMetadata.value = findMetadataPda(context, {
      mint: expectPublicKey(resolvedAccounts.nftMint.value),
    });
  }
  if (!resolvedAccounts.nftMintAuthority.value) {
    resolvedAccounts.nftMintAuthority.value = context.identity;
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
          resolvedAccounts.candyMachineAuthorityPda.value
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
  if (!resolvedAccounts.instructionSysvarAccount.value) {
    resolvedAccounts.instructionSysvarAccount.value = publicKey(
      'Sysvar1nstructions1111111111111111111111111'
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
  const data = getMintInstructionDataSerializer().serialize(
    resolvedArgs as MintInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
