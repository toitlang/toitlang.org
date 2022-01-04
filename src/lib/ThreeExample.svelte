<script lang="ts">
  import { onMount } from 'svelte'
  import * as THREE from 'three'
  import * as SC from 'svelte-cubed'
  import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'

  let geometry = new THREE.BoxGeometry()

  onMount(() => {
    const loader = new OBJLoader()
    loader.load(
      // resource URL
      '/tigre.obj',
      // called when resource is loaded
      function (object) {
        geometry = object.children[0].geometry
      },
      // called when loading is in progresses
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      // called when loading has errors
      function (error) {
        console.log('An error happened')
      }
    )
  })
</script>

<div>
  <SC.Canvas background={new THREE.Color('#000')} antialias>
    <SC.Mesh {geometry} position={[0, 0, 0]} scale={[8, 8, 8]} />

    <SC.PerspectiveCamera position={[0, 0, 20]} />
    <SC.OrbitControls
      target={[0, 0, 0]}
      enableZoom={false}
      enablePan={false}
      enableDamping
      maxPolarAngle={Math.PI * 0.5}
    />

    <!-- <SC.AmbientLight intensity={0.4} /> -->
    <!-- <SC.DirectionalLight
    position={[$options.light.x, $options.light.y, $options.light.z]}
    intensity={$options.light.intensity}
    color={$options.light.color}
  /> -->
  </SC.Canvas>
</div>

<style>
  div {
    height: 50vh;
  }
</style>
