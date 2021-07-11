<script lang="ts">
	import { ships } from '../../stores/ships';
	import { merchant } from '../../stores/merchant';
	import { getRandomShip } from '../../utils/ships';
	import { types } from '../../constants/ships';
	import { game } from '../../stores/game';
	import { log } from '../../stores/log';
	import Modal from '$lib/Modal.svelte';
	import Table from '$lib/Table.svelte';
	import Button from '$lib/Button.svelte';
	import { ucFirst } from '../../utils/string';
	import { goto } from '$app/navigation';
	import { routes } from '../../constants/game';
	import { getUrl } from '../../utils/url';

	let showBuyModal = false;

	const buyShip = shipType => {
		game.setLoading(true);

		const newShip = getRandomShip(shipType);
		const price = types[shipType].price;

		ships.addShip(newShip);
		merchant.subtractDoubloons(price);
		log.add(`You bought a new ${newShip.type} named ${newShip.name} for ${price} dbl.`);
		game.setLoading(false);
	};

	const gotoShip = (e: MouseEvent) => {
		const target = e.target as HTMLInputElement;
		const id = target.closest('tr').getAttribute('data-ship-id');
		goto(`${getUrl(routes.ship)}/${id}`);
	};
</script>

<div class="component-ships">
	<h3>Ships</h3>

	{#if $ships.length > 0}
		<Table>
			<tr>
				<th>Name</th>
				<th>Type</th>
				<th>Health</th>
				<th>Crew</th>
				<th>Cannons</th>
				<th>On mission</th>
			</tr>

			{#each $ships as ship}
				<tr style="cursor: pointer" on:click={gotoShip} data-ship-id={ship.id}>
					<td><a href={`${getUrl(routes.ship)}/${ship.id}`}>⛵ {ship.name}</a></td>
					<td>{ucFirst(ship.type)}</td>
					<td>{ship.health}%</td>
					<td>{ship.crewMembers}</td>
					<td>{ship.cannons}</td>
					<td>{ship.onMission ? 'Yes' : 'No'}</td>
				</tr>
			{/each}
		</Table>
	{:else}
		<p>
			<em>You do not own any ships yet.</em>
		</p>
	{/if}

	<Button on:click={() => (showBuyModal = true)}>⛵ Buy ships</Button>

	{#if showBuyModal}
		<Modal on:close={() => (showBuyModal = false)}>
			<h3>Buy ships</h3>

			<p>Click on the ship you want and can afford.</p>

			<Button disabled={$merchant.doubloons < types.brig.price} on:click={() => buyShip('brig')}>
				<img src="img/brig.jpg" alt="Brig" />
				Brig
				<br />
				{types.brig.price} dbl
			</Button>

			<Button
				disabled={$merchant.doubloons < types.merchantman.price}
				on:click={() => buyShip('merchantman')}
			>
				<img src="img/merchantman.jpg" alt="Merchantman" />
				Merchantman
				<br />
				{types.merchantman.price} dbl
			</Button>

			<Button
				disabled={$merchant.doubloons < types.galleon.price}
				on:click={() => buyShip('galleon')}
			>
				<img src="img/galleon.jpg" alt="Galleon" />
				Galleon
				<br />
				{types.galleon.price} dbl
			</Button>

			<Button
				disabled={$merchant.doubloons < types.frigate.price}
				on:click={() => buyShip('frigate')}
			>
				<img src="img/frigate.jpg" alt="Frigate" />
				Frigate
				<br />
				{types.frigate.price} dbl
			</Button>
		</Modal>
	{/if}
</div>
