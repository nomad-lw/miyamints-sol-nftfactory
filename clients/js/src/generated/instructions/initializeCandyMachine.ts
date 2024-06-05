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
  Amount,
  Context,
  Option,
  OptionOrNullable,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  mapAmountSerializer,
  none,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  array,
  bool,
  mapSerializer,
  option,
  string,
  struct,
  u16,
  u64,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { findCandyMachineAuthorityPda } from '../../hooked';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  expectPublicKey,
  getAccountMetasAndSigners,
} from '../shared';
import {
  ConfigLineSettings,
  ConfigLineSettingsArgs,
  Creator,
  CreatorArgs,
  HiddenSettings,
  HiddenSettingsArgs,
  getConfigLineSettingsSerializer,
  getCreatorSerializer,
  getHiddenSettingsSerializer,
} from '../types';

// Accounts.
export type InitializeCandyMachineInstructionAccounts = {
  /**
   * Candy Machine account. The account space must be allocated to allow accounts larger
   * than 10kb.
   *
   */

  candyMachine: PublicKey | Pda;
  /**
   * Authority PDA used to verify minted NFTs to the collection.
   *
   */

  authorityPda?: PublicKey | Pda;
  /**
   * Candy Machine authority. This is the address that controls the upate of the candy machine.
   *
   */

  authority?: PublicKey | Pda;
  /** Payer of the transaction. */
  payer?: Signer;
  /**
   * Metadata account of the collection.
   *
   */

  collectionMetadata?: PublicKey | Pda;
  /**
   * Mint account of the collection.
   *
   */

  collectionMint: PublicKey | Pda;
  /**
   * Master Edition account of the collection.
   *
   */

  collectionMasterEdition?: PublicKey | Pda;
  /**
   * Update authority of the collection. This needs to be a signer so the candy
   * machine can approve a delegate to verify minted NFTs to the collection.
   */

  collectionUpdateAuthority: Signer;
  /**
   * Collection authority record. The delegate is used to verify NFTs.
   *
   */

  collectionAuthorityRecord?: PublicKey | Pda;
  /**
   * Token Metadata program.
   *
   */

  tokenMetadataProgram?: PublicKey | Pda;
  /** System program. */
  systemProgram?: PublicKey | Pda;
};

// Data.
export type InitializeCandyMachineInstructionData = {
  discriminator: Array<number>;
  /** Number of assets available */
  itemsAvailable: bigint;
  /** Symbol for the asset */
  symbol: string;
  /** Secondary sales royalty basis points (0-10000) */
  sellerFeeBasisPoints: Amount<'%', 2>;
  /** Max supply of each individual asset (default 0) */
  maxEditionSupply: bigint;
  /** Indicates if the asset is mutable or not (default yes) */
  isMutable: boolean;
  /** List of creators */
  creators: Array<Creator>;
  /** Config line settings */
  configLineSettings: Option<ConfigLineSettings>;
  /** Hidden setttings */
  hiddenSettings: Option<HiddenSettings>;
};

export type InitializeCandyMachineInstructionDataArgs = {
  /** Number of assets available */
  itemsAvailable: number | bigint;
  /** Symbol for the asset */
  symbol?: string;
  /** Secondary sales royalty basis points (0-10000) */
  sellerFeeBasisPoints: Amount<'%', 2>;
  /** Max supply of each individual asset (default 0) */
  maxEditionSupply?: number | bigint;
  /** Indicates if the asset is mutable or not (default yes) */
  isMutable?: boolean;
  /** List of creators */
  creators: Array<CreatorArgs>;
  /** Config line settings */
  configLineSettings?: OptionOrNullable<ConfigLineSettingsArgs>;
  /** Hidden setttings */
  hiddenSettings?: OptionOrNullable<HiddenSettingsArgs>;
};

export function getInitializeCandyMachineInstructionDataSerializer(): Serializer<
  InitializeCandyMachineInstructionDataArgs,
  InitializeCandyMachineInstructionData
