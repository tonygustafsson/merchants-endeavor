<script lang="ts">
	import { goods } from '../stores/goods';
	import { merchant } from '../stores/merchant';
	import { log } from '../stores/log';
	import Button from '$lib/Button.svelte';
	import { types } from '../constants/goods';
	import RangeSlider from '$lib/RangeSlider.svelte';
	import cloneDeep from 'lodash.clonedeep';

	$: tempGoods = cloneDeep($goods);
	$: tempDoubloons = $merchant.doubloons;

	const calculateDoubloons = () => {
		let totalCost = 0;

		Object.keys(tempGoods).forEach(goodsItem => {
			// Loop through all goods items and calculate the cost/profit
			if (!$goods[goodsItem] || !types[goodsItem]) {
				return;
			}

			const currentQuantity = $goods[goodsItem];
			const newQuantity = tempGoods[goodsItem];
			const worth = types[goodsItem].price;

			if (newQuantity > currentQuantity) {
				// Buying item
				totalCost += (newQuantity - currentQuantity) * worth;
			} else if (currentQuantity > newQuantity) {
				// Selling item
				totalCost -= (currentQuantity - newQuantity) * worth;
			}
		});

		tempDoubloons = $merchant.doubloons - totalCost;
	};

	const changeGoods = (e: CustomEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		const quantity = target.value;
		const item = target.closest('div').getAttribute('data-item');

		// Change the item quantity
		const newTempGoods = cloneDeep(tempGoods);
		newTempGoods[item] = parseInt(quantity, 10);

		tempGoods = newTempGoods;
		calculateDoubloons();
	};

	const makeTransaction = () => {
		merchant.setDoubloons(tempDoubloons);
		goods.updateAll(tempGoods);
		log.add(`Your changed your goods in a transaction.`);
	};

	const resetGoods = () => {
		tempGoods = cloneDeep($goods);
		calculateDoubloons();
	};
</script>

<div class="change-goods-component">
	<div class="slider-container">
		{#each Object.keys(tempGoods) as item}
			<div data-item={item}>
				<RangeSlider
					value={tempGoods[item]}
					max={tempGoods[item] + 500}
					on:input={changeGoods}
					label="{types[item].icon}
                    {types[item].name} ({tempGoods[item]}
                    {types[item].suffix})"
				/>
			</div>
		{/each}
	</div>

	<p class:warning={tempDoubloons < 0}>Doubloons afterwards: {tempDoubloons} dbl</p>

	<Button on:click={makeTransaction} disabled={tempDoubloons < 0}>💰 Make transaction</Button>
	<Button on:click={resetGoods}>&times; Reset</Button>
</div>

<style>
	.slider-container {
		padding: 1em 0;
	}
	.slider-container > div {
		background: #fff;
		padding: 0.5em;
		margin-bottom: 1.5em;
	}
	.warning {
		color: red;
		font-weight: bold;
	}
</style>
