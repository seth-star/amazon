
import { formatCurrency } from "../../scripts/utils/moneycurrency.js";
describe('test suite:money currency',()=>{
  it('converts to the nearest zero',()=>{
    expect(formatCurrency(2095)).toEqual('20.95')
  })
})
