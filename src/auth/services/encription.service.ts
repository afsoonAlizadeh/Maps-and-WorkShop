import * as CryptoJS from 'crypto-js';
import { symmetricKey } from '../../enviroments/enviroment.env';
import { SymmetricConfig } from '../interfaces/symmetric';

export class EncryptionService {
    private symmetricKey: string;

    private static IV_SIZE = 128 / 8;
    private static KEY_SIZE = 256 / 8;
    private static ITERATIONS = 1000;
    private static HASH_ALGORITHM = CryptoJS.algo.SHA1;

    constructor(key: string) {
        this.symmetricKey = key ? key : symmetricKey;
    }

    encrypt(data: SymmetricConfig): string {
        const salt = btoa(Date.now().toString());
        const keyAndIv = CryptoJS.PBKDF2(
            this.symmetricKey,
            salt,
            {
                keySize: (EncryptionService.KEY_SIZE + EncryptionService.IV_SIZE) / 4,
                iterations: EncryptionService.ITERATIONS,
                hasher: EncryptionService.HASH_ALGORITHM
            }
        );

        const key = CryptoJS.lib.WordArray.create(keyAndIv.words.slice(0, EncryptionService.KEY_SIZE / 4));
        const iv = CryptoJS.lib.WordArray.create(keyAndIv.words.slice(EncryptionService.KEY_SIZE / 4, (EncryptionService.KEY_SIZE + EncryptionService.IV_SIZE) / 4));
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, { iv });
        return `${encrypted.toString()}.${salt.slice( 0 , -2)}`;
    }

    decrypt(message: string): any {
        const parts = message.split('.');

        if (parts.length !== 2) {
            throw new Error('Invalid message format');
        }

        const salt = parts[1] + '==';
        const encryptedMessage = parts[0];

        const keyAndIv = CryptoJS.PBKDF2(
            this.symmetricKey,
            CryptoJS.enc.Base64.parse(salt),
            {
                keySize: (EncryptionService.KEY_SIZE + EncryptionService.IV_SIZE) / 8, 
                iterations: EncryptionService.ITERATIONS,
                hasher: EncryptionService.HASH_ALGORITHM
            }
        );

        const key = CryptoJS.lib.WordArray.create(keyAndIv.words.slice(0, EncryptionService.KEY_SIZE / 8));
        const iv = CryptoJS.lib.WordArray.create(keyAndIv.words.slice(EncryptionService.KEY_SIZE / 8, (EncryptionService.KEY_SIZE + EncryptionService.IV_SIZE) / 8));

        try {
            const decrypted = CryptoJS.AES.decrypt(encryptedMessage, key, { iv });
            return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
        } catch (error) {
            console.error('Decryption error:', error);
            return null;
        }
    }
}