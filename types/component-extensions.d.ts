import { BreakpointConfig } from '@ficusjs/component-extensions'
import { EventBus } from '@ficusjs/event-bus'
import { I18n } from '@ficusjs/i18n'
import { AppStateStore } from '@ficusjs/state'
import { CustomElementOptions } from '@ficusjs/core'

export * from '@ficusjs/component-extensions'

export declare class ExtensionBuilder<EB, AS extends object, AP, EO, ET> {
  newInstance: ExtensionBuilder<EB, AS, AP, EO, ET>
  withBreakpointConfig (breakpointConfig: BreakpointConfig): ExtensionBuilder<EB, AS, AP, EO, ET>
  withEventBus (eventBus: EventBus<EB>): ExtensionBuilder<EB, AS, AP, EO, ET>
  withI18n (i18n: I18n): ExtensionBuilder<EB, AS, AP, EO, ET>
  withLazyRender (): ExtensionBuilder<EB, AS, AP, EO, ET>
  withStyles (): ExtensionBuilder<EB, AS, AP, EO, ET>
  withLocalState (): ExtensionBuilder<EB, AS, AP, EO, ET>
  withStore (store: AppStateStore<AS>): ExtensionBuilder<EB, AS, AP, EO, ET>
  withWorkerStore (worker: Worker): ExtensionBuilder<EB, AS, AP, EO, ET>
  create (options: CustomElementOptions<EO, ET>): CustomElementOptions<EO, ET>
}
