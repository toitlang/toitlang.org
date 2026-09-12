<script>
  import PageMeta from '$lib/PageMeta.svelte'
</script>

<PageMeta
  title="The Toit project"
  description="Toit is free and open source, maintained by volunteers. Learn about its history and how to contribute."
  path="/project/"
/>

<section class="intro">
  <p class="eyebrow">The project</p>
  <h1>Developed in the open.</h1>
  <p class="lead">
    Toit is free and open-source software, maintained by volunteers. You can use it, study how it
    works, modify it, and contribute to its future.
  </p>
  <a class="button" href="https://github.com/toitlang/toit">Explore the source →</a>
</section>

<section class="split section-rule">
  <div>
    <h2>Take part.</h2>
    <p>
      A useful example, a clear bug report, or an improvement to the documentation can help someone
      else get started.
    </p>
  </div>
  <div class="link-list">
    <a href="https://github.com/toitlang/toit/blob/master/CONTRIBUTING.md"
      >Contribute to the language and runtime →</a
    >
    <a href="https://github.com/toitlang/toit/issues">Report an issue →</a>
    <a href="https://pkg.toit.io/">Explore and share packages →</a>
    <a href="https://chat.toit.io/">Join the community on Discord →</a>
  </div>
</section>

<section class="prose section-rule">
  <h2>Where Toit comes from</h2>
  <p>
    Toit began with a focus on embedded software: bringing a high-level language and independently
    updatable applications to small devices. The same language and runtime also support scripts and
    tools on a computer.
  </p>
  <p>
    The original team brought experience from V8 and Dart, including programming language design,
    compilers, and virtual machines. Today, Toit continues as a volunteer-led project.
  </p>
  <p>
    See the <a href="https://github.com/toitlang/toit/blob/master/LICENSE"
      >source repository’s license information</a
    > for the language, runtime, and bundled components. Individual packages carry their own licenses.
  </p>
  <p>
    Read <a href="/releases/">release notes</a> or explore the
    <a href="https://blog.toit.io/">blog archive</a> for more about the work behind Toit. Older articles
    also describe the project’s earlier commercial services.
  </p>
</section>
