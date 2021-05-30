import Caver from 'caver-js';
import CounterABI from '../abi/CounterABI.json';
import {ACCESS_KEY_ID, SECRET_ACCESS_KEY, COUNT_CONTRACT_ADDRESS, CHAIN_ID, ACCOUNT_ADDRESS} from '../constants';

const COUNT_CONTRACT_ABI = CounterABI;
const option = {
  headers: [
    {
      name: "Authorization",
      value: "Basic " + Buffer.from(ACCESS_KEY_ID + ":" + SECRET_ACCESS_KEY).toString("base64"),
    },
    {name: "x-chain-id", value: CHAIN_ID}
  ]
}

const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option))
const CountContract = new caver.contract(COUNT_CONTRACT_ABI, COUNT_CONTRACT_ADDRESS);

export const readCount = async () => {
  const _count = await CountContract.methods.count().call();
  console.log(`Count: ${_count}`);
  return _count;
}

export const getBalance = () => {
  return caver.rpc.klay.getBalance(ACCOUNT_ADDRESS).then((response) => {
    const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response))
    console.log(`BALANCE: ${balance}`);
    return balance;
  })
}

export const setCount = async (newCount) => {
  // 사용할 account 설정
  try {
    const privateKey = '0x7a51da9f54014ea31a462c7bcaa77adfeef2c74d23e0073c916c9db7e2b08253';
    const deployer = caver.wallet.keyring.createFromPrivateKey(privateKey);
    caver.wallet.add(deployer);
    // 스마트 컨트랙트 실행 트랜잭션 날리기
    // 결과 확인
    const receipt = await CountContract.methods.setCount(newCount).send({
      from: deployer.address,// address
      gas: "0x4bf200" //
  })
  console.log(receipt);
  } catch(e) {
    console.log(`[ERROR_SET_COUNT]:${e}`)
  }
}