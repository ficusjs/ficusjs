import { BreakpointConfig } from '@ficusjs/component-extensions'
import { EventBus } from '@ficusjs/event-bus'
import { I18n } from '@ficusjs/i18n'
import { AppStateStore } from '@ficusjs/state'
import { CustomElementOptions } from '@ficusjs/core'

export * from '@ficusjs/component-extensions'

export declare class ExtensionBuilder<EB, AS, AP, EO> {
  newInstance: ExtensionBuilder<EB, AS, AP, EO>
  withBreakpointConfig (breakpointConfig: BreakpointConfig): ExtensionBuilder<EB, AS, AP, EO>
  withEventBus (eventBus: EventBus<EB>): ExtensionBuilder<EB, AS, AP, EO>
  withI18n (i18n: I18n): ExtensionBuilder<EB, AS, AP, EO>
  withLazyRender (): ExtensionBuilder<EB, AS, AP, EO>
  withStyles (): ExtensionBuilder<EB, AS, AP, EO>
  withLocalState (): ExtensionBuilder<EB, AS, AP, EO>
  withStore (store: AppStateStore<AS, AP>): ExtensionBuilder<EB, AS, AP, EO>
  withWorkerStore (worker: Worker): ExtensionBuilder<EB, AS, AP, EO>
  create (options: CustomElementOptions<EO>): CustomElementOptions<EO>
}
