<script lang="ts">
  import assignment from '$lib/toit-examples/assignment.toit'
  import blocks from '$lib/toit-examples/blocks.toit'
  import classes from '$lib/toit-examples/classes.toit'
  import functions from '$lib/toit-examples/functions.toit'
  import loops from '$lib/toit-examples/loops.toit'
  import packages from '$lib/toit-examples/packages.toit'

  type Slide = {
    title: string
    body: string
    code: string
    url?: string
  }

  const slides: Slide[] = [
    {
      title: `Defining functions`,
      body: `What if you want to say "Hello" a lot without getting your fingers all tired? You should define a function.
      Calling a function in Toit is as simple as mentioning its name. If the function doesn’t take arguments that’s all you need.`,
      code: functions,
      url: `https://docs.toit.io/language/#defining-a-function`,
    },
    {
      title: `Declaration and assignment`,
      body: `Declaring a variable uses the := syntax. To declare a variable without giving it a value, you can use a question mark: := ?`,
      code: assignment,
      url: `https://docs.toit.io/language/syntax/#declaration-and-assignment`,
    },
    {
      title: `Classes and objects`,
      body: `In Toit, everything is an object, including things that may be non-object "primitive types" in other languages. For example, an integer is an object, and has methods like abs.`,
      code: classes,
      url: `https://docs.toit.io/language/objects-constructors-inheritance-interfaces`,
    },
    {
      title: 'Blocks',
      body: `Blocks are a mechanism to conveniently and efficiently provide callbacks to functions. This mechanism is, for example, used for the methods int.repeat and List.do.`,
      code: blocks,
      url: `https://docs.toit.io/language/blocks`,
    },
    {
      title: 'Loops',
      body: `Often, loops are used to iterate over a collection. In this case you should usually use the built-in do method of the Collection class. Some collections also have do --reversed for looping from last to first.`,
      code: loops,
      url: `https://docs.toit.io/language/loops/#loops`,
    },
    //     {
    //       title: 'Exception handling',
    //       body: `The try block in Toit is used to execute code following the try statement as a “normal” part of the program.

    // The finally keyword defines a block of code to run when the try block is final.`,
    //       code: exception,
    //       url: `https://docs.toit.io/language/exceptions`,
    //     },
    {
      title: 'Integrated package manager',
      body: `The Toit package manager is integrated with the Toit CLI. All of its commands start with the pkg command. `,
      code: packages,
      url: `https://docs.toit.io/language/package`,
    },
  ]

  let visibleSlide = 0
  const slideCount = slides.length
  $: currentSlide = slides[visibleSlide]
</script>

<div class="carousel">
  {#key visibleSlide}
    <div class="slide">
      <div class="slide__description">
        <h2>{currentSlide.title}</h2>
        <p>
          {currentSlide.body}
        </p>
        <a href={currentSlide.url}>Learn more...</a>
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
  }

  .slide {
    padding-bottom: 3rem;
  }
  .slide__description {
    font-size: 1.25rem;
    margin-bottom: 3rem;
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
    max-width: 100%;
    overflow-x: hidden;
  }
  @media (min-width: 800px) {
    .slide {
      display: flex;
      min-height: 22rem;
    }
    .slide__description,
    .slide__code {
      width: 50%;
      min-width: 20rem;
    }
    .slide__description {
      border-right: 2px solid var(--primary-color);
      padding-right: 3rem;
      margin-bottom: 0;
    }
    .slide__code {
      padding-left: 3rem;
    }
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
