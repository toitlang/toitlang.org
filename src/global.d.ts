/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />

declare module '*.toit' {
  const content: string
  export default content
}

interface Window {
  dataLayer?: object[]
}
