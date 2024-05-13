import { formatCurrency } from '../../scripts/utils/money.js';

describe('test suite: formatCurrency', () => {
  it('convert cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('rounds down to the nearest cents', () => {
    expect(formatCurrency(2000.4)).toEqual('20.00');
  });

  it('rounds up to the nearest cents', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('works witn negative number', () => {
    expect(formatCurrency(-2000)).toEqual(
      'Incorrect number, price should be greater than 0'
    );
  });
});
