<script lang="ts">
	import { T as Threlte } from '@threlte/core';
	import { createTransition, Float } from '@threlte/extras';
	import * as THREE from 'three';
	import gsap from 'gsap';
	import { elasticOut } from 'svelte/easing';
	export let position: [number, number, number] = [0, 0, 0];
	export let geometry: THREE.BufferGeometry = new THREE.IcosahedronGeometry(3);
	export let rate = 0.5;
	let visible = false;
	const isSmallScreen = window.innerWidth <= 1024;

	const soundEffects = [
		new Audio('/sounds/hit1.ogg'),
		new Audio('/sounds/hit2.ogg'),
		new Audio('/sounds/hit3.ogg'),
		new Audio('/sounds/hit4.ogg')
	];

	const materialParameters = [
		{ color: 0x2ecc71, roughness: 0 },
		{ color: 0xf1c40f, roughness: 0.4 },
		{ color: 0xe74c3c, roughness: 0.1 },
		{ color: 0x8e44ad, roughness: 0.1 },
		{ color: 0x1abc9c, roughness: 0.1 },
		{ color: 0x2980b9, roughness: 0, metalness: 0.5 },
		{ color: 0x2c3e50, roughness: 0.1, metalness: 0.5 },
		{ color: 0xffffff, roughness: 0.8, metalness: 0.2 },
		{ color: 0x34495e, roughness: 0.3, metalness: 0.6 },
		{ color: 0xc0392b, roughness: 0.2, metalness: 0.1 },
		{ color: 0xecf0f1, roughness: 0.5 },
		{ color: 0x16a085, roughness: 0, metalness: 0.3 },
		{ color: 0x9b59b6, roughness: 0.6, metalness: 0.7 },
		{ color: 0x7f8c8d, roughness: 0.4 },
		{ color: 0xe67e22, roughness: 0.2, metalness: 0.4 },
		{ color: 0xf39c12, roughness: 0.3, metalness: 0.2 },
		{ color: 0x95a5a6, roughness: 0.1, metalness: 0.5 },
		{ color: 0x3498db, roughness: 0.1, metalness: 0.2 },
		{ color: 0x2ecc71, roughness: 0.3 },
		{ color: 0xe74c3c, roughness: 0.2 }
	];

	function getRandomMaterial() {
		const randomInt = gsap.utils.random(1, 5, 1);
		if (randomInt === 1 || isSmallScreen) {
			return new THREE.MeshNormalMaterial();
		}
		return new THREE.MeshStandardMaterial(gsap.utils.random(materialParameters));
	}

	function handleClick(event: MouseEvent) {
		let test = gsap.utils.random(soundEffects);
		test.play();
		if ('object' in event && event.object instanceof THREE.Mesh) {
			gsap.to(event.object.rotation, {
				x: `+=${gsap.utils.random(1, 3)}`,
				y: `+=${gsap.utils.random(1, 3)}`,
				z: `+=${gsap.utils.random(1, 3)}`,
				duration: 1.3,
				ease: 'elastic.out(1, 0.3)',
				yoyo: true
			});

			event.object.material = getRandomMaterial();
		}
	}

	const bounce = createTransition((ref) => {
		return {
			tick(t) {
				if (t > 0) {
					visible = true;
					ref.scale.set(t, t, t);
				}
			},
			easing: elasticOut,
			duration: gsap.utils.random(800, 1200),
			delay: gsap.utils.random(0, 500)
		};
	});
</script>

<Threlte.Group position={[position[0] * 2, position[1] * 2, position[2] * 2]}>
	<Float
		speed={5 * rate}
		rotationSpeed={5 * rate}
		rotationIntensity={6 * rate}
		floatIntensity={5 * rate}
	>
		<Threlte.Mesh
			{visible}
			{geometry}
			in={bounce}
			material={getRandomMaterial()}
			interactive
			on:click={handleClick}
		></Threlte.Mesh>
	</Float>
</Threlte.Group>
