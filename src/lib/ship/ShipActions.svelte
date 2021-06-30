<script lang="ts">
	import { ships } from '../../stores/ships';
	import { merchant } from '../../stores/merchant';
	import { goods } from '../../stores/goods';
	import { types, repairCostPerPercentage } from '../../constants/ships';
	import { staff } from '../../stores/staff';
	import { log } from '../../stores/log';
	import Button from '$lib/Button.svelte';
	import TextInput from '$lib/TextInput.svelte';
	import { goto } from '$app/navigation';
	import { routes } from '../../constants/game';

	export let ship;

	$: repairCost = (100 - ship.health) * repairCostPerPercentage;

	const sellShip = ship => {
		// Return ship crew members
		staff.add(ship.crewMembers);

		// Return ship goods
		goods.add('cannons', ship.cannons);

		// Sell ship
		const worth = types[ship.type].price;
		ships.removeShip(ship.id);
		merchant.addDoubloons(worth);
		log.add(`You sold your ${ship.type} ${ship.name} for ${worth} dbl.`);

		// Go back to Property page
		goto(routes.properties);
	};

	const renameShip = (e: any) => {
		ships.setName(ship.id, e.target.value);
		log.add(`You renamed your ${ship.type} from ${ship.name} to ${e.target.value}.`);
	};

	const repairShip = ship => {
		ships.repair(ship.id);
		merchant.subtractDoubloons(repairCost);
		log.add(`You repaired your ${ship.type} ${ship.name} for ${repairCost}.`);
	};
</script>

<div class="component-shipactions">
	<h3>Actions</h3>

	<div>
		<TextInput label="Ship name" name="ship-name" value={ship.name} on:change={renameShip} />
		<Button>📛 Change name</Button>

		<Button on:click={() => sellShip(ship)}>💰 Sell the ship</Button>
		<Button
			disabled={repairCost <= 0 || $merchant.doubloons < repairCost}
			on:click={() => repairShip(ship)}
		>
			💰 Repair ({repairCost} dbl)
		</Button>
	</div>
</div>
