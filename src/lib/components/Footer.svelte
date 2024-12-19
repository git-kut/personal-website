<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { isFilled } from '@prismicio/client';
	import { PrismicLink } from '@prismicio/svelte';
	import Fa6BrandsGithub from '~icons/fa6-brands/github';
	import Fa6BrandsLinkedin from '~icons/fa6-brands/linkedin';
	import CibLeetcode from '~icons/cib/leetcode';
	import Bounded from './Bounded.svelte';

	export let settings: Content.SettingsDocument;
	console.log(settings.data.github_link);
</script>

<Bounded as="footer" class="text-slate-600">
	<div
		class="container mx-auto flex mt-20 flex-col items-center justify-between gap-6 py-8 sm:flex-row"
	>
		<div
			class="name flex flex-col items-center justify-center gap-x-4 gap-y-2 sm:flex-row sm:justify-self-start"
		>
			<a
				href="/"
				class="text-xl font-extrabold tracking-tighter text-slate-100 transition-colors hover:text-yellow-400 z-0"
				>{settings.data.name}
			</a>
			<span
				class="hidden text-5xl font-extralight leading-[0] text-slate-400 sm:inline"
				aria-hidden="true">/</span
			>
			<p class="text-sm text-slate-300">© {new Date().getFullYear()} {settings.data.name}</p>
		</div>

		<nav class="navigation" aria-label="Footer Navigation">
			<ul class="flex items-center gap-1">
				{#each settings.data.navigation_items as { link, label }, index}
					<li>
						<PrismicLink
							field={link}
							class="block px-3 py-1 text-base font-bold text-slate-100 transform transition-colors hover:text-yellow-400 z-2"
						>
							{label}
						</PrismicLink>
					</li>
					{#if index < settings.data.navigation_items.length - 1}
						<span class="text-5xl font-extralight leading-[0] text-slate-400" aria-hidden="true"
							>/
						</span>
					{/if}
				{/each}
			</ul>
		</nav>

		<div class="socials text-slate-100 inline-flex justify-center sm:justify-end">
			{#if isFilled.link(settings.data.github_link)}
				<PrismicLink
					field={settings.data.github_link}
					class="p-2 text-xl text-slate-300 transform transition-all hover:scale-125 hover:text-yellow-400"
					aria-label={settings.data.name + ' on Github'}
				>
					<Fa6BrandsGithub />
				</PrismicLink>
			{/if}

			{#if isFilled.link(settings.data.linkedin_link)}
				<PrismicLink
					field={settings.data.linkedin_link}
					class="p-2 text-xl text-slate-300 transform transition-all hover:scale-125 hover:text-yellow-400"
					aria-label={settings.data.name + ' on Linkedin'}
				>
					<Fa6BrandsLinkedin />
				</PrismicLink>
			{/if}

			{#if isFilled.link(settings.data.leetcode_link)}
				<PrismicLink
					field={settings.data.leetcode_link}
					class="p-2 text-xl text-slate-300 transform transition-all hover:scale-125 hover:text-yellow-400"
					aria-label={settings.data.name + ' on Leetcode'}
				>
					<CibLeetcode />
				</PrismicLink>
			{/if}
		</div>
	</div>
</Bounded>
