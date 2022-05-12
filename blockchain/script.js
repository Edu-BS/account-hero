"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const provider = new ethers_1.ethers.providers.Web3Provider(window.ethereum);
        yield provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        yield provider.getBlockNumber();
        const balance = yield provider.getBalance("ethers.eth");
        console.log(ethers_1.ethers.utils.formatEther(balance));
    });
}
main();
//# sourceMappingURL=script.js.map