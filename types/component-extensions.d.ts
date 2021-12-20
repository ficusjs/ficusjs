import { BreakpointConfig } from '@ficusjs/component-extensions'
import { EventBus } from '@ficusjs/event-bus'
import { I18n } from '@ficusjs/i18n'
import { AppStateStore } from '@ficusjs/state'
import { CustomElementOptions } from '@ficusjs/core'

export * from '@ficusjs/component-extensions'

export declare class ExtensionBuilder<EB, AS, EO> {
  newInstance: ExtensionBuilder<EB, AS, EO>
  withBreakpointConfig (breakpointConfig: BreakpointConfig): ExtensionBuilder<EB, AS, EO>
  withEventBus (eventBus: EventBus<EB>): ExtensionBuilder<EB, AS, EO>
  withI18n (i18n: I18n): ExtensionBuilder<EB, AS, EO>
  withLazyRender (): ExtensionBuilder<EB, AS, EO>
  withStyles (): ExtensionBuilder<EB, AS, EO>
  withLocalState (): ExtensionBuilder<EB, AS, EO>
  withStore (store: AppStateStore<AS>): ExtensionBuilder<EB, AS, EO>
  withWorkerStore (worker: Worker): ExtensionBuilder<EB, AS, EO>
  create (options: CustomElementOptions<EO>): CustomElementOptions<EO>
}
