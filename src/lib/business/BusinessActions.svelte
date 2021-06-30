<script lang="ts">
	import { businesses } from '../../stores/businesses';
	import { merchant } from '../../stores/merchant';
	import { types } from '../../constants/businesses';
	import { staff } from '../../stores/staff';
	import { log } from '../../stores/log';
	import Button from '$lib/Button.svelte';
	import TextInput from '$lib/TextInput.svelte';
	import { goto } from '$app/navigation';
	import { routes } from '../../constants/game';
	import type { Business } from '../../types/business';

	export let business;

	const sellBusiness = business => {
		// Return business staff members
		staff.add(business.staff);

		// Sell ship
		const worth = types[business.type].price;
		businesses.remove(business.id);
		merchant.addDoubloons(worth);
		log.add(`You sold your ${business.type} ${business.name} for ${worth} dbl.`);

		// Go back to Property page
		goto(routes.properties);
	};

	const renameBusiness = (e: CustomEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		const business: Business = JSON.parse(target.getAttribute('data-business'));
		const newName = target.value;

		businesses.setName(business.id, newName);
		log.add(`You renamed your ${business.type} from ${business.name} to ${newName}.`);
	};

	const takeProfit = () => {
		merchant.addDoubloons(business.profit);
		businesses.takeProfit(business.id);
		log.add(
			`You took profit from your ${business.type} ${business.name} and got ${business.profit}.`
		);
	};
</script>

<div class="component-businessactions">
	<h3>Actions</h3>

	<div>
		<TextInput
			label="Business name"
			name="business-name"
			data-business={business}
			value={business.name}
			on:change={renameBusiness}
		/>
		<Button>📛 Change name</Button>

		<Button on:click={() => sellBusiness(business)}>💰 Sell the business</Button>
		<Button disabled={business.profit <= 0} on:click={() => takeProfit()}>💰 Take profit</Button>
	</div>
</div>
