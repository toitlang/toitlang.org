<script>
  import PageMeta from '$lib/PageMeta.svelte'
  import Example from '$lib/Example.svelte'
  import LatestNews from '$lib/LatestNews.svelte'
  import sources from '$lib/toit-examples/sources.toit'
</script>

<PageMeta
  title="Toit — scripts and embedded applications"
  description="A readable programming language for scripts, command-line tools, and ESP32 applications. Free, open source, and maintained by volunteers."
  path="/"
/>

<section class="intro intro-illustrated">
  <div>
    <p class="eyebrow">The Toit programming language</p>
    <h1>Small scripts.<br />Independent applications.</h1>
    <p class="lead">
      Toit is a language for writing scripts on your computer and applications on your ESP32. A
      readable syntax, an efficient runtime, and tools that work together.
    </p>
    <p class="muted">Free and open source. Maintained by volunteers.</p>
  </div>
  <img class="intro-art" src="/images/illustrations/blocks.svg" alt="" width="419" height="341" />
</section>

<section class="paths" aria-label="Explore Toit">
  <a class="path" href="/scripting/">
    <span class="eyebrow">Scripting</span>
    <h2>On your computer</h2>
    <p>
      Write scripts, process data, and automate everyday tasks. Build command-line applications with
      Toit’s CLI package.
    </p>
    <span class="text-link">Start scripting <span aria-hidden="true">→</span></span>
  </a>
  <a class="path" href="/embedded/">
    <span class="eyebrow">Embedded</span>
    <h2>On an ESP32</h2>
    <p>
      Work with sensors and peripherals. Run applications in separate containers and update them
      independently.
    </p>
    <span class="text-link">Explore embedded development <span aria-hidden="true">→</span></span>
  </a>
</section>

<section class="split section-rule">
  <div>
    <p class="eyebrow">The language</p>
    <h2>A short example</h2>
    <p>
      Select Toit source filenames from a list and print them in alphabetical order. Short blocks
      describe what to keep and what to do with each result; <code>it</code> refers to the current element.
    </p>
    <p>
      Toit has classes, exceptions, and built-in types. You can start with a short script and add
      structure as it grows.
    </p>
    <a href="https://docs.toit.io/language/">Read the language guide →</a>
  </div>
  <Example
    code={sources}
    filename="sources.toit"
    command="toit run sources.toit"
    output={'main.toit\ntest.toit'}
  />
</section>

<section class="split section-rule">
  <div>
    <p class="eyebrow">Beyond a single program</p>
    <h2>A runtime for independent applications.</h2>
  </div>
  <div>
    <p>
      On an embedded device, your application is one part of a running system. Toit containers let
      you install, stop, and update applications separately.
    </p>
    <p>
      Keep a sensor application running while you replace another application. Build services that
      other containers can use.
    </p>
    <a href="/embedded/#containers">See how containers fit together →</a>
  </div>
</section>

<section class="split section-rule">
  <div>
    <p class="eyebrow">An open-source project</p>
    <h2>Use it. Read it. Help shape it.</h2>
    <p>
      Toit is developed in the open. Contributions include programs and packages, documentation, bug
      reports, and changes to the language and runtime.
    </p>
    <a href="/project/">Meet the project →</a>
  </div>
  <LatestNews />
</section>
