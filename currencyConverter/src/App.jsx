import { useState } from "react";
import bgImage from "./assets/currency.jpg";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import { InputBox } from "./components";

export default function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("eur");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from); //currency = from
  console.log("🚀 ~ App ~ currencyInfo:", currencyInfo);

  const options = Object.keys(currencyInfo);

  const convert = () => {
    setConvertedAmount((amount * currencyInfo[to]).toFixed(5));
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat opacity-90"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className=" w-full ">
        <div className="w-full max-w-md mx-auto border border-gray-50 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label={"from"}
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(amount) => {
                  if (amount < 0) return;
                  setAmount(amount);
                }}
                selectedCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                onClick={swap}
                className="absolute left-1/2  -translate-x-1/2 -translate-y-1/2 border-2 border-white  rounded-md bg-blue-600 text-white px-2 py-0.5"
              >
                Swap
              </button>
            </div>

            <div className="w-full mb-1">
              <InputBox
                label={"to"}
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectedCurrency={to}
                amountDisabled
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
