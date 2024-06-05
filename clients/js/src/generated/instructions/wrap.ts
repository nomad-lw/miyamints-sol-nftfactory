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
  u8,
} from '@metaplex-foundation/umi/serializers';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type WrapInstructionAccounts = {
  candyGuard: PublicKey | Pda;
  authority?: Signer;
  candyMachine: PublicKey | Pda;
  candyMachineProgram?: PublicKey | Pda;
  candyMachineAuthority?: Signer;
};

// Data.
export type WrapInstructionData = { discriminator: Array<number> };

export type WrapInstructionDataArgs = {};

export function getWrapInstructionDataSerializer(): Serializer<
  WrapInstructionDataArgs,
  WrapInstructionData
> {
  return mapSerializer<WrapInstructionDataArgs, any, WrapInstructionData>(
    struct<WrapInstructionData>([['discriminator', array(u8(), { size: 8 })]], {
      description: 'WrapInstructionData',
    }),
    (value) => ({
      ...value,
      discriminator: [178, 40, 10, 189, 228, 129, 186, 140],
    })
  ) as Serializer<WrapInstructionDataArgs, WrapInstructionData>;
}

// Instruction.
export function wrap(
  context: Pick<Context, 'identity' | 'programs'>,
  input: WrapInstructionAccounts
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
    authority: { index: 1, isWritable: false, value: input.authority ?? null },
    candyMachine: {
      index: 2,
      isWritable: true,
      value: input.candyMachine ?? null,
    },
    candyMachineProgram: {
      index: 3,
      isWritable: false,
      value: input.candyMachineProgram ?? null,
    },
    candyMachineAuthority: {
      index: 4,
      isWritable: false,
      value: input.candyMachineAuthority ?? null,
    },
  };

  // Default values.
  if (!resolvedAccounts.authority.value) {
    resolvedAccounts.authority.value = context.identity;
  }
  if (!resolvedAccounts.candyMachineProgram.value) {
    resolvedAccounts.candyMachineProgram.value = context.programs.getPublicKey(
      'mplCandyMachine',
      'M1YA9A1YxA8kUeqpuURd3RXTQzXu2ZbotA4dLLetFNQ'
    );
    resolvedAccounts.candyMachineProgram.isWritable = false;
  }
  if (!resolvedAccounts.candyMachineAuthority.value) {
    resolvedAccounts.candyMachineAuthority.value = context.identity;
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
  const data = getWrapInstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
