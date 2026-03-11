"use client";

import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { type CompanyId, gameData } from "../lib/data";
import { useGameState, INITIAL_CASH } from "../lib/useGameState";

const COMPANY_COLORS: Record<CompanyId, string> = {
  energy: "#26D573",
  aviation: "#00C5FF",
  shopping: "#FFC857",
};

const COMPANY_LABELS: Record<CompanyId, string> = {
  energy: "삼성전자",
  aviation: "현대",
  shopping: "카카오",
};

const formatCurrency = (value: number) =>
  value.toLocaleString("ko-KR", { maximumFractionDigits: 0 });

const formatRoundLabel = (round: number) =>
  round === 0 ? "스타트" : `${round}라운드`;

const diffLabel = (rate: number) => {
  const fixed = rate.toFixed(1);
  if (rate > 0) return `+${fixed}%`;
  if (rate < 0) return `${fixed}%`;
  return "변동 없음";
};

export default function Home() {
  const {
    currentRound,
    cash,
    holdings,
    history,
    canGoNextRound,
    goToNextRound,
    buyStock,
    sellStock,
  } = useGameState();

  const currentData = gameData[currentRound];

  const chartData = useMemo(
    () =>
      gameData.map((roundData, index) => ({
        round: formatRoundLabel(roundData.round),
        energy:
          index <= currentRound ? roundData.companies.energy.price : null,
        aviation:
          index <= currentRound ? roundData.companies.aviation.price : null,
        shopping:
          index <= currentRound ? roundData.companies.shopping.price : null,
      })),
    [currentRound]
  );

  const totalPortfolioValue = useMemo(() => {
    const prices = currentData.companies;
    const stockValue =
      holdings.energy * prices.energy.price +
      holdings.aviation * prices.aviation.price +
      holdings.shopping * prices.shopping.price;
    return cash + stockValue;
  }, [cash, holdings, currentData.companies]);

  const totalReturnRate = useMemo(() => {
    const diff = totalPortfolioValue - INITIAL_CASH;
    return (diff / INITIAL_CASH) * 100;
  }, [totalPortfolioValue]);

  const [prevTotalValue, setPrevTotalValue] = useState<number | null>(null);
  const [lastReturnRate, setLastReturnRate] = useState<number | null>(null);
  const [isLastReturnPositive, setIsLastReturnPositive] = useState<
    boolean | null
  >(null);
  const [showToast, setShowToast] = useState(false);
  const [nickname, setNickname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const isGameFinished = !canGoNextRound && currentRound === 5;

  const handleNextRoundClick = () => {
    if (!canGoNextRound) return;
    setPrevTotalValue(totalPortfolioValue);
    goToNextRound();
  };

  useEffect(() => {
    if (prevTotalValue == null) return;

    const current = totalPortfolioValue;
    if (prevTotalValue === 0) {
      setPrevTotalValue(null);
      return;
    }

    const diffRate = ((current - prevTotalValue) / prevTotalValue) * 100;
    setLastReturnRate(diffRate);
    setIsLastReturnPositive(diffRate >= 0);
    setShowToast(true);
    setPrevTotalValue(null);

    const timer = setTimeout(() => {
      setShowToast(false);
    }, 2600);

    return () => clearTimeout(timer);
  }, [totalPortfolioValue, prevTotalValue]);

  const handleTrade = (companyId: CompanyId, type: "buy" | "sell") => {
    const qty = 1;
    if (type === "buy") {
      buyStock(companyId, qty);
    } else {
      sellStock(companyId, qty);
    }
  };

  const handleSubmitRanking = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!nickname.trim()) return;
    if (!isGameFinished) return;

    try {
      setIsSubmitting(true);
      setSubmitMessage(null);

      const res = await fetch("/api/leaderboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: nickname.trim(),
          finalAsset: totalPortfolioValue,
        }),
      });

      if (!res.ok) {
        throw new Error("failed");
      }

      setSubmitMessage("랭킹에 등록되었어요!");
    } catch {
      setSubmitMessage("등록 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-transparent text-white">
      {showToast && lastReturnRate !== null && isLastReturnPositive !== null && (
        <div className="pointer-events-none fixed inset-x-0 top-16 z-40 flex justify-center px-6">
          <div
            className={`pointer-events-auto flex max-w-xs flex-col rounded-2xl px-4 py-3 text-xs font-semibold text-white shadow-[0_16px_40px_rgba(0,0,0,0.55)] ${
              isLastReturnPositive ? "bg-emerald-500/95" : "bg-rose-500/95"
            }`}
          >
            <span className="mb-1 text-[11px] font-bold tracking-tight">
              {isLastReturnPositive ? "잘했어요! 🎉" : "아쉬워요 😢"}
            </span>
            <span className="text-[11px] font-medium">
              이전 라운드 대비 총 자산{" "}
              <span className="font-bold">
                {diffLabel(lastReturnRate)}
              </span>
              입니다.
            </span>
          </div>
        </div>
      )}
      {/* 상단: 라운드 & 뉴스 박스 */}
      <header className="flex flex-col gap-3 px-5 pt-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>라운드 {currentRound} / 5</span>
          <span className="text-right">
            <span className="block">
              현금 {formatCurrency(cash)}원 · 총자산{" "}
              {formatCurrency(totalPortfolioValue)}원
            </span>
            <span className="mt-0.5 block text-[10px]">
              누적 수익률{" "}
              <span
                className={
                  totalReturnRate >= 0 ? "text-emerald-400" : "text-rose-400"
                }
              >
                {diffLabel(totalReturnRate)}
              </span>
            </span>
          </span>
        </div>

        <div className="rounded-2xl bg-slate-900/80 p-4 ring-1 ring-slate-700/60">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-sky-400">
            오늘의 뉴스
          </p>
          <p className="text-sm leading-relaxed text-slate-50">
            {currentData.news}
          </p>
        </div>
      </header>

      {/* 중간: Recharts 꺾은선 차트 */}
      <section className="mt-4 flex-1 px-4">
        <div className="rounded-2xl bg-slate-900/70 p-3 ring-1 ring-slate-800/80">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-xs font-semibold text-slate-200">
              3개 기업 주가 흐름
            </h2>
            <span className="text-[10px] text-slate-500">
              라운드별 종가 기준
            </span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <XAxis
                  dataKey="round"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                  tickFormatter={(v: number) => `${Math.round(v / 1000)}k`}
                  width={36}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#020617",
                    borderRadius: 12,
                    border: "1px solid rgba(148, 163, 184, 0.5)",
                    padding: 10,
                  }}
                  labelStyle={{ fontSize: 11, color: "#e5e7eb" }}
                  formatter={
                    ((
                      value: number | string | (number | string)[] | undefined,
                      name: string | number | undefined
                    ) => [
                      `${formatCurrency(
                        typeof value === "number" ? value : Number(value)
                      )}원`,
                      String(name ?? ""),
                    ]) as any
                  }
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  iconSize={6}
                  formatter={(value: string | number) => (
                    <span className="text-[10px] text-slate-300">{value}</span>
                  )}
                />
                <Line
                  type="monotone"
                  dataKey="energy"
                  name="삼성전자"
                  stroke={COMPANY_COLORS.energy}
                  strokeWidth={2.2}
                  connectNulls={false}
                  dot={{ r: 2 }}
                  activeDot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="aviation"
                  name="현대차"
                  stroke={COMPANY_COLORS.aviation}
                  strokeWidth={2.2}
                  connectNulls={false}
                  dot={{ r: 2 }}
                  activeDot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="shopping"
                  name="카카오"
                  stroke={COMPANY_COLORS.shopping}
                  strokeWidth={2.2}
                  connectNulls={false}
                  dot={{ r: 2 }}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* 하단: 기업별 카드 & 매수/매도 버튼 */}
      <section className="mt-4 mb-6 space-y-3 px-4 pb-24">
        {(Object.keys(currentData.companies) as CompanyId[]).map(
          (companyId) => {
            const company = currentData.companies[companyId];
            const owned = holdings[companyId];
            const currentValue = owned * company.price;

            return (
              <article
                key={companyId}
                className="flex flex-col gap-2 rounded-2xl bg-slate-900/80 p-3.5 ring-1 ring-slate-800/80"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-7 w-7 rounded-full"
                      style={{ backgroundColor: COMPANY_COLORS[companyId] }}
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-100">
                        {company.name}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {COMPANY_LABELS[companyId]}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-slate-50">
                      {formatCurrency(company.price)}원
                    </p>
                    <p className="text-[10px] text-slate-500">
                      EPS {formatCurrency(company.eps)} · PER {company.per.toFixed(1)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>
                    보유{" "}
                    <span className="font-semibold text-slate-100">
                      {owned}주
                    </span>
                  </span>
                  <span>
                    평가액{" "}
                    <span className="font-semibold text-slate-100">
                      {formatCurrency(currentValue)}원
                    </span>
                  </span>
                </div>

                <div className="mt-1 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleTrade(companyId, "buy")}
                    className="inline-flex flex-1 items-center justify-center rounded-full bg-[#0064FF] px-3 py-1.5 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(0,100,255,0.45)] active:translate-y-[1px]"
                  >
                    매수 +1주
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTrade(companyId, "sell")}
                    className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-600/80 bg-slate-900/60 px-3 py-1.5 text-xs font-semibold text-slate-100 active:translate-y-[1px]"
                  >
                    매도 -1주
                  </button>
                </div>
              </article>
            );
          }
        )}

        <button
          type="button"
          disabled={!canGoNextRound}
          onClick={handleNextRoundClick}
          className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-full bg-sky-500 text-xs font-semibold text-white shadow-[0_10px_25px_rgba(14,165,233,0.5)] disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
        >
          {canGoNextRound ? "다음 라운드로 진행" : "라운드가 모두 끝났어요"}
        </button>
      </section>

      {isGameFinished && (
        <section className="mt-2 mb-28 px-4">
          <div className="rounded-2xl bg-slate-900/90 p-4 ring-1 ring-slate-700/80">
            <h2 className="mb-3 text-sm font-semibold text-slate-50">
              최종 결과
            </h2>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-[11px] text-slate-400">최종 자산</p>
                <p className="mt-1 text-2xl font-bold text-slate-50">
                  {formatCurrency(totalPortfolioValue)}원
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-slate-400">누적 수익률</p>
                <p
                  className={`mt-1 text-xl font-bold ${
                    totalReturnRate >= 0 ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {diffLabel(totalReturnRate)}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmitRanking} className="space-y-2">
              <label className="block text-[11px] font-medium text-slate-300">
                닉네임을 입력하고 랭킹에 등록해 보세요
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  maxLength={12}
                  className="h-9 flex-1 rounded-full border border-slate-600/70 bg-slate-900/80 px-3 text-xs text-slate-50 outline-none placeholder:text-slate-500"
                  placeholder="예: 주린이, 가치투자자 등"
                />
                <button
                  type="submit"
                  disabled={!nickname.trim() || isSubmitting}
                  className="inline-flex h-9 items-center justify-center rounded-full bg-emerald-500 px-4 text-[11px] font-semibold text-white shadow-[0_8px_20px_rgba(16,185,129,0.5)] disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300"
                >
                  {isSubmitting ? "등록 중..." : "랭킹 등록하기"}
                </button>
              </div>
              {submitMessage && (
                <p className="pt-1 text-[10px] text-slate-300">
                  {submitMessage}
                </p>
              )}
            </form>
          </div>
        </section>
      )}

      <section className="pointer-events-none fixed bottom-0 left-1/2 z-30 w-full max-w-[480px] -translate-x-1/2 px-4 pb-6">
        <div className="pointer-events-auto rounded-2xl bg-[#0064FF] px-4 py-3 text-xs font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-[rgba(255,255,255,0.8)]">
            오늘의 투자 팁
          </p>
          <p className="text-[11px] leading-relaxed">{currentData.tip}</p>
        </div>
      </section>
    </div>
  );
}
