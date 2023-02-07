import { formSubmissionStateMachine } from '../fsm/form-submission-fsm.mjs'

export function createFormSubmissionExample ({ createCustomElement, html, renderer, withXStateService }) {
  createCustomElement('form-submission-example',
    withXStateService(formSubmissionStateMachine, {
      renderer,
      async submit (e) {
        e.preventDefault()
        this.fsm.send('SUBMIT')
        // eslint-disable-next-line no-undef
        const formData = new FormData(e.target)
        const { username, password } = Object.fromEntries(formData)
        await new Promise(resolve => setTimeout(resolve, 4000))
        !username.length || !password.length ? this.fsm.send('ERROR') : this.clear(e.target)
      },
      async clear (form) {
        this.fsm.send('SUCCESS')
        await new Promise(resolve => setTimeout(resolve, 2000))
        form.reset()
        this.fsm.send('CLEAR')
      },
      render () {
        return html`
        <container-wrapper header="Form - example">
          <form onsubmit="${this.submit}" class="flex-col-center justify-evenly">
            <fieldset class="flex-col-center">
              <label class="form__label" for="username">Full Name</label>
              <input name="username" class="${this.fsm.state.value !== 'submitting' ? 'form__input' : 'form__input--disabled'}" id="username" type="text">
              <label class="form__label" for="password">Password</label>
              <input name="password" class="${this.fsm.state.value !== 'submitting' ? 'form__input' : 'form__input--disabled'}" id="password" type="password">
            </fieldset>
            <input class="${this.fsm.state.value !== 'submitting' ? 'container__button' : 'container__button--disabled'}" type="submit" value="Sign Up">
          </form>
        </container-wrapper>
      `
      }
    })
  )
}
