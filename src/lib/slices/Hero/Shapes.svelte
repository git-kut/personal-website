<script lang="ts">
	import { T as Threlte } from '@threlte/core';
	import * as THREE from 'three';
	import Geometry from './Geometry.svelte';
	import { ContactShadows, Environment, interactivity, transitions } from '@threlte/extras';

	interactivity();
	transitions();
</script>

<Threlte.PerspectiveCamera
	makeDefault
	position={[0, 0, 25]}
	aspect={1}
	fov={30}
	near={1}
	far={40}
/>

<Environment files="smallroom.hdr" path="/" format="hdr"></Environment>
<ContactShadows position={[0, -4, 0]} opacity={0.65} scale={40} blur={1} far={9}></ContactShadows>

// 20 Side
<Geometry position={[0, 0, 0]} rate={0.3} geometry={new THREE.IcosahedronGeometry(3)}></Geometry>

// Capsule
<Geometry position={[1, -0.75, 4]} rate={0.4} geometry={new THREE.CapsuleGeometry(0.5, 1.6, 2, 16)}
></Geometry>

// 12 Side
<Geometry position={[-1.4, 2, -4]} rate={0.6} geometry={new THREE.DodecahedronGeometry(1.5)}
></Geometry>

// Torus
<Geometry
	position={[-0.8, -0.75, 3]}
	rate={0.5}
	geometry={new THREE.TorusGeometry(0.6, 0.35, 16, 32)}
></Geometry>

// Diamondo
<Geometry position={[1.6, 1.6, -4]} rate={0.7} geometry={new THREE.OctahedronGeometry(1.5)}
></Geometry>
