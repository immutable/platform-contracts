"use strict";
exports.__esModule = true;
var ethers_1 = require("ethers");
var privateKeys = [
    '0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d',
    '0x5d862464fe9303452126c8bc94274b8c5f9874cbd219789b3eb2128075a76f72',
    '0xdf02719c4df8b9b8ac7f551fcb5d9ef48fa27eef7a66453879f4d8fdc6e78fb1',
    '0xff12e391b79415e941a94de3bf3a9aee577aed0731e297d5cfa0b8a1e02fa1d0',
    '0x752dd9cf65e68cfaba7d60225cbdbc1f4729dd5e5507def72815ed0d8abc6249',
];
function generatedWallets(provider) {
    return privateKeys.map(function (key) {
        return new ethers_1.ethers.Wallet(key, provider);
    });
}
exports.generatedWallets = generatedWallets;
