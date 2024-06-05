/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  array,
  mapSerializer,
  struct,
  u32,
  u8,
} from '@metaplex-foundation/umi/serializers';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';
import { ConfigLine, ConfigLineArgs, getConfigLineSerializer } from '../types';

// Accounts.
export type AddConfigLinesInstructionAccounts = {
  /** Candy Machine account. */
  candyMachine: PublicKey | Pda;
  /** Autority of the candy machine. */
  authority?: Signer;
};

// Data.
export type AddConfigLinesInstructionData = {
  discriminator: Array<number>;
  index: number;
  configLines: Array<ConfigLine>;
};

export type AddConfigLinesInstructionDataArgs = {
  index: number;
  configLines: Array<ConfigLineArgs>;
};

export function getAddConfigLinesInstructionDataSerializer(): Serializer<
  AddConfigLinesInstructionDataArgs,
  AddConfigLinesInstructionData
> {
  return mapSerializer<
    AddConfigLinesInstructionDataArgs,
    any,
    AddConfigLinesInstructionData
  >(
    struct<AddConfigLinesInstructionData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['index', u32()],
        ['configLines', array(getConfigLineSerializer())],
      ],
      { description: 'AddConfigLinesInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [223, 50, 224, 227, 151, 8, 115, 106],
    })
  ) as Serializer<
    AddConfigLinesInstructionDataArgs,
    AddConfigLinesInstructionData
  >;
}

// Args.
export type AddConfigLinesInstructionArgs = AddConfigLinesInstructionDataArgs;

// Instruction.
export function addConfigLines(
  context: Pick<Context, 'identity' | 'programs'>,
  input: AddConfigLinesInstructionAccounts & AddConfigLinesInstructionArgs
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
    authority: { index: 1, isWritable: false, value: input.authority ?? null },
  };

  // Arguments.
  const resolvedArgs: AddConfigLinesInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.authority.value) {
    resolvedAccounts.authority.value = context.identity;
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
  const data = getAddConfigLinesInstructionDataSerializer().serialize(
    resolvedArgs as AddConfigLinesInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
