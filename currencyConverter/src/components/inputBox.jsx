import { useId, useMemo } from "react";

export default function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectedCurrency = "usd",
  amountDisabled = false,
  currencyDisabled = false,
  className = "",
}) {
  const id = useId();

  const options = useMemo(() => {
    return currencyOptions.map((currency) => (
      <option className="bg-slate-300" key={currency} value={currency}>
        {currency.toUpperCase()}{" "}
      </option>
    ));
  }, [currencyOptions]);
  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex  ${className}`}>
      <div className="w-1/2">
        <label className="text-black/40 mb-2 inline-block" htmlFor={id}>
          {label}
        </label>
        <input
          type="number"
          name="amount"
          id={id}
          placeholder="Amount"
          className="outline-none w-full bg-transparent py-1.5"
          disabled={amountDisabled}
          value={amount}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
        />
      </div>
      <div className="w-1/2 flex flex-col flex-wrap justify-center  gap-y-3 items-end  text-right ">
        <p>Currency Type</p>
        <select
          name="currency type"
          value={selectedCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisabled}
          className="max-h-5 w-1/2 bg-blue-100 rounded-sm"
        >
          {options}
        </select>
      </div>
    </div>
  );
}
