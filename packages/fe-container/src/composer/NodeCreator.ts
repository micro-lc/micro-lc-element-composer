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
import {Configuration, User} from '@mia-platform/core'
import {ReplaySubject, Subject} from 'rxjs'

import {applyAttributes, applyProps} from './NodeEnricher'

const rowStyle = 'display: flex; flex-direction: column'
const columnStyle = 'display: flex; flex-direction: row'

type CreateFunction = (configuration: Configuration) => HTMLDivElement
type CreateInitialFunction = (initialStyle: string) => CreateFunction

const registeredBus: Record<string, Subject<any>> = {}

const createDiv: CreateInitialFunction = (initialStyle: string) => (configuration: Configuration) => {
  const divElement = document.createElement('div')
  applyAttributes(divElement, {
    ...configuration.attributes,
    style: `${initialStyle}; ${configuration.attributes?.style || ''}`
  })
  applyProps(divElement, configuration.properties)
  return divElement
}

const createRow: CreateFunction = createDiv(rowStyle)

const createColumn: CreateFunction = createDiv(columnStyle)

const createScript = (url: string) => {
  const script = document.createElement('script')
  script.setAttribute('src', url)
  return script
}

const importScript = (configuration: Configuration) => {
  if (configuration.url) {
    const isEsmUrl = configuration.url.endsWith('.esm.js')
    if (isEsmUrl) {
      import(/* webpackIgnore: true */ configuration.url)
    } else {
      document.head.appendChild(createScript(configuration.url))
    }
  }
}

const retrieveEventBus = (configuration: Configuration): Subject<any> | undefined => {
  let eventBus
  if (configuration.busDiscriminator) {
    eventBus = registeredBus[configuration.busDiscriminator] || new ReplaySubject<any>()
    registeredBus[configuration.busDiscriminator] = eventBus
  }
  return eventBus
}

const retrieveRootNode = (documentFragment: DocumentFragment) => () => documentFragment

const createEnrichedElement = (configuration: Configuration, currentUser: Partial<User>, headers: Record<string, string>, defaultEventBus: Subject<any>, documentFragment: DocumentFragment) => {
  // @ts-ignore
  const element = document.createElement(configuration.tag)
  const eventBus = retrieveEventBus(configuration) || defaultEventBus
  applyProps(element, {...configuration.properties, eventBus, currentUser, headers, getRootNode: retrieveRootNode(documentFragment)})
  applyAttributes(element, configuration.attributes)
  return element
}

const createElement = (configuration: Configuration, currentUser: Partial<User>, headers: Record<string, string>, eventBus: Subject<any>, documentFragment: DocumentFragment) => {
  importScript(configuration)
  return createEnrichedElement(configuration, currentUser, headers, eventBus, documentFragment)
}

const strategies = {
  row: createRow,
  column: createColumn,
  element: createElement
}

const createNode = (configuration: Configuration, currentUser: Partial<User>, headers: Record<string, string>, eventBus: Subject<any>, documentFragment: DocumentFragment) => {
  const strategy = strategies[configuration.type]
  return strategy(configuration, currentUser, headers, eventBus, documentFragment)
}

export default createNode
