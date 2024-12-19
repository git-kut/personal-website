<script lang="ts">
	import type { Content } from '@prismicio/client';
	import Bounded from '$lib/components/Bounded.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { PrismicRichText } from '@prismicio/svelte';
	export let slice: Content.ExperienceSlice;
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<Heading tag="h2" size="lg">{slice.primary.heading}</Heading>
	{#each slice.primary.jobs as job}
		<div class="ml-6 mt-8 max-w-prose md:ml-12 md:mt-16">
			<Heading size="sm" tag="h3">{job.title}</Heading>

			<p
				class="mt-1 flex w-fit items-center gap-1 text-2xl font-semibold tracking-tight text-slate-400"
			>
				<span>{job.time_period}</span>
				{' '}
				<span class="text-3xl font-extralight">/</span>
				{' '}
				<span>{job.institution}</span>
			</p>

			<div class="prose prose-lg prose-invert mt-4">
				<PrismicRichText field={job.description} />
			</div>
		</div>
	{/each}
</Bounded>
