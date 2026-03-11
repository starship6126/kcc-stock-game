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
    news: "주식 투자 시뮬레이션에 오신 것을 환영합니다! 초기 자본금 1,000,000원으로 투자를 시작하세요.",
    tip: "팁!: 시장은 늘 당신의 생각보다 한 발 앞서 움직입니다. 눈에 보이는 숫자가 전부가 아님을 명심하세요.",
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
    news: "미국 정부가 동맹국을 제외한 제3국 생산 첨단 부품에 대해 25%의 포괄적 관세를 부과하는 방안을 검토 중이라고 밝혔습니다.",
    tip: "팁!: 관세는 글로벌 공급망을 뒤흔드는 폭탄입니다. 누군가는 비용 폭탄을 맞겠지만, 누군가는 경쟁자가 쓰러진 틈을 타 반사이익을 얻을 수 있습니다.",
    companies: {
      energy: {
        id: "energy",
        name: "삼성전자",
        price: 88000, // 경쟁사 타격으로 인한 반사이익 기대감 폭발
        eps: 5500,
        per: 16.0,
      },
      aviation: {
        id: "aviation",
        name: "현대차",
        price: 190000, // 공급망 불안 심리 약간 반영
        eps: 38000,
        per: 5.0,
      },
      shopping: {
        id: "shopping",
        name: "카카오",
        price: 48000, // 내수주라 큰 영향 없으나 시장 눈치 보기
        eps: 1200,
        per: 40.0,
      },
    },
  },
  {
    round: 2,
    news: "EU 의회에서 '플랫폼 주권법'이 예상을 깨고 통과되었습니다. 데이터 현지화 의무 및 독과점 규제가 대폭 강화될 전망입니다.",
    tip: "팁!: 보이지 않는 장벽이 세워졌습니다. 실물 경제를 파는 곳보다는, 데이터와 트래픽으로 먹고사는 생태계가 규제의 칼날에 가장 취약하기 마련입니다.",
    companies: {
      energy: {
        id: "energy",
        name: "삼성전자",
        price: 82000,
        eps: 5125,
        per: 16.0,
      },
      aviation: {
        id: "aviation",
        name: "현대차",
        price: 205000,
        eps: 41000,
        per: 5.0,
      },
      shopping: {
        id: "shopping",
        name: "카카오",
        price: 35000, // 규제 철퇴로 인한 투심 악화로 대폭락
        eps: 875,
        per: 40.0,
      },
    },
  },
  {
    round: 3,
    news: "글로벌 소비자물가지수(CPI)가 예상보다 빠르게 둔화되었으나, 주요 소비국의 실업률이 소폭 상승하며 경기 침체 우려가 제기되었습니다.",
    tip: "팁!: 인플레이션이 잡히는 건 좋지만, 지갑 닫는 소리가 들리기 시작합니다. 사람들이 돈이 없을 때 가장 먼저 구매를 포기하는 '비싼 물건'이 무엇일까요?",
    companies: {
      energy: {
        id: "energy",
        name: "삼성전자",
        price: 75000,
        eps: 5000,
        per: 15.0,
      },
      aviation: {
        id: "aviation",
        name: "현대차",
        price: 150000, // 고가 내구재(자동차) 수요 침체 우려로 급락
        eps: 30000,
        per: 5.0,
      },
      shopping: {
        id: "shopping",
        name: "카카오",
        price: 42000, // 돈 안 드는 디지털 여가 소비로 수급 이동
        eps: 1050,
        per: 40.0,
      },
    },
  },
  {
    round: 4,
    news: "남미와 아프리카의 주요 자원 부국들이 '환경 보호'를 명분으로 희토류 및 핵심 광물 수출 쿼터제를 기습 발표했습니다.",
    tip: "팁!: 공장을 돌리려면 흙과 금속이 필요합니다. 실물 자원이 귀해지면 제조업체들은 비명을 지르지만, 소프트웨어로 돈을 버는 곳은 강 건너 불구경입니다.",
    companies: {
      energy: {
        id: "energy",
        name: "삼성전자",
        price: 55000, // 핵심 원자재 수급 비상으로 인한 원가율 상승 우려 (폭락)
        eps: 3666,
        per: 15.0,
      },
      aviation: {
        id: "aviation",
        name: "현대차",
        price: 125000, // 전기차 배터리 원자재 쇼크 (폭락)
        eps: 25000,
        per: 5.0,
      },
      shopping: {
        id: "shopping",
        name: "카카오",
        price: 46000, // 제조 리스크 헷지 수단으로 부각
        eps: 1150,
        per: 40.0,
      },
    },
  },
  {
    round: 5,
    news: "한국 국채가 세계국채지수(WGBI)에 전격 편입되면서 외국인 자금이 대거 유입, 원/달러 환율이 급격히 하락(원화 강세)했습니다.",
    tip: "팁!: 환율이 떨어지면 외국에서 물건을 팔아 달러를 벌어오는 기업은 장부상 손해를 봅니다. 반면, 해외 매출 비중이 낮고 국내에서 장사하는 내수 기업은 웃게 되죠. 최종 수익률을 확인하세요!",
    companies: {
      energy: {
        id: "energy",
        name: "삼성전자",
        price: 50000, // 수출주 환차손 직격탄
        eps: 3333,
        per: 15.0,
      },
      aviation: {
        id: "aviation",
        name: "현대차",
        price: 110000, // 수출주 환차손 직격탄
        eps: 22000,
        per: 5.0,
      },
      shopping: {
        id: "shopping",
        name: "카카오",
        price: 60000, // 대표적 내수주, 환율 하락 타격 없음 + 자금 유입 수혜 (급등)
        eps: 1500,
        per: 40.0,
      },
    },
  },
];