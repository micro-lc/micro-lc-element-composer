import {useEffect, useState} from 'react'
import {Configuration} from '@mia-platform/core'

const useConfiguration = (configurationName: string) => {
  const [configuration, setConfiguration] = useState<Configuration>()

  useEffect(() => {
    configurationName &&
      fetch(`./api/v1/microlc/configuration/${configurationName}`)
        .then(response => response.json())
        .then(setConfiguration)
  }, [configurationName])

  return configuration
}

export default useConfiguration
