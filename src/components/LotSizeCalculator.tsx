import React, { useState } from 'react';
import { CalculatorForm } from './CalculatorForm';
import { CalculateButton } from './CalculateButton';
import { MetricCard } from './MetricCard';
import { Calculator } from 'lucide-react';

interface CalculationResults {
  lots: string;
  units: string;
  value: string;
}

interface CalculatorFormData {
  instrument: string;
  depositCurrency: string;
  stopLossPips: string;
  depositAmount: string;
  pipSize: string;
  risk: string;
  zipCode: string;
  usdCadPrice: string;
  contractSize: string;
}

export const LotSizeCalculator: React.FC = () => {
  const [formData, setFormData] = useState<CalculatorFormData>({
    instrument: 'AUDCAD',
    depositCurrency: 'USD',
    stopLossPips: '200',
    depositAmount: '100000',
    pipSize: 'MetaTrader 5',
    risk: 'MetaTrader 5',
    zipCode: 'MT5',
    usdCadPrice: '1.34356',
    contractSize: '100000'
  });

  const [results, setResults] = useState<CalculationResults>({
    lots: '1.464',
    units: '123,355',
    value: 'US$2,000.00'
  });

  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = async () => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Basic calculation logic (simplified for demo)
    const stopLoss = parseFloat(formData.stopLossPips) || 200;
    const deposit = parseFloat(formData.depositAmount) || 100000;
    const price = parseFloat(formData.usdCadPrice) || 1.34356;
    const contractSize = parseFloat(formData.contractSize) || 100000;
    
    // Risk percentage (assuming 2% risk)
    const riskPercentage = 0.02;
    const riskAmount = deposit * riskPercentage;
    
    // Calculate pip value
    const pipValue = (contractSize * 0.0001) / price;
    
    // Calculate lot size
    const lotSize = riskAmount / (stopLoss * pipValue);
    
    // Calculate units
    const units = lotSize * contractSize;
    
    setResults({
      lots: lotSize.toFixed(3),
      units: Math.round(units).toLocaleString(),
      value: `US$${riskAmount.toFixed(2)}`
    });
    
    setIsCalculating(false);
  };

  return (
    <main className="items-stretch border-t-[color:var(--border-cards-border,rgba(40,191,255,0.05))] border-l-[color:var(--border-cards-border,rgba(40,191,255,0.05))] shadow-[2px_2px_16px_0px_rgba(0,0,0,0.12)_inset] flex flex-col overflow-hidden bg-[#080808] pt-10 pb-[114px] px-8 rounded-[16px_0px_0px_0px] border-t border-solid border-l max-md:pb-[100px] max-md:px-5">
      <header className="flex w-full items-center gap-2 text-[32px] text-[#E4EEF5] font-medium tracking-[-0.96px] justify-center max-md:max-w-full">
        <div className="self-stretch flex min-w-60 items-center gap-2 my-auto">
          <div className="aspect-[1] object-contain w-12 shadow-[0px_-8px_32px_0px_rgba(78,193,255,0.06)_inset] self-stretch min-h-12 shrink-0 my-auto bg-gradient-to-br from-[#4EC1FF] to-[#126BA7] rounded-lg flex items-center justify-center">
            <Calculator className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
          <h1 className="text-[#E4EEF5] self-stretch my-auto">
            Lotsize Calculator
          </h1>
        </div>
      </header>

      <section className="items-stretch border border-[color:var(--border-cards-border,rgba(40,191,255,0.05))] self-center flex w-[1018px] max-w-full flex-col mt-12 p-6 rounded-2xl border-solid max-md:mt-10 max-md:px-5">
        <CalculatorForm
          formData={formData}
          onFormDataChange={setFormData}
        />
        
        <CalculateButton
          onClick={handleCalculate}
          disabled={isCalculating}
        />
        
        <section className="flex w-full items-center gap-[21px] flex-wrap mt-12 max-md:max-w-full max-md:mt-10" aria-label="Calculation Results">
          <MetricCard
            label="Lots (trade size)"
            value={results.lots}
          />
          <MetricCard
            label="Units (Trade size)"
            value={results.units}
          />
          <MetricCard
            label="Risk Amount"
            value={results.value}
          />
        </section>
      </section>
    </main>
  );
};
