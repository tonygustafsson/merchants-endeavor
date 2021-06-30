<script lang="ts">
	import { time } from '../stores/time';
	import { merchant } from '../stores/merchant';
	import { ships, shipTotals } from '../stores/ships';
	import { businessTotals } from '../stores/businesses';
	import { staff } from '../stores/staff';
	import { goods } from '../stores/goods';
	import { nationalities } from '../constants/game';
	import Table from '$lib/Table.svelte';
	import { ucFirst } from '../utils/string';
	import { routes } from '../constants/game';

	let noOfShips = 0;

	ships.subscribe(value => {
		noOfShips = value.length;
	});
</script>

<div class="page-stats">
	<h3>{$merchant.name}</h3>

	{#if $merchant.nationality}
		<p>
			{nationalities[$merchant.nationality].flag} You are trying to tame the carribean as a {$merchant.gender}
			from {ucFirst($merchant.nationality)}. You started out {$time.sinceStart} in {$merchant.town}.
		</p>
	{/if}

	<h3>Inventory</h3>

	<Table>
		<tr>
			<th>Item</th>
			<th>Value</th>
		</tr>
		<tr>
			<td><a href={routes.goods}>💰 Doubloons</a></td>
			<td><a href={routes.goods}>{$merchant.doubloons} dbl</a></td>
		</tr>
		<tr>
			<td><a href={routes.properties}>⛵ Ships</a></td>
			<td><a href={routes.properties}>{noOfShips} ships</a></td>
		</tr>
		<tr>
			<td><a href={routes.goods}>💣 Cannons</a></td>
			<td><a href={routes.goods}>{$shipTotals.cannons + $goods.cannons} pcs</a></td>
		</tr>
		<tr>
			<td><a href={routes.staff}>👫 Staff</a></td>
			<td>
				<a href={routes.staff}>
					{$shipTotals.crewMembers + $businessTotals.staff + $staff.members} members
				</a>
			</td>
		</tr>
		<tr>
			<td><a href={routes.goods}>🍲 Food</a></td>
			<td><a href={routes.goods}>{$goods.food} cartons</a></td>
		</tr>
		<tr>
			<td><a href={routes.goods}>🥛 Water</a></td>
			<td><a href={routes.goods}>{$goods.water} barrels</a></td>
		</tr>
	</Table>
</div>

<style>
	tr {
		cursor: pointer;
	}

	tr:hover td {
		text-decoration: underline;
	}

	td {
		filter: grayscale(0.5);
	}
</style>
