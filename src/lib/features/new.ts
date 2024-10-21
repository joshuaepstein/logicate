/**
 * This file contains the logic for new features that exist and allows the client to check if a new feature has been introduced to the user.
 */

export enum NewFeature {
  INSIGHTS = `insights`,
}

export const NewFeatureDateLimit: Record<NewFeature, Date> = {
  // The insights should only be new until the 28th of October 2024
  [NewFeature.INSIGHTS]: new Date(`2024-10-28`),
}

const NewFeatureBaseKey = `new-feature`
export const New_Feature_Key = (newFeature: NewFeature) => `${NewFeatureBaseKey}-${newFeature}`
