<script lang="ts">
	import { merchant } from '../stores/merchant';
	import { game } from '../stores/game';
	import { resolution } from '../stores/resolution';
	import { log } from '../stores/log';
	import Button from '$lib/Button.svelte';
	import TextInput from '$lib/TextInput.svelte';
	import SelectBox from '$lib/SelectBox.svelte';
	import { nationalities } from '../constants/game';
	import { ucFirst } from '../utils/string';
	import { goto } from '$app/navigation';
	import { routes } from '../constants/game';
	import { onMount } from 'svelte';

	onMount(() => {
		if ($game.started) {
			goto($resolution.mobile ? routes.inventory : routes.properties);
		}
	});

	const changeName = (e: any) => {
		merchant.changeName(e.target.value);
	};

	const changeGender = (e: any) => {
		merchant.changeGender(e.target.value);
	};

	const changeNationality = (e: any) => {
		const nationality = nationalities[e.target.value];
		const town = nationality.towns[0];

		merchant.changeNationality(e.target.value);
		merchant.changeTown(town);
	};

	const changeTown = (e: any) => {
		merchant.changeTown(e.target.value);
	};

	const startPlaying = () => {
		game.startPlaying();

		const route = $resolution.mobile ? routes.inventory : routes.properties;
		goto(route);

		log.add(`You just woke as a ${$merchant.nationality} merchant named ${$merchant.name}.`);
	};

	$: genderIcon = $merchant.gender === 'woman' ? '👩' : '👨';
	$: towns = () => nationalities[$merchant.nationality].towns;
	$: currentFlag = () => $merchant.nationality && nationalities[$merchant.nationality].flag;
</script>

<div class="page-start">
	<h2>Welcome</h2>

	<p>To start playing, you can edit your profile or just press Play.</p>

	<form on:submit|preventDefault={startPlaying}>
		<TextInput value={$merchant.name} label="📛 Name" name="name" on:change={changeName} />

		<SelectBox name="gender" label="{genderIcon} Gender" on:change={changeGender}>
			<option value="woman" selected={$merchant.gender === 'woman'}>Woman</option>
			<option value="man" selected={$merchant.gender === 'man'}>Man</option>
		</SelectBox>

		{#if $merchant.nationality}
			<SelectBox
				name="nationality"
				label="{currentFlag()} Nationality"
				on:change={changeNationality}
			>
				{#each Object.keys(nationalities) as nationality}
					<option
						value={nationalities[nationality].name}
						selected={$merchant.nationality === nationalities[nationality].name}
					>
						{ucFirst(nationalities[nationality].name)}
					</option>
				{/each}
			</SelectBox>

			<SelectBox name="town" label="🏠 Town" on:change={changeTown}>
				{#each towns() as town}
					<option selected={town === $merchant.town} value={town}>{town}</option>
				{/each}
			</SelectBox>
		{/if}

		<div>
			<Button type="submit">Play</Button>
		</div>
	</form>
</div>

<style>
	form {
		width: 50%;
	}
</style>
