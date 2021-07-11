<script lang="ts">
	import { ships } from '../../stores/ships';
	import { game } from '../../stores/game';
	import Mission from '$lib/ship/Mission.svelte';
	import ShipInfo from '$lib/ship/ShipInfo.svelte';
	import ShipActions from '$lib/ship/ShipActions.svelte';
	import ShipContents from '$lib/ship/ShipContents.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { routes } from '../../constants/game';
	import { page } from '$app/stores';
	import { getUrl } from '../../utils/url';

	onMount(() => {
		if (!$game.started) {
			goto(getUrl(routes.root));
		}
	});

	$: ship = $ships.find(s => s.id === $page.params.id);
</script>

<div class="app-ship">
	<p>
		<a href={getUrl(routes.properties)}>&lt; Back to Properties</a>
	</p>

	{#if ship}
		<h2>Ship: {ship.name}</h2>

		<Mission {ship} />

		<ShipInfo {ship} />

		<ShipActions {ship} />

		{#if !ship.onMission}
			<ShipContents {ship} />
		{/if}
	{:else}
		<p>Ship not found.</p>
	{/if}
</div>
