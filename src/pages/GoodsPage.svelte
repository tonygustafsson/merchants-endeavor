<script>
    import { goods } from '../stores/goods.js';
    import { ships, shipTotals } from '../stores/ships.js';
    import { merchant } from '../stores/merchant.js';
    import Table from '../components/Table.svelte';
    import Button from '../components/Button.svelte';
    import ChangeGoods from '../components/ChangeGoods.svelte';
    import { goodsInfo } from '../utils/goods';

    $: showChangeGoods = false;
</script>

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
        <Button on:click={() => (showChangeGoods = !showChangeGoods)}>🥫 Buy and sell goods</Button>
        <Button on:click={() => merchant.addDoubloons(1000)}>💰 Magic Money</Button>
    </div>

    {#if showChangeGoods}
        <ChangeGoods />
    {/if}
</div>
