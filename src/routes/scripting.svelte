<script>
  import PageMeta from '$lib/PageMeta.svelte'
  import Example from '$lib/Example.svelte'
  import greeting from '$lib/toit-examples/arguments.toit'
</script>

<PageMeta
  title="Scripting with Toit"
  description="Write and run Toit scripts on your computer. Get started with command-line arguments, the SDK, and integrated package management."
  path="/scripting/"
/>

<section class="intro">
  <p class="eyebrow">Toit on your computer</p>
  <h1>A language for your everyday tools.</h1>
  <p class="lead">
    Write a script, run it, and build on it. Toit works on your computer without an embedded device;
    many of the tools in the SDK are themselves written in Toit.
  </p>
  <a class="button" href="https://docs.toit.io/tutorials/containers/toit-sdk/#prerequisites"
    >Install Toit →</a
  >
</section>

<section class="split section-rule">
  <div>
    <h2>Your first command-line tool</h2>
    <p>
      Install the SDK, save this program as <code>greet.toit</code>, and run the command shown here.
    </p>
    <p>
      The <code>main</code> function receives the program’s arguments. A block visits each name and prints
      a greeting.
    </p>
    <p>There is no project setup needed for this example.</p>
  </div>
  <Example
    code={greeting}
    filename="greet.toit"
    command="toit run greet.toit -- Ada Linus"
    output={'Hello, Ada!\nHello, Linus!'}
  />
</section>

<section id="cli" class="split package-feature cli-feature">
  <div>
    <p class="eyebrow">The CLI package</p>
    <h2>Build command-line applications.</h2>
    <p>
      <a href="https://github.com/toitlang/pkg-cli">pkg-cli</a> provides argument parsing, typed options,
      subcommands, and generated help. It also supports shell completion for Bash, Zsh, and Fish.
    </p>
    <p>
      The <code>toit</code> command-line tool is itself written in Toit, using this package.
      <a href="https://github.com/toitlang/toit/blob/master/tools/toit.toit"
        >Read its source for a larger example →</a
      >
    </p>
  </div>
  <div>
    <p>
      As a tool grows, the same package provides configuration storage, caching, and output with
      selectable verbosity and text or JSON formats.
    </p>
    <pre class="command"><code>toit pkg install github.com/toitlang/pkg-cli</code></pre>
    <a href="https://github.com/toitlang/pkg-cli#command"
      >See a command-line application example →</a
    >
  </div>
</section>

<section class="three-columns section-rule">
  <div>
    <h2>A readable language</h2>
    <p>
      Indentation gives code its structure. Lambdas and blocks let you pass behavior to functions.
      Classes and types help describe larger programs.
    </p>
    <a href="https://docs.toit.io/language/">Explore the language →</a>
  </div>
  <div>
    <h2>Tools that belong together</h2>
    <p>
      The Toit command includes running programs, analysis, and package management. The editor
      extension adds navigation, diagnostics, and completion.
    </p>
    <a href="https://marketplace.visualstudio.com/items?itemName=toit.toit">Editor integration →</a>
  </div>
  <div>
    <h2>Libraries to build on</h2>
    <p>
      Explore the standard library for files, collections, and networking. Find community packages
      or publish your own.
    </p>
    <a href="https://libs.toit.io/">Standard library →</a><br /><a href="https://pkg.toit.io/"
      >Package registry →</a
    >
  </div>
</section>

<section class="prose section-rule">
  <h2>Start with the work you have.</h2>
  <p>
    Toit is worth trying for small utilities, automation, and data processing. The standard library
    and community packages provide a starting point for your own tools.
  </p>
  <p>
    For a next step, follow the <a href="https://docs.toit.io/language/">language guide</a> or learn
    about <a href="https://docs.toit.io/language/package/">package management</a>.
  </p>
  <p>Working with hardware too? <a href="/embedded/">Use Toit on an ESP32 →</a></p>
</section>
