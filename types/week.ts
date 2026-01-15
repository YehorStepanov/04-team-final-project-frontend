export interface Week {
  weekNumber: number;
  daysToBirth: number;

  baby: {
    analogy: string | null;
    babySize: number;
    babyWeight: number;
    babyActivity: string;
    babyDevelopment: string;
    interestingFact: string;
    image: string;
  };

  mom: {
    feelings: {
      states: string[];
      sensationDescr: string;
    };

    comfortTips: ComfortTip[];
  };
}

export interface ComfortTip {
  _id: string;
  category: string;
  tip: string;
}

export interface MomFeelings {
  states: string[];
  sensationDescr: string;
}

export interface Mom {
  feelings: MomFeelings;
  comfortTips: ComfortTip[];
}

export interface Baby {
  analogy: string | null;
  babySize: number;
  babyWeight: number;
  babyActivity: string;
  babyDevelopment: string;
  interestingFact: string;
  image: string;
}

export interface PregnancyWeek {
  weekNumber: number;
  daysToBirth: number;
  baby: Baby;
  mom: Mom;
}
