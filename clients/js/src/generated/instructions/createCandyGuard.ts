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
  bytes,
  mapSerializer,
  struct,
  u32,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { findCandyGuardPda } from '../../hooked';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  expectPublicKey,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type CreateCandyGuardInstructionAccounts = {
  candyGuard?: PublicKey | Pda;
  base: Signer;
  authority?: PublicKey | Pda;
  payer?: Signer;
  systemProgram?: PublicKey | Pda;
};

// Data.
export type CreateCandyGuardInstructionData = {
  discriminator: Array<number>;
  data: Uint8Array;
};

export type CreateCandyGuardInstructionDataArgs = { data: Uint8Array };

export function getCreateCandyGuardInstructionDataSerializer(): Serializer<
  CreateCandyGuardInstructionDataArgs,
  CreateCandyGuardInstructionData
> {
  return mapSerializer<
    CreateCandyGuardInstructionDataArgs,
    any,
    CreateCandyGuardInstructionData
  >(
    struct<CreateCandyGuardInstructionData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['data', bytes({ size: u32() })],
      ],
      { description: 'CreateCandyGuardInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237],
    })
  ) as Serializer<
    CreateCandyGuardInstructionDataArgs,
    CreateCandyGuardInstructionData
  >;
}

// Args.
export type CreateCandyGuardInstructionArgs =
  CreateCandyGuardInstructionDataArgs;

// Instruction.
export function createCandyGuard(
  context: Pick<Context, 'eddsa' | 'identity' | 'payer' | 'programs'>,
  input: CreateCandyGuardInstructionAccounts & CreateCandyGuardInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplCandyGuard',
    'M1YAQdqp2JyDxVreYxuhox7tkU84exrzW1AGuFu3Ek6'
  );

  // Accounts.
  const resolvedAccounts: ResolvedAccountsWithIndices = {
    candyGuard: { index: 0, isWritable: true, value: input.candyGuard ?? null },
    base: { index: 1, isWritable: false, value: input.base ?? null },
    authority: { index: 2, isWritable: false, value: input.authority ?? null },
    payer: { index: 3, isWritable: true, value: input.payer ?? null },
    systemProgram: {
      index: 4,
      isWritable: false,
      value: input.systemProgram ?? null,
    },
  };

  // Arguments.
  const resolvedArgs: CreateCandyGuardInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.candyGuard.value) {
    resolvedAccounts.candyGuard.value = findCandyGuardPda(context, {
      base: expectPublicKey(resolvedAccounts.base.value),
    });
  }
  if (!resolvedAccounts.authority.value) {
    resolvedAccounts.authority.value = context.identity.publicKey;
  }
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
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
  const data = getCreateCandyGuardInstructionDataSerializer().serialize(
    resolvedArgs as CreateCandyGuardInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
