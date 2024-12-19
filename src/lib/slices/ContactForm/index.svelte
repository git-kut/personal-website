<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { isFilled, type Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';
	import { z } from 'zod';
	import { createForm, ErrorMessage } from 'svelte-forms-lib';
	import IcBaselineArrowOutward from '~icons/ic/baseline-arrow-outward';
	import { error } from '@sveltejs/kit';

	export let slice: Content.ContactFormSlice;

	const schema = z.object({
		name: z.string().min(1, { message: 'Name is required' }),
		email: z.string().email({ message: 'Invalid email address' }),
		message: z.string().min(10, { message: 'Message must be at least 10 characters' })
	});

	const validate = (values: { name: string; email: string; message: string }) => {
		const result = schema.safeParse(values);
		if (result.success) return {}; // No errors
		return result.error.flatten().fieldErrors; // Return field errors
	};

	const { form, handleChange, handleSubmit, errors } = createForm({
		initialValues: {
			name: '',
			email: '',
			message: ''
		},
		validate,
		onSubmit: async (values) => {
			console.log('Form submitted:', values);
			try {
				const res = await fetch('https://formspree.io/f/myzyqpej', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(values)
				});
				if (res.ok) {
					alert('Message sent successfully!');
				} else {
					alert('Failed to send message.');
				}
			} catch (error) {
				console.error('Submission error:', error);
				alert('An error occurred. Please try again.');
			}
		}
	});
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<Heading tag="h1" size="xl" class="mb-8">Contact Me</Heading>

	{#if isFilled.richText(slice.primary.description)}
		<div class="prose prose-xl prose-invert mb-10">
			<PrismicRichText field={slice.primary.description} />
		</div>
	{/if}

	<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-8 pr-[250px]">
		<label class="flex flex-col gap-4 text-xl font-medium">
			Name*
			<input
				type="text"
				name="name"
				bind:value={$form.name}
				on:input={handleChange}
				class="py-2.5 rounded-lg text-slate-900 px-3 outline outline-1 -outline-offset-1 outline-salte-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-400"
			/>
			{#if $errors.name}
				<span class="text-base text-red-500">{$errors.name}</span>
			{/if}
		</label>

		<label class="flex flex-col gap-4 text-xl font-medium">
			Email*
			<input
				type="email"
				name="email"
				bind:value={$form.email}
				on:input={handleChange}
				class="py-2.5 rounded-lg text-slate-900 px-3 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-400"
			/>
			{#if $errors.email}
				<span class="text-base text-red-500">{$errors.email}</span>
			{/if}
		</label>

		<label class="flex flex-col gap-4 text-xl font-medium">
			Message*
			<textarea
				name="message"
				bind:value={$form.message}
				on:input={handleChange}
				class="text-slate-900 resize-none rounded-lg py-2.5 px-3"
				rows="4"
			></textarea>
			{#if $errors.message}
				<span class="text-base text-red-500">{$errors.message}</span>
			{/if}
		</label>

		<button
			type="submit"
			class="group self-end relative text-slate-900 flex w-fit items-center justify-center overflow-hidden rounded-md border-2 border-slate-900 bg-slate-50 px-4 py-2 font-bold transition-transform ease-out hover:scale-105"
		>
			<span
				class="absolute inset-0 z-0 h-full rounded bg-yellow-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-10"
			></span>

			<span class="relative flex items-center justify-center gap-2 text-lg">
				Send
				<IcBaselineArrowOutward />
			</span>
		</button>
	</form>
</Bounded>
