import React from 'react';
import { utils, Contract, BigNumber } from 'ethers';
import {
  Goerli,
  Mainnet,
  Optimism,
  OptimismGoerli,
  Rinkeby,
  Ropsten,
  useContractFunction,
  useEtherBalance,
  useEthers,
  useTokenBalance,
} from '@usedapp/core';

import { TransactionForm } from './TransactionForm';

import { Weth10, ERC20 } from '../../../gen/types';
import WethAbi from '../../abi/Weth10.json';
import Erc20Abi from '../../abi/ERC20.json';
import { Erc20 } from '../../gen/types/Erc20';

const wethInterface = new utils.Interface(WethAbi.abi);
const erc20Interface = new utils.Interface(Erc20Abi.abi);

// using weth9 addresses due to bigger usage
const wethContractAddresses = {
  [Mainnet.chainId]: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  [Rinkeby.chainId]: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  [Goerli.chainId]: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
  [Ropsten.chainId]: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  [Optimism.chainId]: '0x4200000000000000000000000000000000000006',
  [OptimismGoerli.chainId]: '0x09bADef78f92F20fd5f7a402dbb1d25d4901aAb2',
};

export const DepositEth = () => {
  const { account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  const wethContractAddress = chainId ? wethContractAddresses[chainId] : undefined;

  const contract =
    wethContractAddress && (new Contract(wethContractAddress, wethInterface) as Weth10);

  const { state, send } = useContractFunction(contract, 'deposit', { transactionName: 'Wrap' });

  const depositEther = (etherAmount: string) => {
    void send({ value: utils.parseEther(etherAmount) });
  };

  return (
    <TransactionForm
      balance={etherBalance}
      send={depositEther}
      title="Wrap Ether"
      ticker="ETH"
      transaction={state}
    />
  );
};

export const WithdrawEth = () => {
  const { account, chainId } = useEthers();
  const wethContractAddress = chainId ? wethContractAddresses[chainId] : undefined;
  const wethBalance = useTokenBalance(wethContractAddress, account);
  const contract =
    wethContractAddress && (new Contract(wethContractAddress, wethInterface) as Weth10);
  const { state, send } = useContractFunction(contract, 'withdraw', { transactionName: 'Unwrap' });

  const withdrawEther = (wethAmount: string) => {
    void send(utils.parseEther(wethAmount));
  };

  return (
    <TransactionForm
      balance={wethBalance !== undefined ? BigNumber.from(wethBalance) : BigNumber.from('0')}
      send={withdrawEther}
      title="Unwrap Ether"
      ticker="WETH"
      transaction={state}
    />
  );
};

export const ApproveZKJ = () => {
  const { account, chainId, library, switchNetwork } = useEthers();
  const expectedChainId = 11155111;
  const zkjContractAddress = '0xf6B92eE0935C8F8e9A78E6bFA40bC4E703600e1A';
  const zkjBalance = useTokenBalance(zkjContractAddress, account, {
    chainId: expectedChainId,
  });
  const contract =
    zkjContractAddress && (new Contract(zkjContractAddress, erc20Interface) as Erc20);
  // const { state, send } = useContractFunction(contract, 'approve');
  const { state, send } = useContractFunction(contract, 'transfer');

  const approveZKJ = async (zkjAmount: string) => {
    if (chainId != expectedChainId) {
      await switchNetwork(expectedChainId);
    }
    // 这里的send是否要重新声明？否则因为闭包，chainId对不上。怎么修改？
    send('0xF0110D0fa36101990C12B65e292940dC4B8D2b82', utils.parseEther(zkjAmount));
  };

  return (
    <TransactionForm
      balance={zkjBalance !== undefined ? BigNumber.from(zkjBalance) : BigNumber.from('0')}
      send={approveZKJ}
      title="Approve ZKJ"
      ticker="ZKJ"
      transaction={state}
    />
  );
};
