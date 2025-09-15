import CryptoJS from 'crypto-js';

const Decryption = (data, key) => {
    if (!data || !key) {
        return null;
    }

    try {
        const bytes = CryptoJS.AES.decrypt(data, key);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    } catch (error) {
        console.error('Decryption jarayonida xatolik:', error);
        return null;
    }
};

export default Decryption;
