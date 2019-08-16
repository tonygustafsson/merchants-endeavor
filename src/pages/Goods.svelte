<script>
    import { goods } from '../stores/goods.js';
    import { merchant } from '../stores/merchant.js';
    import Modal from '../components/Modal.svelte';
    import { goodsInfo } from '../utils/goods';

    let showModal = false;
</script>

<div class="app-goods">
    <h2>Goods</h2>

    <table>
        <tr>
            <th>Item</th>
            <th>Quantity</th>
        </tr>
        {#each Object.keys(goodsInfo) as item}
            <tr>
                <td>{goodsInfo[item].name}</td>
                <td>{$goods[item]} {goodsInfo[item].suffix}</td>
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
                                on:click={() => goods.add(item, 1)}>
                                +
                            </button>
                            <button disabled={$goods[item] <= 0} on:click={() => goods.remove(item, 1)}>-</button>
                        </td>
                    </tr>
                {/each}
            </table>

        </Modal>
    {/if}

</div>
