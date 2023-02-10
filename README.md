# parchment

manage your project strings, hackily

# how it works

you use a transcript.yml, where you declare key-value yaml pairs of strings. you can use js expressions - as strings are `eval`ed - this means you can use `${templates}`, JS expressions, or just getting other strings using `t()`.
then, just call `t('key', context)` and get your string! `context` is passed down to eval

#### quirks:

-   transcript.yml needs to be located in src/lib/transcript.yml (for now)
-   ??? may be buggy - will be rewritten shortly!
