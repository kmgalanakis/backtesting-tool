import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

const Home: NextPage = () => {
  const [initial, setInitial] = useState<number>(0);
  const [profit, setProfit] = useState<number>(0);
  const [loss, setLoss] = useState<number>(0);
  const [trades, setTrades] = useState<number[]>([]);
  const [wins, setWins] = useState<number>(0);
  const [losses, setLosses] = useState<number>(0);

  const round = (number: number) => {
    return Math.round((number + Number.EPSILON) * 100) / 100;
  };

  return (
    <div className="">
      <Head>
        <title>My Backtesting Tool</title>
      </Head>

      <h1 className="">Backtesting Tool</h1>

      <div>
        <div className="mt-8 max-w-md">
          <div className="grid grid-cols-1 gap-6">
            <button
              className="bg-emerald-500 hover:bg-emerald-900 disabled:bg-emerald-300 text-white font-bold py-2 px-4 border bg-emerald-700 rounded"
              onClick={() => {
                const initial = 25000;
                setInitial(initial);
                setProfit(2);
                setLoss(1);
                setTrades([initial]);
              }}
            >
              25k, 2:1
            </button>
            <button
              className="bg-emerald-500 hover:bg-emerald-900 disabled:bg-emerald-300 text-white font-bold py-2 px-4 border bg-emerald-700 rounded"
              onClick={() => {
                const initial = 25000;
                setInitial(initial);
                setProfit(1.5);
                setLoss(1);
                setTrades([initial]);
              }}
            >
              25k, 1.5:1
            </button>
            <label className="block">
              <span className="text-gray-700">Initial</span>
              <input
                type="number"
                className="
                            mt-1
                            block
                            w-full
                            rounded-md
                            border-gray-300
                            shadow-sm
                            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                          "
                placeholder=""
                value={initial}
                onChange={(event) => setInitial(Number(event.target.value))}
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 border bg-blue-700 rounded"
                disabled={!initial}
                onClick={() => {
                  setTrades([initial]);
                  setLoss(0);
                  setProfit(0);
                  setWins(0);
                  setLosses(0);
                }}
              >
                Set initial
              </button>
            </label>

            <label className="block">
              <span className="text-gray-700">Profit %</span>
              <input
                type="number"
                className="
                            mt-1
                            block
                            w-full
                            rounded-md
                            border-gray-300
                            shadow-sm
                            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                          "
                value={profit}
                onChange={(event) => setProfit(Number(event.target.value))}
              />
              <button
                className="bg-green-500 hover:bg-green-700 disabled:bg-green-300 text-white font-bold py-2 px-4 border border-green-700 rounded"
                disabled={!profit}
                onClick={() => {
                  const lastTrade = trades[trades.length - 1];
                  const newTrade = lastTrade + (lastTrade * profit) / 100;
                  const newTrades = trades.concat([round(newTrade)]);
                  setTrades(newTrades);
                  setWins(wins + 1);
                }}
              >
                + Add profit
              </button>
            </label>

            <label className="block">
              <span className="text-gray-700">Loss %</span>
              <input
                type="number"
                className="
                            mt-1
                            block
                            w-full
                            rounded-md
                            border-gray-300
                            shadow-sm
                            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                          "
                value={loss}
                onChange={(event) => setLoss(Number(event.target.value))}
              />
              <button
                className="bg-red-500 hover:bg-red-900 disabled:bg-red-300 text-white font-bold py-2 px-4 border bg-red-700 rounded"
                disabled={!loss}
                onClick={() => {
                  const lastTrade = trades[trades.length - 1];
                  const newTrade = lastTrade - (lastTrade * Number(loss)) / 100;
                  const newTrades = trades.concat([round(newTrade)]);
                  setTrades(newTrades);
                  setLosses(losses + 1);
                }}
              >
                - Add loss
              </button>
            </label>
          </div>

          <div>
            {!!(wins + losses) && (
              <div>
                <p>Win rate</p>
                <p>{round((wins / (wins + losses)) * 100)}%</p>
              </div>
            )}

            {trades.length > 1 && (
              <div>
                <p>PnL</p>
                <p>
                  {round(
                    ((trades[trades.length - 1] - initial) / initial) * 100,
                  )}
                  %
                </p>
              </div>
            )}

            {!!(wins + losses) && (
              <div>
                <p>Total trades</p>
                <p>{wins + losses}</p>
              </div>
            )}

            {(!!wins || !!losses) && (
              <div>
                <p>Wins/Losses</p>
                <p>{`${wins}W / ${losses}L`}</p>
              </div>
            )}
          </div>

          {trades.length > 0 && (
            <div>
              <table className="border-collapse border border-slate-400 ">
                <thead>
                  <tr>
                    <th className="border border-slate-300 ">#</th>
                    <th className="border border-slate-300 ">Trade</th>
                  </tr>
                </thead>
                <tbody>
                  {trades.map((trade, index) => {
                    return (
                      <tr key={index}>
                        <td className="border border-slate-300 ">{index}</td>
                        <td className="border border-slate-300 ">{trade}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
