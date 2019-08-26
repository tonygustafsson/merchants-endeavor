<script>
    import { onMount } from 'svelte';
    import { goods } from '../stores/goods.js';
    import { ships, shipTotals } from '../stores/ships.js';
    import { merchant } from '../stores/merchant.js';
    import Modal from '../components/Modal.svelte';
    import Table from '../components/Table.svelte';
    import Button from '../components/Button.svelte';
    import { goodsInfo } from '../utils/goods';
    import RangeSlider from '../components/RangeSlider.svelte';
    import cloneDeep from 'lodash-es/cloneDeep';

    $: tempGoods = cloneDeep($goods);
    $: tempDoubloons = $merchant.doubloons;

    const changeGoods = (item, quantity) => {
        quantity = parseInt(quantity, 10);

        const newTempGoods = cloneDeep(tempGoods);
        newTempGoods[item] = quantity;
        tempGoods = newTempGoods;

        if (quantity > $goods[item]) {
            // Buy
            const price = goodsInfo[item].price;
            tempDoubloons -= price;
        } else if (quantity < $goods[item]) {
            // Sell
            const worth = goodsInfo[item].worth;
            tempDoubloons += worth;
        }
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
</style>

<div class="app-goods">
    <h2>Goods</h2>

    <p>
        Your total supply of goods. Some of these are needed to send ships on missions, and some are just for trading
        and making a profit from.
    </p>

    <Table>
        <tr>
            <th>Item</th>
            <th>On board</th>
            <th>Total</th>
        </tr>
        {#each Object.keys(goodsInfo) as item}
            <tr>
                <td>{goodsInfo[item].icon} {goodsInfo[item].name}</td>
                <td>{$shipTotals[item]} {goodsInfo[item].suffix}</td>
                <td>{$goods[item] + $shipTotals[item]} {goodsInfo[item].suffix}</td>
            </tr>
        {/each}
    </Table>

    <div>
        <Button on:click={() => (showModal = true)}>🥫 Buy and sell goods</Button>
        <Button on:click={() => merchant.addDoubloons(1000)}>💰 Magic Money</Button>
    </div>

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

        <div>Doubloons: {tempDoubloons}</div>

        <div>
            <Button>Buy / Sell</Button>
        </div>
    </div>

    {#if showModal}
        <Modal on:close={() => (showModal = false)}>
            <h3>Buy and sell goods</h3>

            <p>Doubloons: {$merchant.doubloons}</p>

            <Table dynamicWidth={true}>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Worth</th>
                    <th>Actions</th>
                </tr>

                {#each Object.keys(goodsInfo) as item}
                    <tr>
                        <td>{goodsInfo[item].icon} {goodsInfo[item].name}</td>
                        <td>{$goods[item]} {goodsInfo[item].suffix}</td>
                        <td>{goodsInfo[item].price}</td>
                        <td>{goodsInfo[item].worth}</td>
                        <td>
                            <Button
                                disabled={goodsInfo[item].price > $merchant.doubloons}
                                on:click={() => goods.buy(item, 1)}>
                                +
                            </Button>
                            <Button disabled={$goods[item] <= 0} on:click={() => goods.sell(item, 1)}>-</Button>
                        </td>
                    </tr>
                {/each}
            </Table>

        </Modal>
    {/if}

</div>
