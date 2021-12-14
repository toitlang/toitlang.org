<script>
  import Carousel from './Carousel.svelte'
</script>

<h1>Toit is a free and open source object-oriented language designed specifically for IoT</h1>

<Carousel />

<style lang="postcss">
  h1 {
    text-align: center;
    margin: var(--content-vertical-padding) 0;
    background: white
      linear-gradient(90deg, rgb(255, 239, 190) 0%, white 30%, white 70%, rgb(200, 216, 255) 100%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
</style>
