<script lang="ts">
  import WiFiIcon from '~icons/feather/wifi'
  import EfficientIcon from '~icons/feather/clock'
  import ReliableIcon from '~icons/feather/thumbs-up'
  import WindowsIcon from '~icons/ion/logo-windows'
  import MacOSIcon from '~icons/ion/logo-apple'
  import LinuxIcon from '~icons/ion/social-tux'
</script>

<div class="intro">
  <h1>Toit + Jaguar = 🥳</h1>

  <p>
    Jaguar is a small application developed by the Toit team, that runs on your ESP32. It enables
    <strong>live reloading</strong> and lets you update and restart your ESP32 code over
    <strong>WiFi</strong>.
  </p>
</div>

<div class="benefits">
  <div class="Feature">
    <div class="Feature-title"><WiFiIcon /> Wireless</div>
    <div class="Feature-body">
      <p>
        Update your code and restart your ESP32 conveniently over <strong>WiFi</strong>. No need to
        flash over serial, reboot your device, or wait for it to reconnect to your network.
      </p>
    </div>
  </div>
  <div class="Feature">
    <div class="Feature-title"><EfficientIcon /> Efficient</div>
    <div class="Feature-body">
      <p>
        Change your code in your editor, update it on your device, and restart it all <strong
          >within seconds</strong
        >.
      </p>
    </div>
  </div>
  <div class="Feature">
    <div class="Feature-title"><ReliableIcon /> Reliable</div>
    <div class="Feature-body">
      <p>
        Updates contain <strong>compiled</strong> Toit programs that are relocated and installed in
        flash on the device. Old versions are stopped and their resources are
        <strong>freed automatically</strong>.
      </p>
    </div>
  </div>
</div>

<div class="download-options">
  <a href="https://docs.toit.io/getstarted/device" class="Button"
    >Install now <LinuxIcon /> <MacOSIcon /> <WindowsIcon /></a
  >
</div>

<style lang="postcss">
  .intro {
    text-align: center;
    & p {
      margin: 3rem auto;
      font-size: 1.125em;
      max-width: 30em;
    }
  }
  .benefits {
    display: flex;
    gap: 3rem;
    justify-content: space-between;
    align-items: stretch;
    flex-wrap: wrap;
  }
  .download-options {
    margin: 3rem auto;
    text-align: center;
  }
</style>
