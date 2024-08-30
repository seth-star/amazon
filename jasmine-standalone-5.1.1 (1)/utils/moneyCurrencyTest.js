
import { formatCurrency } from "../../scripts/utils/moneycurrency.js";
describe('test suite:money currency',()=>{
  it('converts to the nearest zero',()=>{
    expect(formatCurrency(2095)).toEqual('20.95')
  })
  it('works with zero',()=>{
    expect(formatCurrency(0)).toEqual('0.00')
  })
  it('rounds up ',()=>{
    expect(formatCurrency(2000.5)).toEqual('20.01')
  })
})
