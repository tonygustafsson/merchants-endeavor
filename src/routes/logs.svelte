<script lang="ts">
	import { log } from '../stores/log';
	import Table from '$lib/Table.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { game } from '../stores/game';
	import { routes } from '../constants/game';

	onMount(() => {
		if (!$game.started) {
			goto(routes.root);
		}
	});
</script>

<div class="logs-page">
	<h2>Logs</h2>

	<p>See what has been going on recently.</p>

	{#if $log.length > 0}
		<Table>
			<tr>
				<th width="25%">Time</th>
				<th width="15%">Real time</th>
				<th>Entry</th>
			</tr>
			{#each $log as item}
				<tr>
					<td>{item.time}</td>
					<td>{item.realTime}</td>
					<td>{item.entry}</td>
				</tr>
			{/each}
		</Table>
	{:else}
		<p>
			<em>No log entries yet.</em>
		</p>
	{/if}
</div>
