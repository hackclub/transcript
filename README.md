# parchment

manage your project strings, hackily

# how it works

you use a transcript.yml, where you declare key-value yaml pairs of strings. you can use js expressions - as strings are `eval`ed - this means you can use `${templates}`, JS expressions, or just getting other strings using `t()`.
then, just call `t('key', context)` and get your string! `context` is passed down to eval

#### quirks:

-   transcript.yml needs to be located in src/lib/transcript.yml (for now)
-   ??? may be buggy - will be rewritten shortly!

### In the wild

- [`hackclub/toriel`](https://github.com/hackclub/toriel) [`transcript.yml`](https://github.com/hackclub/toriel/blob/main/util/transcript.yml)
- [`hackclub/slash-z`](https://github.com/hackclub/slash-z) [`transcript.yml`](https://github.com/hackclub/slash-z/blob/master/lib/transcript.yml)
- [`hackclub/orpheus-bot`](https://github.com/hackclub/orpheus-bot) [`transcript.yml`](https://github.com/hackclub/orpheus-bot/blob/master/src/utils/transcript.yml)
- [`hackclub/youtube-dl-bot`](https://github.com/hackclub/youtube-dl-bot) [`transcript.yml`](https://github.com/hackclub/youtube-dl-bot/blob/master/utils/transcript.yml)
- [`hackclub/scrappy`](https://github.com/hackclub/scrappy) [`transcript.yml`](https://github.com/hackclub/scrappy/blob/main/src/lib/transcript.yml)
- [`hackclub/application-viewer`](https://github.com/hackclub/application-viewer) [`transcript.yml`](https://github.com/hackclub/application-viewer/blob/main/utils/transcript.yml)
- [`maxwofford/mail`](https://github.com/maxwofford/mail-dog) [`transcript.yml`](https://github.com/maxwofford/mail-dog/blob/master/utils/transcript/transcript.yml)

### Examples

<details>
  <summary>Hello World!</summary>
  
```yaml
# transcript.yml
greeting: Hello, world!
```

```js
const { transcript } = require('transcript')
transcript('greeting')
// => Hello, world!
```
</details>

<details>
  <summary>Randomness</summary>

Just cause you're saying the same thing doesn't mean you need to use the same words every time...

```yaml
bark:
  - bark
  - bork
  - wh${'o'.repeat(3 + Math.ceil(Math.random()*8))}f
```

```js
const speak = () => transcript('bark') + '!'

// speak boy!
speak() // => bark!
speak() // => whooof!
speak() // => bork!
// good boy!
```
</details>

<details>
  <summary>Recursion</summary>

`transcript()` is available within itself as `this.t()` so you can spice up your lines with more random flavor text.

```yaml
# hackclub/toriel transcript.yml
greeting: oh hello! i have tea and a fresh ${this.t('type-of-pie')} pie cooling off... please come over and have some!

type-of-pie:
  - cinnamon
  - butterscotch
  - cinnamon and butterscotch
  - snail # apparently a favorite of hers in Undertale
```

```js
const { transcript } = require('@hackclub/transcript')
transcript('greeting')
// => oh hello! i have tea and a fresh butterscotch pie cooling off... please come over and have some!
transcript('greeting')
// => oh hello! i have tea and a fresh snail pie cooling off... please come over and have some!
```
</details>

<details>
  <summary>Nested Values</summary>

Values are nested in yaml, so you can group your lines by type.

```yaml
errors:
    notFound: the dog sniffs around, but doesn't look like it found what it's looking for
    missingPermission: what typa kibble ya try'n ta feed me? you can't do that!
    general: something went wrong!
```

```js
try {
    // ... some code
} catch(e) {
    let type = 'general'
    if (e instanceof NotFoundError) type = 'notFound'
    if (e instanceof MissingPermError) type = 'missingPermission'

    transcript(`errors.${type}`)
    // this will give different messages, depending on how your code failed!
}
```
</details>