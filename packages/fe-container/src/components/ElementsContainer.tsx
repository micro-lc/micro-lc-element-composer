import React from 'react'
import PropTypes from 'prop-types'
import Composer from './Composer'
import ImportMap from './ImportMap'

const currentUserShape = PropTypes.shape({
  avatar: PropTypes.string,
  email: PropTypes.string.isRequired,
  groups: PropTypes.arrayOf(PropTypes.string.isRequired),
  name: PropTypes.string.isRequired,
  nickname: PropTypes.string
})

const propTypes = {
  configurationName: PropTypes.string,
  importMap: PropTypes.string,
  currentUser: currentUserShape,
  headers: PropTypes.object,
  container: PropTypes.object
}

type ElementsContainerProps = PropTypes.InferProps<typeof propTypes>

const ElementsContainer: React.FC<ElementsContainerProps> = (props: any = {}) => {
  const {configurationName = 'microlc-element-composer', currentUser, headers, container, importMap} = props

  return (
    <>
      <ImportMap container={container} importMap={importMap} />
      <Composer
        configurationName={configurationName}
        currentUser={currentUser}
        headers={headers}
      />
    </>
  )
}

export default ElementsContainer
