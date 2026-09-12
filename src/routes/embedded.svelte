<script>
  import PageMeta from '$lib/PageMeta.svelte'
  import Example from '$lib/Example.svelte'
  import button from '$lib/toit-examples/button.toit'
</script>

<PageMeta
  title="Embedded development with Toit"
  description="Program ESP32 devices in Toit. Work with peripherals, develop with Jaguar, and run independently updatable applications in containers."
  path="/embedded/"
/>

<section class="intro">
  <p class="eyebrow">Toit on an ESP32</p>
  <h1>Applications that share a device.</h1>
  <p class="lead">
    Write hardware applications in a high-level language. Run them in separate containers, and
    change one part of your system at a time.
  </p>
  <a class="button" href="https://docs.toit.io/getstarted/device">Get started on ESP32 →</a>
</section>

<section class="split section-rule">
  <div>
    <h2>Start with a button.</h2>
    <p>
      Connect a push button between GPIO 18 and ground on a supported ESP32 board with that pin
      available. This program enables the internal pull-up and waits for a press.
    </p>
    <p>
      The example shows raw input edges; a mechanical button may bounce. Add debouncing when your
      application needs one event per press.
    </p>
    <p>
      Toit’s libraries also give you access to I²C, SPI, UART, and networking. The <a
        href="https://pkg.toit.io/">package registry</a
      > includes drivers for sensors and other peripherals.
    </p>
  </div>
  <Example code={button} filename="button.toit" />
</section>

<section class="split section-rule">
  <div>
    <p class="eyebrow">The development loop</p>
    <h2>Meet Jaguar.</h2>
  </div>
  <div>
    <p>
      Jaguar is a development tool for running Toit programs on an ESP32. After installing it on
      your board, you can send code over your local WiFi network and restart your program without
      reflashing the firmware for each edit.
    </p>
    <p>Follow the setup guide to connect your device, then run your saved example:</p>
    <pre class="command"><code>jag run button.toit</code></pre>
    <a href="https://docs.toit.io/getstarted/device">Set up Jaguar →</a>
  </div>
</section>

<section id="containers" class="section-rule">
  <div class="prose">
    <p class="eyebrow">The runtime</p>
    <h2>Update an application, keep the others running.</h2>
    <p>
      A Toit device can run several applications in separate containers. Each has its own managed
      memory. Containers can communicate through services, and can be stopped and replaced
      independently.
    </p>
  </div>
  <figure class="container-diagram">
    <a
      href="/images/illustrations/architecture.png"
      aria-label="View the full-size Toit architecture diagram"
    >
      <img
        src="/images/illustrations/architecture.png"
        width="720"
        height="500"
        loading="lazy"
        alt="A traditional firmware stack combines all system functionality above ESP-IDF. Toit runs separate system, weather, and stock ticker applications above a virtual machine and ESP-IDF."
      />
    </a>
    <figcaption>
      The firmware provides the runtime; applications run in separate containers above it. Updating
      one application does not require replacing the others.
    </figcaption>
  </figure>
  <div class="prose">
    <p>
      This makes it practical to experiment with one application while other parts of the device
      remain active, including when working with AI-generated code.
    </p>
    <p>
      Containers isolate application memory; they do not make arbitrary code harmless. Code can
      still affect the peripherals and services it can access, and applications share the device’s
      resources.
    </p>
    <a href="https://docs.toit.io/tutorials/containers/"
      >Learn how to install and manage containers →</a
    >
  </div>
</section>

<section id="sensors" class="split package-feature sensors-feature">
  <div>
    <p class="eyebrow">Sensor services</p>
    <h2>Run the same application on different hardware.</h2>
    <p>
      <a href="https://github.com/toitware/toit-sensors">toit-sensors</a> defines common interfaces for
      measurements such as temperature, humidity, and pressure. Drivers implement these interfaces and
      expose them as services to other containers.
    </p>
  </div>
  <div>
    <p>
      An application asks a temperature service for a reading. The driver handles the particular
      sensor, its bus, and its pin assignments. The application accesses the service instead of the
      hardware directly.
    </p>
    <p>
      The same application can run unchanged on different devices, as long as each device provides
      the services the application needs.
    </p>
    <a href="https://github.com/toitware/toit-sensors#clients">Read the sensor client example →</a>
  </div>
</section>
