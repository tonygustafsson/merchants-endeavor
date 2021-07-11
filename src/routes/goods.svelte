<script lang="ts">
	import { goods } from '../stores/goods';
	import { merchant } from '../stores/merchant';
	import Table from '$lib/Table.svelte';
	import Button from '$lib/Button.svelte';
	import ChangeGoods from '$lib/ChangeGoods.svelte';
	import { types } from '../constants/goods';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { game } from '../stores/game';
	import { routes } from '../constants/game';
	import { getUrl } from '../utils/url';

	onMount(() => {
		if (!$game.started) {
			goto(getUrl(routes.root));
		}
	});

	$: showChangeGoods = false;
</script>

<div class="app-goods">
	<h2>Goods</h2>

	<p>
		Your total supply of goods. Some of these are needed to send ships on missions, and some are
		just for trading and making a profit from.
	</p>

	<Table>
		<tr>
			<th>Item</th>
			<th>Total</th>
		</tr>
		{#each Object.keys(types) as item}
			<tr>
				<td>{types[item].icon} {types[item].name}</td>
				<td>{$goods[item]} {types[item].suffix}</td>
			</tr>
		{/each}
	</Table>

	<div>
		<Button on:click={() => (showChangeGoods = !showChangeGoods)}>🥫 Buy and sell goods</Button>
		<Button on:click={() => merchant.addDoubloons(1000)}>💰 Magic Money</Button>
	</div>

	{#if showChangeGoods}
		<ChangeGoods />
	{/if}
</div>
