import React, {useEffect} from 'react'
import PropTypes from 'prop-types'

import useConfiguration from '../hooks/useConfiguration'
import createNode from '../composer/NodeCreator'
import {ReplaySubject} from 'rxjs'

const createImportShim = () => {
  return createNode({
    type: 'element',
    tag: 'script',
    attributes: {
      src: 'https://ga.jspm.io/npm:es-module-shims@1.4.3/dist/es-module-shims.js'
    }
  }, {}, {}, new ReplaySubject<any>())
}

const createImportMap = (importMapContent: any): HTMLElement => {
  return createNode({
    type: 'element',
    tag: 'script',
    attributes: {
      type: 'importmap'
    },
    properties: {
      innerText: JSON.stringify(importMapContent)
    }
  }, {}, {}, new ReplaySubject<any>())
}

const ImportMap: React.FC<any> = ({importMap, container}) => {
  const configuration = useConfiguration(importMap)

  useEffect(() => {
    if (configuration) {
      container.appendChild(createImportMap(configuration))
      container.appendChild(createImportShim())
    }
  }, [configuration, container])

  return <></>
}

ImportMap.propTypes = {
  container: PropTypes.object,
  importMap: PropTypes.string
}

export default ImportMap
