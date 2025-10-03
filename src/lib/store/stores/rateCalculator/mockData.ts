import {
  Operator,
  type Contract,
  type ContractRateRule,
  type UnmatchedEvent,
} from './types';

const SAMPLE_CONTRACT_RATE_RULES: ContractRateRule[] = [
  {
    id: 'cla_consumer_new_origination',
    name: 'CLA Consumer New Origination',
    contract_id: 'rco_built',
    sku: 'CLA',
    rule: {
      op: Operator.And,
      conditions: [
        {
          op: Operator.Equal,
          field: '.BILLABLE_EVENT_TYPE',
          value: 'Collateral Unit Activation',
        },
        { op: Operator.Equal, field: '.AGREEMENT_TYPE', value: 'CONSUMER' },
        {
          op: Operator.GreaterThanOrEqual,
          field: '.ACTIVATION_DATE',
          value: '2025-08-01',
        },
      ],
    },
    rate: 693.0,
    currency: 'USD',
    priority: 1,
  },
  {
    id: 'cla_consumer_general',
    name: 'CLA Consumer General',
    contract_id: 'rco_built',
    sku: 'CLA',
    rule: {
      op: Operator.And,
      conditions: [
        {
          op: Operator.Equal,
          field: '.BILLABLE_EVENT_TYPE',
          value: 'Collateral Unit Activation',
        },
        { op: Operator.Equal, field: '.AGREEMENT_TYPE', value: 'CONSUMER' },
      ],
    },
    rate: 650.0,
    currency: 'USD',
    priority: 1.5,
  },
  {
    id: 'cla_commercial_general',
    name: 'CLA Commercial General',
    contract_id: 'rco_built',
    sku: 'CLA',
    rule: {
      op: Operator.And,
      conditions: [
        {
          op: Operator.Equal,
          field: '.BILLABLE_EVENT_TYPE',
          value: 'Collateral Unit Activation',
        },
        { op: Operator.Equal, field: '.AGREEMENT_TYPE', value: 'CRE' },
      ],
    },
    rate: 1000.0,
    currency: 'USD',
    priority: 2,
  },
  {
    id: 'cla_ignore_non_upfront',
    name: 'CLA Ignore Non Upfront',
    contract_id: 'rco_built',
    sku: 'CLA',
    rule: {
      op: Operator.And,
      conditions: [
        {
          op: Operator.NotEqual,
          field: '.BILLABLE_EVENT_TYPE',
          value: 'Collateral Unit Activation',
        },
      ],
    },
    rate: 0.0,
    currency: 'USD',
    priority: 2.5,
  },
  {
    id: 'inspector_onsite_transactional',
    name: 'Inspector Onsite Transactional',
    contract_id: 'rco_built',
    sku: 'inspector_onsite',
    rule: {
      op: Operator.And,
      conditions: [
        {
          op: Operator.Equal,
          field: '.BILLABLE_EVENT_TYPE',
          value: 'Completed Inspection',
        },
      ],
    },
    rate: 0.0,
    currency: 'USD',
    priority: 3,
  },
];

export const SAMPLE_CONTRACTS: Contract[] = [
  {
    id: 'rco_built',
    name: 'RCO Built',
    rateRules: [...SAMPLE_CONTRACT_RATE_RULES],
  },
];

export const SAMPLE_UNMATCHED_EVENTS: UnmatchedEvent[] = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Jim Beam' },
];
