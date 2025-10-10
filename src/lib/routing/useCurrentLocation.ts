import { useMatch, useSearchParams } from 'react-router-dom';
import {
  BASE_PATH,
  Location,
  LocationType,
  ModuleName,
  ModuleTabName,
  SearchParamKey,
} from './types';

export const useCurrentLocation = (): Location => {
  const [searchParams] = useSearchParams();
  const contractListMatch = useMatch(BASE_PATH);
  const ruleListMatch = useMatch(`${BASE_PATH}/${ModuleName.Contract}`);
  const ruleEditorMatch = useMatch(
    `${BASE_PATH}/${ModuleName.Contract}/${ModuleTabName.RulesEditor}`,
  );

  if (contractListMatch) {
    return { type: LocationType.ContractList };
  }

  const contractID = searchParams.get(SearchParamKey.ContractID);

  if (!contractID) {
    // Default to contract list if no contract ID is provided
    return { type: LocationType.ContractList };
  }

  if (ruleListMatch) {
    return {
      type: LocationType.RuleList,
      contractID,
    };
  }

  if (ruleEditorMatch) {
    const skuID = searchParams.get(SearchParamKey.SKUID);
    return {
      type: LocationType.RuleEditor,
      contractID,
      SKUID: skuID,
    };
  }

  return { type: LocationType.ContractList };
};
