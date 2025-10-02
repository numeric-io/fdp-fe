export interface UnmatchedEvent {
  id: string;
  name: string;
}

export interface RateCalculatorStore {
  unmatchedEvents: UnmatchedEvent[];
}
