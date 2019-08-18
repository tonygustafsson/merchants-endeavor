<script>
    import { goods } from '../stores/goods.js';
    import { ships } from '../stores/ships.js';
    import { merchant } from '../stores/merchant.js';
    import Modal from '../components/Modal.svelte';
    import { goodsInfo } from '../utils/goods';

    $: onBoard = {
        cannons: $ships.reduce((sum, newShip) => (sum += newShip.cannons), 0),
        food: $ships.reduce((sum, newShip) => (sum += newShip.food), 0),
        water: $ships.reduce((sum, newShip) => (sum += newShip.water), 0),
        spices: 0,
        porcelain: 0,
        tobacco: 0,
        rum: 0
    };

    let showModal = false;
</script>

<div class="app-goods">
    <h2>Goods</h2>

    <p>Cannons onboard: {onBoard.cannons}</p>

    <p>
        Your total supply of goods. Some of these are needed to send ships on missions, and some are just for trading
        and making a profit from.
    </p>

    <table>
        <tr>
            <th>Item</th>
            <th>On board</th>
            <th>Total</th>
        </tr>
        {#each Object.keys(goodsInfo) as item}
            <tr>
                <td>{goodsInfo[item].name}</td>
                <td>{onBoard[item]} {goodsInfo[item].suffix}</td>
                <td>{$goods[item] + onBoard[item]} {goodsInfo[item].suffix}</td>
            </tr>
        {/each}
    </table>

    <div>
        <button on:click={() => (showModal = true)}>Buy and sell goods</button>
    </div>

    {#if showModal}
        <Modal on:close={() => (showModal = false)}>
            <h3>Buy and sell goods</h3>

            <p>Doubloons: {$merchant.doubloons}</p>

            <table>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Worth</th>
                    <th>Actions</th>
                </tr>

                {#each Object.keys(goodsInfo) as item}
                    <tr>
                        <td>{goodsInfo[item].name}</td>
                        <td>{$goods[item]} {goodsInfo[item].suffix}</td>
                        <td>{goodsInfo[item].price}</td>
                        <td>{goodsInfo[item].worth}</td>
                        <td>
                            <button
                                disabled={goodsInfo[item].price > $merchant.doubloons}
                                on:click={() => goods.buy(item, 1)}>
                                +
                            </button>
                            <button disabled={$goods[item] <= 0} on:click={() => goods.sell(item, 1)}>-</button>
                        </td>
                    </tr>
                {/each}
            </table>

        </Modal>
    {/if}

</div>
