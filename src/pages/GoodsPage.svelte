<script>
    import { goods } from '../stores/goods.js';
    import { ships, shipTotals } from '../stores/ships.js';
    import { merchant } from '../stores/merchant.js';
    import Modal from '../components/Modal.svelte';
    import Table from '../components/Table.svelte';
    import Button from '../components/Button.svelte';
    import { goodsInfo } from '../utils/goods';

    let showModal = false;
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
        <Button on:click={() => (showModal = true)}>🥫 Buy and sell goods</Button>
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
