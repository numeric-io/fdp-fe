import {
  Operator,
  type Contract,
  type ContractRateRule,
  type Events,
} from './types';

const SAMPLE_CONTRACT_RATE_RULES: ContractRateRule[] = [
  {
    id: 'cla_consumer_new_origination',
    name: 'CLA Consumer New Origination',
    contractID: 'rco_built',
    skuID: 'CLA',
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
    contractID: 'rco_built',
    skuID: 'CLA',
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
    contractID: 'rco_built',
    skuID: 'CLA',
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
    contractID: 'rco_built',
    skuID: 'CLA',
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
    contractID: 'rco_built',
    skuID: 'inspector_onsite',
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
    skus: [
      { id: 'CLA', name: 'CLA' },
      { id: 'inspector_onsite', name: 'Inspector Onsite' },
    ],
  },
  {
    id: 'sample_contract',
    name: 'Sample Contract',
    rateRules: [],
    skus: [],
  },
];

export const SAMPLE_UNMATCHED_EVENTS: Events[] = [
  { id: '1', name: 'Event 1', contractID: 'rco_built' },
  { id: '2', name: 'Event 2', contractID: 'rco_built' },
  { id: '3', name: 'Event 3', contractID: 'rco_built' },
];
