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
    news: "미국 정부가 중국산 첨단 반도체 및 부품에 대해 100% 징벌적 관세를 부과하기로 확정했습니다.",
    tip: "팁!: 철저한 배제는 누군가에겐 거대한 파이를 독식할 기회입니다. 글로벌 공급망에서 최대 경쟁자가 지워졌을 때 가장 크게 웃을 곳은 어디일까요? 투자를 진행하고 다음 라운드로 넘어가세요.",
    companies: {
      energy: {
        id: "energy",
        name: "삼성전자",
        price: 70000,
        eps: 4666,
        per: 15.0,
      },
      aviation: {
        id: "aviation",
        name: "현대차",
        price: 200000,
        eps: 40000,
        per: 5.0,
      },
      shopping: {
        id: "shopping",
        name: "카카오",
        price: 50000,
        eps: 1250,
        per: 40.0,
      },
    },
  },
  {
    round: 1,
    news: "미국 CPI(소비자물가지수)가 예상치를 크게 상회하며 쇼크를 기록했습니다. '고금리 장기화' 우려에 글로벌 증시가 발작을 일으킵니다.",
    tip: "팁!: 금리가 치솟으면 빚내서 사업하는 기업이나, 당장의 이익 없이 먼 미래의 '꿈'을 먹고사는 고PER 성장주들이 가장 먼저 직격탄을 맞습니다.",
    companies: {
      energy: {
        id: "energy",
        name: "삼성전자",
        price: 84000, // 이전 라운드(중국 관세)의 결과: 반사이익 급등
        eps: 5250,
        per: 16.0,
      },
      aviation: {
        id: "aviation",
        name: "현대차",
        price: 196000, // 부품 공급망 불안으로 소폭 하락
        eps: 39200,
        per: 5.0,
      },
      shopping: {
        id: "shopping",
        name: "카카오",
        price: 50000, // 국내 내수 위주라 무영향 (보합)
        eps: 1250,
        per: 40.0,
      },
    },
  },
  {
    round: 2,
    news: "글로벌 지정학적 위기로 안전자산 쏠림 현상이 심화되며, 원/달러 환율이 1,400원을 돌파했습니다.",
    tip: "팁!: 달러가 비싸지면 수입 물가는 오르지만, 물건을 만들어 해외에 파는 수출 기업들은 장부상 가만히 앉아서 영업이익이 늘어나는 '환차익' 마법을 경험합니다.",
    companies: {
      energy: {
        id: "energy",
        name: "삼성전자",
        price: 73000, // 이전 라운드(CPI 쇼크)의 결과: 매크로 충격으로 하락
        eps: 4866,
        per: 15.0,
      },
      aviation: {
        id: "aviation",
        name: "현대차",
        price: 182000, // 자동차 할부 금리 인상에 따른 수요 둔화 우려
        eps: 36400,
        per: 5.0,
      },
      shopping: {
        id: "shopping",
        name: "카카오",
        price: 36000, // 고금리 취약주(성장주) 투심 악화로 폭락
        eps: 900,
        per: 40.0,
      },
    },
  },
  {
    round: 3,
    news: "글로벌 빅테크 기업들이 AI 데이터센터 서버 구축에 천문학적인 자본(CapEx)을 쏟아붓겠다고 발표했습니다.",
    tip: "팁!: AI라는 거대한 금광이 열렸습니다. 곡괭이와 청바지를 파는 기업, 즉 데이터센터에 들어가는 핵심 하드웨어를 공급하는 곳이 진정한 승자입니다.",
    companies: {
      energy: {
        id: "energy",
        name: "삼성전자",
        price: 88000, // 이전 라운드(환율 폭등)의 결과: 수출 대장주 환차익 수혜
        eps: 5866,
        per: 15.0,
      },
      aviation: {
        id: "aviation",
        name: "현대차",
        price: 228000, // 북미 수출 호조 + 환율 효과로 어닝 서프라이즈 기대
        eps: 45600,
        per: 5.0,
      },
      shopping: {
        id: "shopping",
        name: "카카오",
        price: 33000, // 외국인 자금 이탈 및 내수 침체 우려로 추가 하락
        eps: 825,
        per: 40.0,
      },
    },
  },
  {
    round: 4,
    news: "미 연준(Fed)이 마침내 경기 연착륙을 선언하며 시장의 예상을 뛰어넘는 '빅컷(0.5%p 금리 인하)'을 전격 단행했습니다.",
    tip: "팁!: 돈줄이 풀리면서 증시로 막대한 유동성이 들어옵니다. 그동안 고금리에 짓눌려 숨죽이고 있던 고PER 성장주들이 억눌린 스프링처럼 튀어 오를 시간입니다. 다음 라운드에서 최종 결과를 확인하세요!",
    companies: {
      energy: {
        id: "energy",
        name: "삼성전자",
        price: 114000, // 이전 라운드(AI 투자)의 결과: 고대역폭 메모리(HBM) 수요 폭발
        eps: 7125,
        per: 16.0,
      },
      aviation: {
        id: "aviation",
        name: "현대차",
        price: 225000, // AI 훈풍 소외, 차익 실현 매물로 약보합
        eps: 45000,
        per: 5.0,
      },
      shopping: {
        id: "shopping",
        name: "카카오",
        price: 40000, // 자체 AI 모델 발표 및 저점 매수세로 반등
        eps: 1000,
        per: 40.0,
      },
    },
  },
  {
    round: 5,
    news: "모든 시뮬레이션이 종료되었습니다! 거시 경제의 파도를 탄 당신의 최종 수익률은 얼마인가요?",
    tip: "팁!: 시장의 흐름을 읽는 자만이 살아남습니다. 최종 자산을 확인하고 게임을 마무리하세요.",
    companies: {
      energy: {
        id: "energy",
        name: "삼성전자",
        price: 125000, // 이전 라운드(빅컷)의 결과: 유동성 장세 탑승
        eps: 7352,
        per: 17.0,
      },
      aviation: {
        id: "aviation",
        name: "현대차",
        price: 260000, // 금리 인하로 자동차 할부 수요 회복 기대감
        eps: 52000,
        per: 5.0,
      },
      shopping: {
        id: "shopping",
        name: "카카오",
        price: 54000, // 금리 인하 최대 수혜주로 폭풍 랠리
        eps: 1350,
        per: 40.0,
      },
    },
  },
];