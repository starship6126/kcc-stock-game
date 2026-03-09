export type CompanyId = "energy" | "aviation" | "shopping";

export interface CompanyData {
  id: CompanyId;
  name: string;
  price: number;
  eps: number;
  per: number;
}

export interface RoundData {
  round: number;
  news: string;
  tip: string;
  companies: Record<CompanyId, CompanyData>;
}

export const gameData: RoundData[] = [
  {
    round: 0,
    news:
      "주식 투자 시뮬레이션에 오신 것을 환영합니다! 초기 자본금 1,000,000원으로 투자를 시작하세요.",
    tip:
      "팁!: PER(주가수익비율)가 낮을수록 기업이 저평가되었을 가능성이 높습니다.",
    companies: {
      energy: {
        id: "energy",
        name: "A 에너지",
        price: 80000,
        eps: 5000,
        per: 16.0,
      },
      aviation: {
        id: "aviation",
        name: "B 항공",
        price: 50000,
        eps: 2500,
        per: 20.0,
      },
      shopping: {
        id: "shopping",
        name: "C 쇼핑",
        price: 120000,
        eps: 4000,
        per: 30.0,
      },
    },
  },
  {
    round: 1,
    news: "중동 지역 긴장 고조로 국제 유가가 급등했다.",
    tip:
      "팁!: 국제 유가 상승은 에너지 기업에는 호재지만, 연료비 비중이 높은 항공사에는 악재로 작용합니다.",
    companies: {
      energy: {
        id: "energy",
        name: "A 에너지",
        price: 92000,
        eps: 5300,
        per: 17.4,
      },
      aviation: {
        id: "aviation",
        name: "B 항공",
        price: 41000,
        eps: 2300,
        per: 17.8,
      },
      shopping: {
        id: "shopping",
        name: "C 쇼핑",
        price: 112800,
        eps: 3880,
        per: 29.1,
      },
    },
  },
  {
    round: 2,
    news: "팬데믹 이후 해외 여행 수요가 급격히 증가했다.",
    tip:
      "팁!: 여행 수요 증가는 항공사의 직접적인 매출 증가로 이어지며, 덩달아 항공유 수요도 늘어납니다.",
    companies: {
      energy: {
        id: "energy",
        name: "A 에너지",
        price: 97520,
        eps: 5459,
        per: 17.9,
      },
      aviation: {
        id: "aviation",
        name: "B 항공",
        price: 50020,
        eps: 2530,
        per: 19.8,
      },
      shopping: {
        id: "shopping",
        name: "C 쇼핑",
        price: 115056,
        eps: 3919,
        per: 29.4,
      },
    },
  },
  {
    round: 3,
    news: "대형 항만에서 물류 파업이 발생했다.",
    tip:
      "팁!: 물류 파업은 배송 지연과 비용 증가를 유발하여 전자상거래 기업의 수익성을 크게 악화시킵니다.",
    companies: {
      energy: {
        id: "energy",
        name: "A 에너지",
        price: 95570,
        eps: 5404,
        per: 17.7,
      },
      aviation: {
        id: "aviation",
        name: "B 항공",
        price: 44018,
        eps: 2378,
        per: 18.5,
      },
      shopping: {
        id: "shopping",
        name: "C 쇼핑",
        price: 86292,
        eps: 3449,
        per: 25.0,
      },
    },
  },
  {
    round: 4,
    news: "산유국이 석유 생산량 확대를 발표했다.",
    tip:
      "팁!: 공급이 증가하면 가격이 하락합니다. 유가 하락은 항공사의 운영 비용 절감으로 직결됩니다.",
    companies: {
      energy: {
        id: "energy",
        name: "A 에너지",
        price: 76456,
        eps: 4864,
        per: 15.7,
      },
      aviation: {
        id: "aviation",
        name: "B 항공",
        price: 50621,
        eps: 2521,
        per: 20.1,
      },
      shopping: {
        id: "shopping",
        name: "C 쇼핑",
        price: 94921,
        eps: 3621,
        per: 26.2,
      },
    },
  },
  {
    round: 5,
    news: "연말 대형 온라인 쇼핑 할인 행사가 시작됐다.",
    tip:
      "팁!: 대규모 쇼핑 행사는 전자상거래 기업의 폭발적인 매출 증가를 기대하게 합니다. 이제 최종 수익률을 확인하세요!",
    companies: {
      energy: {
        id: "energy",
        name: "A 에너지",
        price: 82573,
        eps: 5010,
        per: 16.5,
      },
      aviation: {
        id: "aviation",
        name: "B 항공",
        price: 48090,
        eps: 2471,
        per: 19.5,
      },
      shopping: {
        id: "shopping",
        name: "C 쇼핑",
        price: 121499,
        eps: 4055,
        per: 30.0,
      },
    },
  },
];