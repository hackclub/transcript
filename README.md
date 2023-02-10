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
