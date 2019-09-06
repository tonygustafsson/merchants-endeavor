<script>
    import { fade } from 'svelte/transition';
    import { goods } from '../stores/goods.js';
    import { merchant } from '../stores/merchant.js';
    import { log } from '../stores/log.js';
    import Button from '../components/Button.svelte';
    import { goodsInfo } from '../utils/goods';
    import RangeSlider from '../components/RangeSlider.svelte';
    import cloneDeep from 'lodash-es/cloneDeep';
    import Notifications from '../components/Notifications.svelte';

    let notifications;

    $: tempGoods = cloneDeep($goods);
    $: tempDoubloons = $merchant.doubloons;

    const calculateDoubloons = () => {
        let totalCost = 0;

        Object.keys(tempGoods).forEach(goodsItem => {
            // Loop through all goods items and calculate the cost/profit
            const currentQuantity = $goods[goodsItem];
            const newQuantity = tempGoods[goodsItem];
            const worth = goodsInfo[goodsItem].price;

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

    const changeGoods = (item, quantity) => {
        // Change the item quantity
        const newTempGoods = cloneDeep(tempGoods);
        newTempGoods[item] = parseInt(quantity, 10);

        tempGoods = newTempGoods;
        calculateDoubloons();
    };

    const makeTransaction = () => {
        merchant.setDoubloons(tempDoubloons);
        goods.updateAll(tempGoods);
        notifications.success('Transaction made successfully.');
        log.add(`Your changed your goods in a transaction.`);
    };

    const resetGoods = () => {
        tempGoods = cloneDeep($goods);
        calculateDoubloons();
    };

    let showModal = false;
</script>

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

<Notifications bind:this={notifications} />

<div class="change-goods-component">
    <div class="slider-container">
        {#each Object.keys(tempGoods) as item}
            <div>
                <RangeSlider
                    value={tempGoods[item]}
                    max={tempGoods[item] + 500}
                    on:input={e => changeGoods(item, e.target.value)}
                    label="{goodsInfo[item].icon}
                    {goodsInfo[item].name} ({tempGoods[item]}
                    {goodsInfo[item].suffix})" />
            </div>
        {/each}
    </div>

    <p class:warning={tempDoubloons < 0}>Doubloons afterwards: {tempDoubloons} dbl</p>

    <Button on:click={makeTransaction} disabled={tempDoubloons < 0}>💰 Make transaction</Button>
    <Button on:click={resetGoods}>&times; Reset</Button>
</div>
