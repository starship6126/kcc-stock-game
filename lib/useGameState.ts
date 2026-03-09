import { useCallback, useMemo, useState } from "react";
import { gameData, type CompanyId } from "./data";

export type Holdings = Record<CompanyId, number>;

export interface PriceSnapshot {
  round: number;
  prices: Record<CompanyId, number>;
}

export interface GameState {
  currentRound: number; // 0 ~ 5
  cash: number; // 단위: 원
  holdings: Holdings;
  history: PriceSnapshot[];
}

export const INITIAL_CASH = 1_000_000;
const MAX_ROUND = 5;

const createInitialHoldings = (): Holdings => ({
  energy: 0,
  aviation: 0,
  shopping: 0,
});

const extractRoundPrices = (round: number): PriceSnapshot => {
  const data = gameData[round];
  return {
    round: data.round,
    prices: {
      energy: data.companies.energy.price,
      aviation: data.companies.aviation.price,
      shopping: data.companies.shopping.price,
    },
  };
};

export const useGameState = () => {
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [cash, setCash] = useState<number>(INITIAL_CASH);
  const [holdings, setHoldings] = useState<Holdings>(createInitialHoldings);
  const [history, setHistory] = useState<PriceSnapshot[]>([
    extractRoundPrices(0),
  ]);

  const canGoNextRound = useMemo(
    () => currentRound < MAX_ROUND,
    [currentRound]
  );

  const goToNextRound = useCallback(() => {
    setCurrentRound((prev) => {
      if (prev >= MAX_ROUND) return prev;
      const next = prev + 1;
      setHistory((prevHistory) => [...prevHistory, extractRoundPrices(next)]);
      return next;
    });
  }, []);

  const resetGame = useCallback(() => {
    setCurrentRound(0);
    setCash(INITIAL_CASH);
    setHoldings(createInitialHoldings());
    setHistory([extractRoundPrices(0)]);
  }, []);

  const buyStock = useCallback(
    (companyId: CompanyId, quantity: number) => {
      if (quantity <= 0) return;
      const price = gameData[currentRound].companies[companyId].price;
      const cost = price * quantity;
      if (cash < cost) return;

      setCash((prev) => prev - cost);
      setHoldings((prev) => ({
        ...prev,
        [companyId]: prev[companyId] + quantity,
      }));
    },
    [cash, currentRound]
  );

  const sellStock = useCallback(
    (companyId: CompanyId, quantity: number) => {
      if (quantity <= 0) return;
      const price = gameData[currentRound].companies[companyId].price;
      setHoldings((prev) => {
        const owned = prev[companyId];
        if (owned <= 0) return prev;
        const sellQty = Math.min(quantity, owned);
        const revenue = sellQty * price;
        setCash((prevCash) => prevCash + revenue);

        return {
          ...prev,
          [companyId]: owned - sellQty,
        };
      });
    },
    [currentRound]
  );

  const state: GameState = {
    currentRound,
    cash,
    holdings,
    history,
  };

  return {
    state,
    currentRound,
    cash,
    holdings,
    history,
    canGoNextRound,
    goToNextRound,
    resetGame,
    buyStock,
    sellStock,
  };
};

