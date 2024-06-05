/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { RouteArgs, routeArgsBeet } from '../types/RouteArgs';

/**
 * @category Instructions
 * @category Route
 * @category generated
 */
export type RouteInstructionArgs = {
  args: RouteArgs;
  label: beet.COption<string>;
};
/**
 * @category Instructions
 * @category Route
 * @category generated
 */
export const routeStruct = new beet.FixableBeetArgsStruct<
  RouteInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['args', routeArgsBeet],
    ['label', beet.coption(beet.utf8String)],
  ],
  'RouteInstructionArgs',
);
/**
 * Accounts required by the _route_ instruction
 *
 * @property [] candyGuard
 * @property [_writable_] candyMachine
 * @property [_writable_, **signer**] payer
 * @category Instructions
 * @category Route
 * @category generated
 */
export type RouteInstructionAccounts = {
  candyGuard: web3.PublicKey;
  candyMachine: web3.PublicKey;
  payer: web3.PublicKey;
  anchorRemainingAccounts?: web3.AccountMeta[];
};

export const routeInstructionDiscriminator = [229, 23, 203, 151, 122, 227, 173, 42];

/**
 * Creates a _Route_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category Route
 * @category generated
 */
export function createRouteInstruction(
  accounts: RouteInstructionAccounts,
  args: RouteInstructionArgs,
  programId = new web3.PublicKey('M1YAQdqp2JyDxVreYxuhox7tkU84exrzW1AGuFu3Ek6'),
) {
  const [data] = routeStruct.serialize({
    instructionDiscriminator: routeInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.candyGuard,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.candyMachine,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.payer,
      isWritable: true,
      isSigner: true,
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
