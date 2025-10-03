import { Operator, type ContractRateRule } from './types';

export const SAMPLE_CONTRACT_RATE_RULES: ContractRateRule[] = [
  {
    id: 'cla_consumer_new_origination',
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
