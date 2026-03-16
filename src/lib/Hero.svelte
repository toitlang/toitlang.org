<script>
  import CodeSamples from './CodeSamples.svelte'
</script>

<h1>Toit is a modern high-level language designed and optimised for
  microcontrollers, and ready for use everywhere.</h1>

<p>
  Toit is an open source, object-oriented programming language originally created
  for the modern 'Internet of Things'.  The Toit language is:
  - Modern, simple, and approachable
  - High-level and object-oriented
  - Declarative and statically analyzable
  - Safe and garbage collected

  With Toit, your code runs incrementally as you write it, with <strong>instant
  feedback</strong>.  You iterate quickly, learn fast, and build better things.
  When used on your ESP32 microcontroller, Toit is optimised for efficient
  resource usage and <strong>live reloading</strong>.  Push your changes over
  <strong>WiFi</strong> in seconds and reserve your USB cable for charging your phone.
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
