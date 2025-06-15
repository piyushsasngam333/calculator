import { LotSizeCalculator } from "../components/LotSizeCalculator";

export default function Index() {
  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4">
      <div className="w-full max-w-7xl">
        <LotSizeCalculator />
      </div>
    </div>
  );
}
