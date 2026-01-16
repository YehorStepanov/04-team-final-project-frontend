export interface JourneyDataDetails {
  weekNumber: number;
  baby: {
    _id: string;
    analogy: string;
    weekNumber: number;
    babySize: number;
    babyWeight: number;
    image: string;
    babyActivity: string;
    babyDevelopment: string;
    interestingFact: string;
    momDailyTips: string[];
  };
  mom: {
    _id: string;
    weekNumber: number;
    feelings: {
      states: string[];
      sensationDescr: string;
    };
    comfortTips: [
      {
        category: string;
        tip: string;
      },
      {
        category: string;
        tip: string;
      },
      {
        category: string;
        tip: string;
      },
    ];
  };
  daysLeft: number;
}
