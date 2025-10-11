import { Temporal } from '@numeric-io/temporal';
import {
  Operator,
  type Contract,
  type ContractRateRule,
  type Events,
} from './types';

export const SAMPLE_CONTRACT_RATE_RULES: ContractRateRule[] = [
  {
    id: 'cla_consumer_new_origination',
    contract_id: 'rco_built',
    sku: { id: 'cla', name: 'CLA' },
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
    rate: '693.0',
    priority: 1,
  },
  {
    id: 'cla_consumer_general',
    contract_id: 'rco_built',
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
    rate: '650.0',
    priority: 2,
    sku: { id: 'cla', name: 'CLA' },
  },
  {
    id: 'cla_commercial_general',
    contract_id: 'rco_built',
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
    rate: '1000.0',
    priority: 3,
    sku: { id: 'cla', name: 'CLA' },
  },
  {
    id: 'cla_ignore_non_upfront',
    contract_id: 'rco_built',
    sku: { id: 'cla', name: 'CLA' },
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
    rate: '0.0',
    priority: 4,
  },
  {
    id: 'inspector_onsite_transactional',
    contract_id: 'rco_built',
    sku: { id: 'inspector_onsite', name: 'Inspector Onsite' },
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
    rate: '0.0',
    priority: 1,
  },
];

export const SAMPLE_CONTRACTS: Contract[] = [
  {
    id: 'rco_built',
    signed_date: Temporal.PlainDate.from('2025-01-01'),
    customer_name: 'RCO Built',
    skus: [
      { id: 'cla', name: 'CLA' },
      { id: 'inspector_onsite', name: 'Inspector Onsite' },
    ],
  },
  {
    id: 'sample_contract',
    signed_date: Temporal.PlainDate.from('2025-08-01'),
    customer_name: 'Sample Contract',
    skus: [],
  },
];

export const SAMPLE_UNMATCHED_EVENTS: Events[] = [
  {
    billing_record_eid: '1',
    content: {},
    rule_id: 'rco_built',
    rate: '0.0',
    contract_id: 'rco_built',
  },
  {
    billing_record_eid: '2',
    content: {},
    rule_id: 'rco_built',
    rate: '0.0',
    contract_id: 'rco_built',
  },
  {
    billing_record_eid: '3',
    content: {},
    rule_id: 'rco_built',
    rate: '0.0',
    contract_id: 'rco_built',
  },
];
