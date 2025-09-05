const crypto = require('crypto');

// Função para gerar hash de um objeto
const generateHash = (obj) => {
  try {
    // Converte o objeto para string JSON de forma determinística
    const jsonString = JSON.stringify(obj, Object.keys(obj).sort());

    // Gera hash SHA-256
    const hash = crypto.createHash('sha256').update(jsonString, 'utf8').digest('hex');

    return hash;
  } catch (error) {
    throw new Error('Erro ao gerar hash: ' + error.message);
  }
};

// Configuração da criptografia
const ALGORITHM = 'aes-256-gcm';
const MASTER_KEY = process.env.MASTER_KEY || 'sua-chave-mestre-super-secreta-de-32-caracteres!'; // 32 bytes para AES-256

// Função para criptografar conteúdo
const encrypt = (content) => {
  try {
    // Converte conteúdo para string se for objeto
    const text = typeof content === 'object' ? JSON.stringify(content) : String(content);

    // Gera IV (Initialization Vector) aleatório
    const iv = crypto.randomBytes(16);

    // Cria o cipher
    const cipher = crypto.createCipher(ALGORITHM, MASTER_KEY);
    cipher.setAAD(Buffer.from('additional-authenticated-data'));

    // Criptografa o conteúdo
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Obtém a tag de autenticação
    const authTag = cipher.getAuthTag();

    // Retorna objeto com dados criptografados
    return {
      encrypted: encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex')
    };
  } catch (error) {
    throw new Error('Erro ao criptografar: ' + error.message);
  }
};

// Função para descriptografar conteúdo
const decrypt = (encryptedData) => {
  try {
    const { encrypted, iv, authTag } = encryptedData;

    // Cria o decipher
    const decipher = crypto.createDecipher(ALGORITHM, MASTER_KEY);
    decipher.setAAD(Buffer.from('additional-authenticated-data'));
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));

    // Descriptografa o conteúdo
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    throw new Error('Erro ao descriptografar: ' + error.message);
  }
};

// Função combinada: gera hash criptografado
const generateEncryptedHash = (obj) => {
  try {
    const hash = generateHash(obj);
    const encryptedHash = encrypt(hash);
    return encryptedHash;
  } catch (error) {
    throw new Error('Erro ao gerar hash criptografado: ' + error.message);
  }
};

module.exports = {
  generateHash,
  encrypt,
  decrypt,
  generateEncryptedHash
};