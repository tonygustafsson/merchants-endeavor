<script lang="ts">
	import { merchant } from '../../stores/merchant';
	import { businesses } from '../../stores/businesses';
	import { game } from '../../stores/game';
	import { log } from '../../stores/log';
	import { ticker } from '../../stores/ticker';
	import Modal from '$lib/Modal.svelte';
	import Table from '$lib/Table.svelte';
	import Button from '$lib/Button.svelte';
	import { types } from '../../constants/businesses';
	import { getRandomId, ucFirst } from '../../utils/string';
	import businessNames from '../../lists/businessNames';
	import type { Business } from '../../types/business';
	import { goto } from '$app/navigation';
	import { routes } from '../../constants/game';
	import { getUrl } from '../../utils/url';

	let showBuyModal = false;

	export const getRandomBusiness = (businessType: string, merchantName = 'Merchant'): Business => {
		const businessName =
			businessNames[businessType][Math.floor(Math.random() * businessNames[businessType].length)];
		merchantName = merchantName.split(' ')[0];
		const personalizedBusinessName = businessName.replace('{0}', merchantName);
		let currentTick = $ticker;

		const business: Business = {
			id: getRandomId(32),
			created: currentTick,
			name: personalizedBusinessName,
			type: businessType,
			profit: 0,
			staff: 0
		};

		return business;
	};

	const buyBusiness = (businessType: string) => {
		game.setLoading(true);

		const newBusiness = getRandomBusiness(businessType, $merchant.name);
		const price = types[businessType].price;

		businesses.add(newBusiness);
		merchant.subtractDoubloons(price);
		log.add(
			`You bought a new ${newBusiness.type} business named ${newBusiness.name} for ${price} dbl.`
		);
		game.setLoading(false);
	};

	const gotoBusiness = (e: MouseEvent) => {
		const target = e.target as HTMLTableRowElement;
		const id = target.closest('tr').getAttribute('data-business-id');
		goto(`${getUrl(routes.business)}/${id}`);
	};
</script>

<div class="component-businesses">
	<h3>Businesses</h3>

	{#if $businesses.length > 0}
		<Table>
			<tr>
				<th>Name</th>
				<th>Type</th>
				<th>Staff</th>
				<th>Profit</th>
			</tr>

			{#each $businesses as business}
				<tr style="cursor: pointer" on:click={gotoBusiness} data-business-id={business.id}>
					<td>🏠 {business.name}</td>
					<td>{ucFirst(business.type)}</td>
					<td>{business.staff}</td>
					<td>{business.profit} dbl</td>
				</tr>
			{/each}
		</Table>
	{:else}
		<p>
			<em>You do not own any businesses yet.</em>
		</p>
	{/if}

	<Button on:click={() => (showBuyModal = true)}>🏠 Buy businesses</Button>
</div>

{#if showBuyModal}
	<Modal on:close={() => (showBuyModal = false)}>
		<h3>Buy businesses</h3>

		<Button
			disabled={$merchant.doubloons < types.merchant.price}
			on:click={() => buyBusiness('merchant')}
		>
			<img src="img/merchant.png" alt="Merchant" />
			Merchant
			<br />
			{types.merchant.price} dbl
		</Button>

		<Button
			disabled={$merchant.doubloons < types.blacksmith.price}
			on:click={() => buyBusiness('blacksmith')}
		>
			<img src="img/blacksmith.png" alt="Blacksmith" />
			Blacksmith
			<br />
			{types.blacksmith.price} dbl
		</Button>

		<Button
			disabled={$merchant.doubloons < types.tavern.price}
			on:click={() => buyBusiness('tavern')}
		>
			<img src="img/tavern.png" alt="Tavern" />
			Tavern
			<br />
			{types.tavern.price} dbl
		</Button>

		<Button
			disabled={$merchant.doubloons < types.brothel.price}
			on:click={() => buyBusiness('brothel')}
		>
			<img src="img/brothel.png" alt="Brothel" />
			Brothel
			<br />
			{types.brothel.price} dbl
		</Button>
	</Modal>
{/if}
