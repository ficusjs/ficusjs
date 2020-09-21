const test = require('ava')
const withPage = require('./_page')

const url = process.env.NODE_ENV === 'production' ? 'https://google.com' : 'http://localhost:6666'

test('page title should contain "Google"', withPage, async (t, page) => {
  await page.goto(url)
  t.true((await page.title()).includes('Google'))
})

test('page should contain an element with `#hplogo` selector', withPage, async (t, page) => {
  await page.goto(url)
  t.not(await page.$('#hplogo'), null)
})

test('search form should match the snapshot', withPage, async (t, page) => {
  await page.goto(url)
  const innerHTML = await page.evaluate(form => form.innerHTML, await page.$('#searchform'))
  t.snapshot(innerHTML)
})
