"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useEffectOnce } from "react-use"
import { useLocalStorage } from "usehooks-ts"
import { New_Feature_Key, NewFeature, NewFeatureDateLimit } from "./new"

export default function useNewFeatureState(
  newFeature: NewFeature,
  afterDateLimit: boolean = false
): [boolean, Dispatch<SetStateAction<boolean>>, NewFeature] {
  const [stored, setStored] = useState(new Date() > NewFeatureDateLimit[newFeature])
  const [isNewFeatureEnabled, setIsNewFeatureEnabled, remove] = useLocalStorage(New_Feature_Key(newFeature), false)

  // useEffectOnce(() => {
  //   if (new Date() > NewFeatureDateLimit[newFeature]) {
  //     setIsNewFeatureEnabled(false)
  //     setIsNewFeatureEnabled_local(false)
  //     remove()
  //   }

  //   if (isNewFeatureEnabled_local === true && new Date() < NewFeatureDateLimit[newFeature] && isNewFeatureEnabled === false) {
  //     setIsNewFeatureEnabled(true)
  //   }
  // })

  useEffectOnce(() => {
    if (window !== undefined) {
      const local = localStorage.getItem(New_Feature_Key(newFeature))
      if (local === "true") {
        setStored(true)
      }
    }
  })

  useEffect(() => {
    if (afterDateLimit) {
      if (new Date() > NewFeatureDateLimit[newFeature]) {
        setIsNewFeatureEnabled(false)
        remove()
      }
    }
  }, [])

  useEffect(() => {
    setStored(isNewFeatureEnabled)
  }, [isNewFeatureEnabled])

  return [stored, setIsNewFeatureEnabled, newFeature]
}
