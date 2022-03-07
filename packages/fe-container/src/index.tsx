/*
 * Copyright 2021 Mia srl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import './public-path'

import React from 'react'
import ReactDOM from 'react-dom'

import ElementsContainer from './components/ElementsContainer'

const CONTAINER_ID = '#microlc-element-composer'

function retrieveContainer (props: any) {
  const {container} = props
  return container ? container.querySelector(CONTAINER_ID) : document.querySelector(CONTAINER_ID)
}

function render (props: any = {}) {
  ReactDOM.render(
    <ElementsContainer {...props} container={retrieveContainer(props)} />,
    retrieveContainer(props)
  )
}

export async function mount (props: any) {
  render(props)
}

export async function unmount (props: any) {
  ReactDOM.unmountComponentAtNode(retrieveContainer(props))
}

export async function bootstrap () {

}

// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}
