import { renderTemplate } from '../../src/utils/template';

describe('renderTemplate', () => {
  it('replaces variables', () => {
    const out = renderTemplate('Hello {{ name }}!', { name: 'Ada' });
    expect(out).toBe('Hello Ada!');
  });
  it('missing vars become empty', () => {
    const out = renderTemplate('Hi {{x}} {{y}}', { x: 'A' });
    expect(out).toBe('Hi A ');
  });
});
