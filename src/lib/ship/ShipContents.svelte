<script lang="ts">
	import { ships } from '../../stores/ships';
	import { goods } from '../../stores/goods';
	import { staff } from '../../stores/staff';
	import { types } from '../../constants/ships';
	import RangeSlider from '$lib/RangeSlider.svelte';

	export let ship;

	$: maxCrewMembers = () => {
		if (!ship) return 0;

		if (ship.crewMembers + $staff.members > types[ship.type].crewMax) {
			return types[ship.type].crewMax;
		}

		return ship.crewMembers + $staff.members;
	};

	$: maxCannons = () => {
		if (!ship) return 0;

		if (ship.cannons + $goods.cannons > types[ship.type].cannonsMax) {
			return types[ship.type].cannonsMax;
		}

		return ship.cannons + $goods.cannons;
	};

	const changeCannons = (e: CustomEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		const value = parseInt(target.value, 10);

		if (value > ship.cannons) {
			// Add more cannons to ship
			goods.remove('cannons', value - ship.cannons);
		} else {
			// Remove cannons from ship
			goods.add('cannons', ship.cannons - value);
		}

		ships.changeItemsOnboard(ship.id, 'cannons', value);
	};

	const changeCrewMembersOnboard = (e: CustomEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		const value = parseInt(target.value, 10);

		if (value > ship.crewMembers) {
			// Add more crew members to ship
			staff.remove(value - ship.crewMembers);
		} else {
			// Remove crew members from ship
			staff.add(ship.crewMembers - value);
		}

		ships.changeItemsOnboard(ship.id, 'crewMembers', value);
	};
</script>

<div class="component-shipcontents">
	<h3>Rearrange ship contents</h3>

	<div class="slider-container">
		<div>
			<RangeSlider
				value={ship.crewMembers}
				max={maxCrewMembers()}
				on:input={changeCrewMembersOnboard}
				label="👫 Crew members onboard <strong>({ship.crewMembers} onboard)</strong>"
			/>
			{$staff.members} more available
		</div>

		<div>
			<RangeSlider
				value={ship.cannons}
				max={maxCannons()}
				on:input={changeCannons}
				label="💣 Cannons <strong>({ship.cannons} onboard)</strong>"
			/>
			{$goods.cannons} more available
		</div>
	</div>
</div>

<style>
	.slider-container {
		width: 50%;
	}

	.slider-container > div {
		background: #fff;
		padding: 0.5em;
		margin-bottom: 1.5em;
	}
</style>
