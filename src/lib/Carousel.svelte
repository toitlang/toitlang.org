<script lang="ts">
  import { fade } from 'svelte/transition'

  import toit1 from '$lib/toit-examples/example1.toit'
  import toit2 from '$lib/toit-examples/example2.toit'
  import toit3 from '$lib/toit-examples/example3.toit'
  import toit4 from '$lib/toit-examples/example4.toit'
  import toit5 from '$lib/toit-examples/example5.toit'

  type Slide = {
    title: string
    body: string
    code: string
  }

  const slides: Slide[] = [
    {
      title: 'Getters and Setters',
      body: `In Toit, getters and setters have the same syntax (for users of a class) as public
            member variables. Therefore there is no need to write trivial setters and getters.`,
      code: toit1,
    },
    {
      title: 'Blocks',
      body: `Blocks are a mechanism to conveniently and efficiently provide callbacks to functions. This mechanism is, for example, used for the methods int.repeat and List.do.`,
      code: toit2,
    },
    {
      title: 'Loops',
      body: `Often, loops are used to iterate over a collection. In this case you should usually use the built-in do method of the Collection class. Some collections also have do --reversed for looping from last to first.`,
      code: toit3,
    },
    {
      title: 'Exception handling',
      body: `The try block in Toit is used to execute code following the try statement as a “normal” part of the program.

The finally keyword defines a block of code to run when the try block is final.`,
      code: toit4,
    },
    {
      title: 'Integrated package manager',
      body: `The Toit package manager is integrated with the Toit CLI. All of its commands start with the pkg command. `,
      code: toit5,
    },
  ]

  let visibleSlide = 0
  const slideCount = slides.length
  $: currentSlide = slides[visibleSlide]
</script>

<div class="carousel">
  {#key visibleSlide}
    <div class="slide" in:fade out:fade>
      <div class="slide__description">
        <h2>{currentSlide.title}</h2>
        <p>
          {currentSlide.body}
        </p>
        <a href="/">Learn more...</a>
      </div>
      <div class="slide__code">
        <pre><code>{@html currentSlide.code}</code></pre>
      </div>
    </div>
  {/key}
  <div class="pagination">
    {#each Array(slideCount) as _, i}
      <button class:active={visibleSlide == i} on:click={() => (visibleSlide = i)}>{i + 1}</button>
    {/each}
  </div>
</div>

<style lang="postcss">
  .carousel {
    position: relative;
    padding-top: 20rem;
  }
  .slide {
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
  }
  .slide__description,
  .slide__code {
    flex: 1;
    width: 50%;
  }
  .slide__description {
    font-size: 1.25rem;
    border-right: 2px solid var(--primary-color);
    padding-right: 3rem;
    & h2 {
      font-size: 1.875rem;
      font-weight: bold;
      margin: 0 0 1.5rem;
    }
    & p {
      line-height: 150%;
      margin: 1.5rem 0;
    }
    & a {
      font-weight: bold;
      text-decoration: none;
      color: var(--primary-color);
    }
  }
  .slide__code {
    padding-left: 3rem;
  }
  .pagination {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    & button {
      border: 2px solid var(--primary-color);
      border-radius: 0.25rem;
      background: transparent;
      color: white;
      width: 1.875rem;
      height: 1.875rem;
      &:hover {
        background: var(--primary-color-dark-bg);
      }
      &.active {
        background: var(--primary-color);
        font-weight: bold;
      }
    }
  }
</style>
