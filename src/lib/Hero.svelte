<script>
  import Carousel from './Carousel.svelte'
</script>

<section>
  <h1>Toit is a free and open source object-oriented language designed specifically for IoT</h1>

  <Carousel />
</section>

<style lang="scss">
  section {
    color: white;
    padding-top: var(--header-height);
    background: black url('./images/illustrations/esp32.svg') no-repeat center;
  }

  h1 {
    text-align: center;
    margin: 6rem 0;
  }
</style>
