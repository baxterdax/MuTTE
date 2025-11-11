describe('encryption', () => {
  let encrypt: (s: string) => string;
  let decrypt: (s: string) => string;
  beforeAll(async () => {
    process.env.ENCRYPTION_KEY = '12345678901234567890123456789012';
    jest.resetModules();
    const mod = await import('../../src/utils/encryption');
    encrypt = mod.encrypt;
    decrypt = mod.decrypt;
  });
  it('round trips a string', () => {
    const plain = 'hello-world';
    const enc = encrypt(plain);
    expect(enc).not.toEqual(plain);
    const dec = decrypt(enc);
    expect(dec).toEqual(plain);
  });
  it('produces different iv each time', () => {
    const a = encrypt('same');
    const b = encrypt('same');
    expect(a).not.toEqual(b);
  });
});
