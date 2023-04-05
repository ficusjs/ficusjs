/* global FormData */
import { formSubmissionStateMachine } from '../fsm/form-submission-fsm.mjs'

export function createFormSubmissionExample ({ createCustomElement, html, renderer, withXStateService }) {
  createCustomElement('form-submission-example',
    withXStateService(formSubmissionStateMachine, {
      renderer,
      async submit (e) {
        e.preventDefault()
        const { username, password } = Object.fromEntries(new FormData(e.target))
        this.fsm.send('SUBMIT')
        // simulating a network request
        await new Promise(resolve => setTimeout(resolve, 4000))
        if (!username.length || !password.length || !/\d/.test(password)) {
          this.fsm.send('ERROR')
        } else {
          this.fsm.send('SUCCESS')
          // adding a delay here just to show that this state occurs in the fsm visualization
          await new Promise(resolve => setTimeout(resolve, 2000))
          this.clearForm(e.target)
        }
      },
      clearForm (form) {
        this.fsm.send('CLEAR')
        form.reset()
      },
      render () {
        return html`
          <form onsubmit="${this.submit}" class="flex-col-center justify-evenly">
            <fieldset class="flex-col-center">
              <label class="form__label" for="username">Username</label>
              <input name="username" class="${this.fsm.state.value === 'submitting' ? 'form__input--disabled' : 'form__input'}" id="username" type="text">
              <label class="form__label" for="password">Password</label>
              <input name="password" class="${this.fsm.state.value === 'submitting' ? 'form__input--disabled' : 'form__input'}" id="password" type="password">
            </fieldset>
            <p class="mt-4">* Password should contain at least one number</p>
            <input class="${this.fsm.state.value === 'submitting' ? 'container__button--disabled' : 'container__button'}" type="submit" value="Sign Up">
          </form>
        `
      }
    })
  )
}
