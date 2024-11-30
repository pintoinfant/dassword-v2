const LitJsSdk = require("@lit-protocol/sdk-browser");

const client = new LitJsSdk.LitNodeClient();

const accessControlConditions = [
  {
    conditionType: "evmBasic",
    contractAddress: "",
    standardContractType: "",
    chain: "ethereum",
    method: "",
    parameters: [":userAddress"],
    returnValueTest: "",
  },
];

class Lit {
  litNodeClient: any;

  async connect() {
    await client.connect();
    this.litNodeClient = client;
  }

  async encryptText(text: any, walletAddress: any) {
    if (!this.litNodeClient) {
      await this.connect();
    }
    const authSig = await LitJsSdk.checkAndSignAuthMessage({
      chain: "ethereum",
    });
    const { encryptedString, symmetricKey } =
      await LitJsSdk.encryptString(text);

    const encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
      accessControlConditions: [
        {
          ...accessControlConditions[0],
          returnValueTest: {
            comparator: "=",
            value: walletAddress,
          },
        },
      ],
      symmetricKey,
      authSig,
      chain: "ethereum",
    });

    return {
      encryptedString,
      encryptedSymmetricKey: LitJsSdk.uint8arrayToString(
        encryptedSymmetricKey,
        "base16",
      ),
    };
  }

  async decryptText(
    encryptedString: any,
    encryptedSymmetricKey: any,
    walletAddress: any,
  ) {
    if (!this.litNodeClient) {
      await this.connect();
    }

    const authSig = await LitJsSdk.checkAndSignAuthMessage({
      chain: "ethereum",
    });
    const symmetricKey = await this.litNodeClient.getEncryptionKey({
      accessControlConditions: [
        {
          ...accessControlConditions[0],
          returnValueTest: {
            comparator: "=",
            value: walletAddress,
          },
        },
      ],
      toDecrypt: encryptedSymmetricKey,
      chain: "ethereum",
      authSig,
    });

    return await LitJsSdk.decryptString(encryptedString, symmetricKey);
  }
}
export default Lit;
