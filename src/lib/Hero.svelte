<script>
  import CodeSamples from './CodeSamples.svelte'
</script>

<h1>Toit is a modern high-level language designed specifically for microcontrollers</h1>

<p>
  Toit is optimised for <strong>live reloading</strong> on your microcontroller. Your code runs
  incrementally as you write it and you get <strong>instant feedback</strong>. Push changes over
  your local
  <strong>WiFi</strong> in two seconds and reserve your USB cable for charging your phone. You iterate
  quickly, learn fast, and build better things.
</p>

<CodeSamples />

<style lang="postcss">
  h1 {
    text-align: left;
    margin: var(--content-vertical-padding) 0 0;
    background: white
      linear-gradient(90deg, rgb(255, 239, 190) 0%, white 30%, white 70%, rgb(200, 216, 255) 100%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    @media (min-width: 45rem) {
      text-align: center;
    }
  }
  p {
    margin: calc(var(--content-vertical-padding) / 2) auto var(--content-vertical-padding);
    font-size: 1.25rem;
    max-width: 42rem;
    & strong {
      font-weight: normal;
      color: var(--primary-color-light);
    }
  }
</style>
