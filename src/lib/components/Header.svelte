<script lang="ts">
	import { isFilled, type Content } from '@prismicio/client';
	import { damp } from 'three/src/math/MathUtils.js';
	import NavbarLink from './NavbarLink.svelte';
	import Button from './Button.svelte';
	import MdiHamburger from '~icons/mdi/hamburger';
	import IcRoundClose from '~icons/ic/round-close';

	export let settings: Content.SettingsDocument;

	let open = false;

	function onLinkClick() {
		open = false;
	}
</script>

<header class="top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4 relative">
	<nav>
		<div
			class="flex flex-col justify-between rounded-b-lg bg-slate-50 px-4 py-2 md:flex-row md:items-center md:rounded-xl"
		>
			<div class="flex items-start justify-between">
				<a
					href="/"
					aria-label="Homepage"
					class="text-xl font-extrabold tracking-tighter text-slate-900 self-center"
					>{settings.data.name}</a
				>
				<button
					aria-expanded={open}
					aria-label="Open Menu"
					class="block p-2 text-2xl text-slate-800 md:hidden"
					on:click={() => (open = true)}><MdiHamburger /></button
				>
			</div>

			<!-- Mobile  -->
			<ul
				class={`fixed inset-0 z-50 flex flex-col items-end gap-4 bg-slate-50 pr-4 pt-14 transition-transform duration-300 ease-in-out md:hidden ${open ? 'translate-x-0' : 'translate-x-[100%]'}`}
			>
				<li>
					<button
						aria-expanded={open}
						aria-label="Close Menu"
						class="fixed block right-4 top-3 p-2 text-2xl text-slate-800 md:hidden"
						on:click={() => (open = false)}><IcRoundClose /></button
					>
				</li>
				{#each settings.data.navigation_items as { label, link }}
					<li class="first:mt-8">
						<NavbarLink field={link} {label} onClick={onLinkClick} type="mobile" />
					</li>
				{/each}
				{#if isFilled.link(settings.data.cta_link)}
					<Button field={settings.data.cta_link} label={settings.data.cta_label} />
				{/if}
			</ul>

			<!-- Desktop -->

			<ul class="relative z-50 hidden flex-row items-center gap-1 bg-transparent py-0 md:flex">
				{#each settings.data.navigation_items as { label, link }, index}
					<li>
						<NavbarLink field={link} {label} onClick={onLinkClick} type="desktop" />
					</li>
					{#if index < settings.data.navigation_items.length - 1}
						<span class="text-5xl font-extralight leading-[0] text-slate-400" aria-hidden="true"
							>/
						</span>
					{/if}
				{/each}

				{#if isFilled.link(settings.data.cta_link)}
					<Button field={settings.data.cta_link} label={settings.data.cta_label} className="ml-3" />
				{/if}
			</ul>
		</div>
	</nav>
</header>