> {
  return mapSerializer<
    InitializeCandyMachineInstructionDataArgs,
    any,
    InitializeCandyMachineInstructionData
  >(
    struct<InitializeCandyMachineInstructionData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['itemsAvailable', u64()],
        ['symbol', string()],
        ['sellerFeeBasisPoints', mapAmountSerializer(u16(), '%', 2)],
        ['maxEditionSupply', u64()],
        ['isMutable', bool()],
        ['creators', array(getCreatorSerializer())],
        ['configLineSettings', option(getConfigLineSettingsSerializer())],
        ['hiddenSettings', option(getHiddenSettingsSerializer())],
      ],
      { description: 'InitializeCandyMachineInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237],
      symbol: value.symbol ?? '',
      maxEditionSupply: value.maxEditionSupply ?? 0,
      isMutable: value.isMutable ?? true,
      configLineSettings: value.configLineSettings ?? none(),
      hiddenSettings: value.hiddenSettings ?? none(),
    })
  ) as Serializer<
    InitializeCandyMachineInstructionDataArgs,
    InitializeCandyMachineInstructionData
  >;
}

// Args.
export type InitializeCandyMachineInstructionArgs =
  InitializeCandyMachineInstructionDataArgs;

// Instruction.
export function initializeCandyMachine(
  context: Pick<Context, 'eddsa' | 'identity' | 'payer' | 'programs'>,
  input: InitializeCandyMachineInstructionAccounts &
    InitializeCandyMachineInstructionArgs
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
    authority: { index: 2, isWritable: false, value: input.authority ?? null },
    payer: { index: 3, isWritable: false, value: input.payer ?? null },
    collectionMetadata: {
      index: 4,
      isWritable: false,
      value: input.collectionMetadata ?? null,
    },
    collectionMint: {
      index: 5,
      isWritable: false,
      value: input.collectionMint ?? null,
    },
    collectionMasterEdition: {
      index: 6,
      isWritable: false,
      value: input.collectionMasterEdition ?? null,
    },
    collectionUpdateAuthority: {
      index: 7,
      isWritable: true,
      value: input.collectionUpdateAuthority ?? null,
    },
    collectionAuthorityRecord: {
      index: 8,
      isWritable: true,
      value: input.collectionAuthorityRecord ?? null,
    },
    tokenMetadataProgram: {
      index: 9,
      isWritable: false,
      value: input.tokenMetadataProgram ?? null,
    },
    systemProgram: {
      index: 10,
      isWritable: false,
      value: input.systemProgram ?? null,
    },
  };

  // Arguments.
  const resolvedArgs: InitializeCandyMachineInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.authorityPda.value) {
    resolvedAccounts.authorityPda.value = findCandyMachineAuthorityPda(
      context,
      { candyMachine: expectPublicKey(resolvedAccounts.candyMachine.value) }
    );
  }
  if (!resolvedAccounts.authority.value) {
    resolvedAccounts.authority.value = context.identity.publicKey;
  }
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
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
  if (!resolvedAccounts.collectionAuthorityRecord.value) {
    resolvedAccounts.collectionAuthorityRecord.value =
      findCollectionAuthorityRecordPda(context, {
        mint: expectPublicKey(resolvedAccounts.collectionMint.value),
        collectionAuthority: expectPublicKey(
          resolvedAccounts.authorityPda.value
        ),
      });
  }
  if (!resolvedAccounts.tokenMetadataProgram.value) {
    resolvedAccounts.tokenMetadataProgram.value = context.programs.getPublicKey(
      'mplTokenMetadata',
      'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
    );
    resolvedAccounts.tokenMetadataProgram.isWritable = false;
  }
  if (!resolvedAccounts.systemProgram.value) {
    resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
      'splSystem',
      '11111111111111111111111111111111'
    );
    resolvedAccounts.systemProgram.isWritable = false;
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
  const data = getInitializeCandyMachineInstructionDataSerializer().serialize(
    resolvedArgs as InitializeCandyMachineInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
