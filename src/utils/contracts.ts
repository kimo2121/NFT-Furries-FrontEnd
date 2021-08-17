import "@ethersproject/shims"
import { BigNumber, ethers } from "ethers";
import { getContractObj } from ".";

export async function purchase(chainId, provider, numberOfTokens) {
    const NFFurriesContract = getContractObj('NFFurries', chainId, provider);
    try {
        const nftPrice: BigNumber = await NFFurriesContract.PRICE();
        const tx = await NFFurriesContract.purchase(numberOfTokens, {
            value: nftPrice.mul(numberOfTokens)
        });
        await tx.wait(1);

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function getTotalSupply(chainId, library) {
    const NFFurriesContract = getContractObj('NFFurries', chainId, library);
    try {
        const [
            totalSupply
        ] = await Promise.all([
            NFFurriesContract.totalSupply()
        ]);

        return totalSupply.toString();
    } catch (e) {
        console.log(e);
        return null;
    }
}